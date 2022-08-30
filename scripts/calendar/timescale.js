import { createNumbersArray } from '../common/createNumbersArray.js';
import { generateWeekRange } from '../common/time.utils.js';
import { getItem } from '../common/storage.js';
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

export const redLine = () => {
	const timeSLot = document.querySelector(
		`div[data-day = '${new Date().getDate()}'][data-month = '${
			new Date().getMonth() + 1
		}'] `,
	);

	const timeLine = document.createElement('div');
	timeLine.classList.add('red__line');
	timeSLot.prepend(timeLine);
};

let start = new Date().getHours() * 60 + new Date().getMinutes();
const endTime = 1440 - start;

export const anim = () => {
	const timeLine = document.querySelector('.red__line');
	let timer = setInterval(function () {
		let timePassed =
			new Date().getHours() * 60 + new Date().getMinutes() - start;
		timeLine.style.top = start + timePassed + 'px';
		if (timePassed >= endTime) {
			clearInterval(timer);
			return;
		}
	}, 50);
};
