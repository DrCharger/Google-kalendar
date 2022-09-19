const baseUrl = 'https://6319a5136b4c78d91b3fe284.mockapi.io/api/v1/events';

export const getEventsList = () => {
	return fetch(baseUrl).then((response) => {
		if (response.ok) {
			return response.json();
		}
		throw new Error('Internal Server Error');
	});
};

export const createEvent = (eventData) => {
	return fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(eventData),
	});
};

export const updateEvent = (eventsId, updatedEventData) => {
	return fetch(`${baseUrl}/${eventsId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(updatedEventData),
	});
};

export const deleteEvent = (eventsId) => {
	return fetch(`${baseUrl}/${eventsId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	});
};
