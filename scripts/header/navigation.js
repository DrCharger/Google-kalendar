import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
	'.navigation__displayed-month',
);

function renderCurrentMonth() {
	// отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
	// вставить в .navigation__displayed-month
	displayedMonthElem.textContent = getDisplayedMonth(
		getItem('displayedWeekStart'),
	);
}
// const right = document.querySelector('.fa-chevron-right');
// const left = document.querySelector('.fa-chevron-left');
// const today = document.querySelector('.navigation__today-btn');

const onChangeWeek = (event) => {
	// при переключении недели обновите 'displayedWeekStart' в storage
	// и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
	let a;
	if (event.target.closest('button').dataset.direction === 'prev') {
		a = new Date(
			new Date(getItem('displayedWeekStart')).setDate(
				getItem('displayedWeekStart').getDate() - 7,
			),
		);
	}
	if (event.target.closest('button').dataset.direction === 'next') {
		a = new Date(
			new Date(getItem('displayedWeekStart')).setDate(
				getItem('displayedWeekStart').getDate() + 7,
			),
		);
	}
	if (event.target.closest('button').dataset.direction === 'today') {
		a = new Date();
	}
	setItem('displayedWeekStart', getStartOfWeek(a));
	renderCurrentMonth();
	renderHeader();
	renderWeek();
};

export const initNavigation = () => {
	renderCurrentMonth();
	navElem.addEventListener('click', onChangeWeek);
};
