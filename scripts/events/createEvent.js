import { setItem, getItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import {
	createEvent,
	getEventsList,
	updateEvent,
} from '../common/eventsGateWays.js';

const closeBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
	// ф-ция должна очистить поля формы от значений
	document.querySelectorAll('.event-form__field').forEach((elem) => {
		elem.value = '';
		elem.removeAttribute('readonly');
	});
	document.querySelector('.event-form__field__description').value = '';
	document
		.querySelector('.event-form__field__description')
		.removeAttribute('readonly');
}

function onCloseEventForm() {
	clearEventForm();
	closeModal();
}
export function onCreateEvent(event) {
	event.preventDefault();
	const title = document.querySelector('input[name = title]').value;
	const date = document.querySelector('input[name = date]').value;
	const startTime = document.querySelector('input[name = startTime]').value;
	const start = getDateTime(date, startTime);
	start.getMinutes() % 15 === 0
		? start
		: start.setMinutes(start.getMinutes() - (start.getMinutes() % 15));
	const endTime = document.querySelector('input[name = endTime]').value;
	const end = getDateTime(date, endTime);
	end.getMinutes() % 15 === 0
		? end
		: end.setMinutes(end.getMinutes() - (end.getMinutes() % 15));
	const description = document.querySelector(
		'textarea[name = description]',
	).value;

	const newEvent = { start, end, title, description };

	if (getItem('eventIdToDelete') !== null) {
		updateEvent(getItem('eventIdToDelete'), newEvent)
			.then(() => getEventsList())
			.then((newTasksList) => {
				setItem('eventsList', newTasksList);
				renderEvents();
			});
	} else {
		createEvent(newEvent)
			.then(() => getEventsList())
			.then((newTaskList) => {
				setItem('eventsList', newTaskList);
				onCloseEventForm();
				renderEvents();
			});
	}
}

closeBtn.addEventListener('click', onCloseEventForm);
