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

export function openModal() {
	modalElem.classList.remove('hidden');
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
	changeDate.value = `${a.start.getFullYear()}-0${a.start.getMonth()}-${a.start.getDate()}`;
	changeDate.setAttribute('readonly', 'readonly');
	const startTime = document.querySelector('input[name = startTime]').value;
	a.start = getDateTime(changeDate.value, startTime);
	const endTime = document.querySelector('input[name = endTime]').value;
	a.end = getDateTime(changeDate.value, endTime);
}
modalContentElem.addEventListener('click', onClickInsideModal);
modalElem.addEventListener('click', closeModal);
