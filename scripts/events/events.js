import { getItem, setItem } from '../common/storage.js';
import { openPopup, closePopup } from '../common/popup.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModalSmallTask } from '../common/modal.js';
import { redLine, anim } from '../calendar/timescale.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
	// если произошел клик по событию, то нужно паказать попап с кнопкой удаления
	// установите eventIdToDelete с id события в storage
	if (
		event.target.hasAttribute('data-id') ||
		event.target.classList.contains('task__touch')
	) {
		let x;
		if (
			event.target.closest('.task').getBoundingClientRect().x <
			document.querySelector('.page').getBoundingClientRect().width / 2
		) {
			x =
				event.target.closest('.task').getBoundingClientRect().left +
				event.target.closest('.task').getBoundingClientRect().width;
		} else {
			x =
				event.target.closest('.task').getBoundingClientRect().left -
				event.target.closest('.task').getBoundingClientRect().width;
		}
		const y = event.target.getBoundingClientRect().top;
		openPopup(x, y);
		setItem('eventIdToDelete', event.target.closest('.task').dataset.id);
	} else if (event.target.hasAttribute('data-time')) {
		openModalSmallTask(event);
	}
	return;
}

function removeEventsFromCalendar() {
	// ф-ция для удаления всех событий с календаря
	document
		.querySelectorAll('.task')
		.forEach((elem) => elem.parentNode.removeChild(elem));
}

const createEventElement = (event) => {
	// ф-ция создает DOM элемент события
	// событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
	// нужно добавить id события в дата атрибут
	// здесь для создания DOM элемента события используйте document.createElement
	// let timeSLot = document.querySelector(`div[data-day = ''`);

	event.map(({ id, start, end, description, title }) => {
		const aStart = new Date(start);
		const aEnd = new Date(end);

		const timeSLot = document.querySelector(
			`div[data-day = '${aStart.getDate()}'][data-month = '${
				aStart.getMonth() + 1
			}'] `,
		);
		const task = document.createElement('div');
		task.classList.add('task');
		task.classList.add('task__touch');
		task.setAttribute('data-id', id);
		task.style.position = 'absolute';
		task.style.top = `${aStart.getHours() * 60 + aStart.getMinutes()}px`;
		task.style.height = `${
			(aEnd.getHours() - aStart.getHours()) * 60 +
			aEnd.getMinutes() -
			aStart.getMinutes()
		}px`;
		const titleTask = document.createElement('span');
		titleTask.classList.add('task__title');
		titleTask.classList.add('task__touch');
		titleTask.textContent = title;
		const time = document.createElement('span');
		time.classList.add('task__time');
		time.classList.add('task__touch');
		time.textContent = `${aStart.getHours()}:${aStart.getMinutes()} - ${aEnd.getHours()}:${aEnd.getMinutes()}`;
		const descriptionTask = document.createElement('span');
		descriptionTask.classList.add('task__description');
		descriptionTask.classList.add('task__touch');
		descriptionTask.textContent = description;

		task.append(titleTask, time, descriptionTask);

		timeSLot.prepend(task);
		return task;
	});
};

export const renderEvents = () => {
	removeEventsFromCalendar();
	const b = getItem('events') || [];
	createEventElement(
		b.filter((elem) =>
			generateWeekRange(getItem('displayedWeekStart'))
				.map((elem) => elem.getDate())
				.includes(new Date(elem.start).getDate()),
		),
	);
	const a = document.querySelector(
		`div[data-day = '${new Date().getDate()}'][data-month = '${
			new Date().getMonth() + 1
		}'] `,
	);
	if (a === null) {
		return;
	}
	if (a.childNodes[0] !== document.querySelector('.red__line')) {
		redLine();
		anim();
	}

	// достаем из storage все события и дату понедельника отображаемой недели
	// фильтруем события, оставляем только те, что входят в текущую неделю
	// создаем для них DOM элементы с помощью createEventElement
	// для каждого события находим на странице временную ячейку (.calendar__time-slot)
	// и вставляем туда событие
	// каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
	// не забудьте удалить с календаря старые события перед добавлением новых
};

export function onDeleteEvent() {
	// достаем из storage массив событий и eventIdToDelete
	// удаляем из массива нужное событие и записываем в storage новый массив
	// закрыть попап
	// перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
	let findedElem = getItem('events').find(
		(elem) => elem.id === getItem('eventIdToDelete'),
	);
	if (new Date(findedElem.start).getDate() === new Date().getDate()) {
		let from =
			new Date(findedElem.start).getHours() * 60 +
			new Date(findedElem.start).getMinutes();
		let now = new Date().getHours() * 60 + new Date().getMinutes();

		if (from - now < 15) {
			return alert(`Can't delete this task. It will be in 15 minutes`);
		}
	}
	setItem(
		'events',
		getItem('events').filter((elem) => elem.id !== getItem('eventIdToDelete')),
	);
	closePopup();
	renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
