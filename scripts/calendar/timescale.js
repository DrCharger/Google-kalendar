import { createNumbersArray } from '../common/createNumbersArray.js';

const timeScale = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
	// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
	// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
	const time = createNumbersArray(0, 24)
		.map((time) => {
			if (time < 10) {
				time = `0${time}`;
			}
			return `<div 
                            class = 'time-slot'
                            ><span 
                              class = 'time-slot__time'>${time} AM</span></div>`;
		})
		.join('');

	timeScale.innerHTML = time;
};
