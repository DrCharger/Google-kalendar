import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { renderEvents } from './events/events.js';
import { getEventsList } from './common/eventsGateWays.js';

document.addEventListener('DOMContentLoaded', () => {
	// инициализация всех элементов

	getEventsList().then((eventList) => {
		setItem('displayedWeekStart', getStartOfWeek(new Date()));
		setItem('eventsList', eventList);
		renderTimescale();
		renderWeek();
		renderHeader();
		initNavigation();
	});
});

const onStorageChange = (e) => {
	if (e.key !== 'events') {
		return;
	}

	renderEvents();
};

window.addEventListener('storage', onStorageChange);
