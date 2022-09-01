import { openModal } from '../common/modal.js';
import { getItem } from '../common/storage.js';
import { setItem } from '../common/storage.js';
import { getStartOfWeek } from '../common/time.utils.js';
import { generateWeekRange } from '../common/time.utils.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const calHeader = document.querySelector('.calendar__header');
setItem('displayedWeekStart', getStartOfWeek(new Date()));
const createModalBtn = document.querySelector('.create-event-btn');

export const renderHeader = () => {
	// на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
	// на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
	// полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
	// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка

	const a = generateWeekRange(new Date(getItem('displayedWeekStart')));
	const b = a
		.map(
			(weekNumber) => `<div 
                            class = 'calendar__day-label day-label'>
							<span class ='day-label__day-name'>${daysOfWeek[weekNumber.getDay()]}</span>
							<span class ='day-label__day-number'>${weekNumber.getDate()}</span>
							</div>`,
		)
		.join('');
	calHeader.innerHTML = b;
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик

createModalBtn.addEventListener('click', openModal);
