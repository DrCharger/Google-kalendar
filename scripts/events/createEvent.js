import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const submitBtn = document.querySelector('.event-form__submit-btn');

function clearEventForm() {
	// ф-ция должна очистить поля формы от значений
	document
		.querySelectorAll('.event-form__field')
		.forEach((elem) => (elem.value = ''));
}

function onCloseEventForm() {
	clearEventForm();
	closeModal();
}
function onCreateEvent(event) {
	// задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
	// создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
	// при подтверждении формы нужно считать данные с формы
	// с формы вы получите поля date, startTime, endTime, title, description
	// на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
	// date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
	// полученное событие добавляем в массив событий, что хранится в storage
	// закрываем форму
	// и запускаем перерисовку событий с помощью renderEvents
	event.preventDefault();
	const title = document.querySelector('input[name = title]').value;
	const date = document.querySelector('input[name = date]').value;
	const startTime = document.querySelector('input[name = startTime]').value;
	const start = getDateTime(date, startTime);
	const endTime = document.querySelector('input[name = endTime]').value;
	const end = getDateTime(date, endTime);
	const description = document.querySelector(
		'textarea[name = description]',
	).value;
	const id = `0.${Date.parse(start)}`;
	// console.log(getItem('events'));
	getItem('events').push({ id, start, end, title, description });
	// console.log(getItem('events'));
	onCloseEventForm();
	renderEvents();
}

export function initEventForm() {
	// подпишитесь на сабмит формы и на закрытие формы
}

submitBtn.addEventListener('click', onCreateEvent);
