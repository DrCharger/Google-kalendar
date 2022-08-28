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
	const dateInputElem = document.querySelector('input[name = date]');
	const dateForFilter = new Date(dateInputElem.value);
	let a = getItem('events')
		.filter((elem) => elem.start.getDate() === dateForFilter.getDate())
		.map((elem) => {
			const from = elem.start.getHours() * 60 + (elem.start.getMinutes() % 15);
			const to = elem.end.getHours() * 60 + elem.end.getMinutes();
			return (elem = createNumbersArray(from, to));
		});

	let b =
		+endTimeInputElem.value.split(':')[0] * 60 +
		+endTimeInputElem.value.split(':')[1];

	if (a.find((elem) => elem.find((i) => i === b))) {
		alert('You have task at this time');
		endTimeInputElem.value = '';
	}
};

endTimeInputElem.addEventListener('change', validation);
submitBtn.addEventListener('click', crossTasks);
