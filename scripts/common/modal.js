import { addZero } from './createNumbersArray.js';
import { onCreateEvent } from '../events/createEvent.js';

const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');
const eventFormElem = document.querySelector('.event-form');

const changeDate = document.querySelector('input[name = date]');
const changeStartTime = document.querySelector('input[name = startTime]');
const changeEndTime = document.querySelector('input[name = endTime]');

export function openModal() {
	modalElem.classList.remove('hidden');
	let minutesAddZero = new Date().getMinutes();
	minutesAddZero = addZero(minutesAddZero);
	let monthAddZero = new Date().getMonth() + 1;
	monthAddZero = addZero(monthAddZero);
	let dayAddZero = new Date().getDate();
	dayAddZero = addZero(dayAddZero);
	document.querySelector(
		'input[name = startTime]',
	).value = `${new Date().getHours()}:${minutesAddZero}`;

	document.querySelector(
		'input[name = date]',
	).value = `${new Date().getFullYear()}-${monthAddZero}-${dayAddZero}`;
}

export function closeModal() {
	modalElem.classList.add('hidden');
}

function onClickInsideModal(event) {
	event.target === document.querySelector('.create-event__close-btn')
		? closeModal()
		: undefined;
	event.stopPropagation();
}

export function openModalSmallTask(event) {
	openModal();
	let monthAddZero = event.target.closest('.calendar__day').dataset.month;
	let dayAddZero = event.target.closest('.calendar__day').dataset.day;
	monthAddZero = addZero(monthAddZero);
	dayAddZero = addZero(dayAddZero);

	changeDate.value = `${new Date().getFullYear()}-${monthAddZero}-${dayAddZero}`;
	changeDate.setAttribute('readonly', 'readonly');

	changeStartTime.value = `${event.target.dataset.time}:00`;
	changeStartTime.setAttribute('readonly', 'readonly');
	let hoursAddZero = +event.target.dataset.time + 1;
	hoursAddZero = addZero(hoursAddZero);

	changeEndTime.value = `${hoursAddZero}:00`;
	changeEndTime.setAttribute('readonly', 'readonly');
}

modalContentElem.addEventListener('click', onClickInsideModal);
modalElem.addEventListener('click', closeModal);

eventFormElem.addEventListener('submit', onCreateEvent);
