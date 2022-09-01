import { getItem } from '../common/storage.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

// const startTimeInputElem = document.querySelector('input[name = startTime]');
const endTimeInputElem = document.querySelector('input[name = endTime]');
const submitBtn = document.querySelector('.event-form__submit-btn');

const validation = () => {
	const startTimeInputElem = document.querySelector('input[name = startTime]');
	const endTimeInputElem = document.querySelector('input[name = endTime]');
	let to =
		endTimeInputElem.value.split(':')[0] * 60 +
		+endTimeInputElem.value.split(':')[1];
	let from =
		startTimeInputElem.value.split(':')[0] * 60 +
		+startTimeInputElem.value.split(':')[1];
	if (to < from) {
		alert('Invalid time');
		endTimeInputElem.value = '';
	}
	if (to - from > 360) {
		alert('More than six hours');
		endTimeInputElem.value = '';
	}
};

const crossTasks = () => {
	const endTimeInputElem = document.querySelector('input[name = endTime]');
	const startTimeInputElem = document.querySelector('input[name = startTime]');
	const dateInputElem = document.querySelector('input[name = date]');
	const dateForFilter = new Date(dateInputElem.value);
	let a = getItem('events') || [];
	const b = a
		.filter(
			(elem) => new Date(elem.start).getDate() === dateForFilter.getDate(),
		)
		.map((elem) => {
			const from =
				new Date(elem.start).getHours() * 60 +
				(new Date(elem.start).getMinutes() % 15);
			const to =
				new Date(elem.end).getHours() * 60 + new Date(elem.end).getMinutes();
			return (elem = createNumbersArray(from, to));
		});

	let crossEnd =
		+endTimeInputElem.value.split(':')[0] * 60 +
		+endTimeInputElem.value.split(':')[1];
	let crossStart =
		+startTimeInputElem.value.split(':')[0] * 60 +
		+startTimeInputElem.value.split(':')[1];

	if (b.find((elem) => elem.includes(crossEnd))) {
		alert('You have task at this time');
		endTimeInputElem.value = '';
	}
	if (b.find((elem) => elem.includes(crossStart))) {
		alert('You have task at this time');
		startTimeInputElem.value = '';
	}
};

endTimeInputElem.addEventListener('change', validation);
submitBtn.addEventListener('click', crossTasks);
