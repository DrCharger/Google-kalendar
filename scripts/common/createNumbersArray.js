export const createNumbersArray = (from, to) => {
	const result = [];
	for (let index = from; index <= to; index++) {
		result.push(index);
	}
	return result;
};

export const addZero = (arg) => {
	if (arg < 10) {
		arg = `0${arg}`;
	}
	return arg;
};
