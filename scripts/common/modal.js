import { getItem, setItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';

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
	if (minutesAddZero < 10) {
		minutesAddZero = `0${minutesAddZero}`;
	}
	let monthAddZero = new Date().getMonth() + 1;
	if (monthAddZero < 10) {
		monthAddZero = `0${monthAddZero}`;
	}
	document.querySelector(
		'input[name = startTime]',
	).value = `${new Date().getHours()}:${minutesAddZero}`;

	document.querySelector(
		'input[name = date]',
	).value = `${new Date().getFullYear()}-${monthAddZero}-${new Date().getDate()}`;
}

export function closeModal() {
	modalElem.classList.add('hidden');
}

function onClickInsideModal(event) {
	event.target === document.querySelector('.create-event__close-btn')
		? closeModal()
		: console.log();
	event.stopPropagation();
}

export function openModalChange() {
	modalElem.classList.remove('hidden');
	const a = getItem('events').find(
		(elem) => elem.id === getItem('eventIdToDelete'),
	);
	changeTitle.value = a.title;
	changeTitle.setAttribute('readonly', 'readonly');
	changeDescription.value = a.description;
	changeDescription.setAttribute('readonly', 'readonly');
	let monthAddZero = a.start.getMonth() + 1;
	if (monthAddZero < 10) {
		monthAddZero = `0${monthAddZero}`;
	}
	changeDate.value = `${a.start.getFullYear()}-${monthAddZero}-${a.start.getDate()}`;
	changeDate.setAttribute('readonly', 'readonly');
	const startTime = document.querySelector('input[name = startTime]').value;
	a.start = getDateTime(changeDate.value, startTime);
	const endTime = document.querySelector('input[name = endTime]').value;
	a.end = getDateTime(changeDate.value, endTime);
}

export function openModalSmallTask(event) {
	openModal();
	changeDate.value = `${new Date().getFullYear()}-0${
		event.target.closest('.calendar__day').dataset.month
	}-${event.target.closest('.calendar__day').dataset.day}`;
	changeDate.setAttribute('readonly', 'readonly');

	changeStartTime.value = `${event.target.dataset.time}:00`;
	changeStartTime.setAttribute('readonly', 'readonly');
	let a = +event.target.dataset.time + 1;
	if (a < 10) {
		a = `0${a}`;
	}

	changeEndTime.value = `${a}:00`;
	changeEndTime.setAttribute('readonly', 'readonly');
}

modalContentElem.addEventListener('click', onClickInsideModal);
modalElem.addEventListener('click', closeModal);
