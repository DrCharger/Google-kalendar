import { getItem, setItem } from '../common/storage.js';
import { closePopup, openPopup } from '../common/popup.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModalSmallTask } from '../common/modal.js';
import { redLine, anim } from '../calendar/timescale.js';
import { deleteEvent, getEventsList } from '../common/eventsGateWays.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
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
	document
		.querySelectorAll('.task')
		.forEach((elem) => elem.parentNode.removeChild(elem));
	setItem('eventIdToDelete', null);
}

const createEventElement = (event) => {
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
	const b = getItem('eventsList') || [];
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
};

export function onDeleteEvent() {
	let findedElem = getItem('eventsList').find(
		(elem) => elem.id === getItem('eventIdToDelete'),
	);

	if (new Date(findedElem.start).getDate() === new Date().getDate()) {
		let from =
			new Date(findedElem.start).getHours() * 60 +
			new Date(findedElem.start).getMinutes();
		let now = new Date().getHours() * 60 + new Date().getMinutes();

		if (from - now < 15 && from - now > 0) {
			return alert(`Can't delete this task. It will be in 15 minutes`);
		}
	}

	deleteEvent(getItem('eventIdToDelete'))
		.then(() => getEventsList())
		.then((newTasksList) => {
			setItem('eventsList', newTasksList);
			closePopup();
			renderEvents();
		});
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
