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

const onChangeWeek = (event) => {
	// при переключении недели обновите 'displayedWeekStart' в storage
	// и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
	let thisWeek;
	if (event.target.closest('button').dataset.direction === 'prev') {
		thisWeek = new Date(
			new Date(getItem('displayedWeekStart')).setDate(
				getItem('displayedWeekStart').getDate() - 7,
			),
		);
	}
	if (event.target.closest('button').dataset.direction === 'next') {
		thisWeek = new Date(
			new Date(getItem('displayedWeekStart')).setDate(
				getItem('displayedWeekStart').getDate() + 7,
			),
		);
	}
	if (event.target.closest('button').dataset.direction === 'today') {
		thisWeek = new Date();
	}
	setItem('displayedWeekStart', getStartOfWeek(thisWeek));
	renderCurrentMonth();
	renderHeader();
	renderWeek();
};

export const initNavigation = () => {
	renderCurrentMonth();
	navElem.addEventListener('click', onChangeWeek);
};
