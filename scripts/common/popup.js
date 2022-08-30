import { openModalChange } from '../common/modal.js';

const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y) {
	popupElem.classList.remove('hidden');
	popupContentElem.style.top = `${y}px`;
	popupContentElem.style.left = `${x}px`;
	if (popupContentElem.childElementCount === 1) {
		const changer = document.createElement('button');
		changer.classList.add('change-event-btn');
		changer.textContent = 'Change your info';
		popupContentElem.append(changer);
		let changeEventBtn = document.querySelector('.change-event-btn');
		changeEventBtn.addEventListener('click', onChangeEvent);
	}
}

export function closePopup() {
	popupElem.classList.add('hidden');
}

function onChangeEvent() {
	closePopup();
	openModalChange();
}

function onClickInsidePopup(event) {
	event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
