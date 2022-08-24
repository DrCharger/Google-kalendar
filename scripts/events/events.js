import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
	// если произошел клик по событию, то нужно паказать попап с кнопкой удаления
	// установите eventIdToDelete с id события в storage
	openPopup();
	setItem('eventIdToDelete', event.target.dataset.id);
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
	removeEventsFromCalendar();
	event.map(({ id, start, end, description, title }) => {
		const timeSLot = document.querySelector(
			`div[data-day = '${start.getDate()}`,
		);
		const task = document.createElement('div');
		task.classList.add('task');
		task.setAttribute('data-id', id);
		task.style.position = 'absolute';
		task.style.top = `${start.getHours() * 60 + start.getMinutes()}px`;
		task.style.height = `${
			(end.getHours() - start.getHours()) * 60 +
			end.getMinutes() -
			start.getMinutes()
		}px`;
		const titleTask = document.createElement('h5');
		titleTask.classList.add('task__title');
		titleTask.textContent = title;
		const time = document.createElement('span');
		time.classList.add('task__time');
		time.textContent = `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
		const descriptionTask = document.createElement('span');
		descriptionTask.classList.add('task__description');
		descriptionTask.textContent = description;

		task.append(titleTask, time, descriptionTask);

		timeSLot.prepend(task);
		return task;
	});
};

export const renderEvents = () => {
	let result = [];
	const b = getItem('displayedWeekStart').getDate();
	for (let i = b; i <= b + 6; i++) {
		result.push(i);
	}
	let a = getItem('events').filter((elem) =>
		result.includes(elem.start.getDate()),
	);
	createEventElement(a);
	// достаем из storage все события и дату понедельника отображаемой недели
	// фильтруем события, оставляем только те, что входят в текущую неделю
	// создаем для них DOM элементы с помощью createEventElement
	// для каждого события находим на странице временную ячейку (.calendar__time-slot)
	// и вставляем туда событие
	// каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
	// не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
	// достаем из storage массив событий и eventIdToDelete
	// удаляем из массива нужное событие и записываем в storage новый массив
	// закрыть попап
	// перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
	const a = getItem('events').filter(
		(elem) => elem.id !== getItem('eventIdToDelete'),
	);
	console.log(a);
	setItem('events', a);
	closePopup();
	removeEventsFromCalendar();
	renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
