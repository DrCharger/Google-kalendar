import { addZero } from '../common/createNumbersArray.js';
import { getItem, setItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { updateEvent, getEventsList } from '../common/eventsGateWays.js';
import { renderEvents } from './events.js';

const modalElem = document.querySelector('.modal');
const changeTitle = document.querySelector('input[name = title]');
const changeDescription = document.querySelector(
	'textarea[name = description]',
);
const changeDate = document.querySelector('input[name = date]');

export function openModalChange() {
	modalElem.classList.remove('hidden');
	const findAll = getItem('eventsList') || [];
	const finded = findAll.find(
		(elem) => elem.id === getItem('eventIdToDelete'),
	);
	dateOperations(finded);
}

const dateOperations = ({ title, description, start, end }) => {
	changeTitle.value = title;
	changeTitle.setAttribute('readonly', 'readonly');
	changeDescription.value = description;
	changeDescription.setAttribute('readonly', 'readonly');
	let monthAddZero = addZero(new Date(start).getMonth() + 1);
	let dayAddZero = addZero(new Date(start).getDate());
	changeDate.value = `${new Date(
		start,
	).getFullYear()}-${monthAddZero}-${dayAddZero}`;
	changeDate.setAttribute('readonly', 'readonly');
	let startMinutesAddZero = addZero(new Date(start).getMinutes());
	let startHoursAddZero = addZero(new Date(start).getHours());
	document.querySelector(
		'input[name = startTime]',
	).value = `${startHoursAddZero}:${startMinutesAddZero}`;

	let endMinutesAddZero = new Date(end).getMinutes();
	endMinutesAddZero = addZero(endMinutesAddZero);
	let endHoursAddZero = new Date(end).getHours();
	endHoursAddZero = addZero(endHoursAddZero);
	document.querySelector(
		'input[name = endTime]',
	).value = `${endHoursAddZero}:${endMinutesAddZero}`;
	let endTime = document.querySelector('input[name = endTime]').value;
	getDateTime(changeDate.value, endTime);
	let startTime = document.querySelector('input[name = startTime]').value;
	getDateTime(changeDate.value, startTime);
};
