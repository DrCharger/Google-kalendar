export const createNumbersArray = (from, to) => {
	const result = [];
	for (let index = from; index <= to; index++) {
		result.push(index);
	}
	return result;
};
