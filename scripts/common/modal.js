import { getItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { addZero } from './createNumbersArray.js';
import { onDeleteEvent } from '../events/events.js';

const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
const changeTitle = document.querySelector('input[name = title]');
const changeDescription = document.querySelector(
	'textarea[name = description]',
);
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

export function openModalChange() {
	modalElem.classList.remove('hidden');
	const a = getItem('events') || [];
	const finded = a.find((elem) => elem.id === getItem('eventIdToDelete'));
	changeTitle.value = finded.title;
	changeTitle.setAttribute('readonly', 'readonly');
	changeDescription.value = finded.description;
	changeDescription.setAttribute('readonly', 'readonly');
	let monthAddZero = new Date(finded.start).getMonth() + 1;
	monthAddZero = addZero(monthAddZero);
	let dayAddZero = new Date(finded.start).getDate();
	dayAddZero = addZero(dayAddZero);
	changeDate.value = `${new Date(
		finded.start,
	).getFullYear()}-${monthAddZero}-${dayAddZero}`;
	changeDate.setAttribute('readonly', 'readonly');
	let startMinutesAddZero = new Date(finded.start).getMinutes();
	startMinutesAddZero = addZero(startMinutesAddZero);
	let startHoursAddZero = new Date(finded.start).getHours();
	startHoursAddZero = addZero(startHoursAddZero);
	document.querySelector(
		'input[name = startTime]',
	).value = `${startHoursAddZero}:${startMinutesAddZero}`;
	let startTime = document.querySelector('input[name = startTime]').value;

	finded.start = getDateTime(changeDate.value, startTime);
	let endMinutesAddZero = new Date(finded.end).getMinutes();
	endMinutesAddZero = addZero(endMinutesAddZero);
	let endHoursAddZero = new Date(finded.end).getHours();
	endHoursAddZero = addZero(endHoursAddZero);
	document.querySelector(
		'input[name = endTime]',
	).value = `${endHoursAddZero}:${endMinutesAddZero}`;
	let endTime = document.querySelector('input[name = endTime]').value;
	finded.end = getDateTime(changeDate.value, endTime);
	onDeleteEvent();
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
