import configData from '../config.json';

export const generateErrorMsg = (error) => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.message;
};

export const getServerUrl = () => {
	return process.env.WEATHER_URL || configData.SERVER_URL;
};

export const groupBy = (items, key) => {
	items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{}
	);
	console.log('items', items);
	return items;
};

const R = Math.PI / 180;

//--------------------------------------
// Calc distance between 2 points defined in latitude and longitude 
//--------------------------------------
export const latLonDistance = (lat1, lng1, lat2, lng2) => {
	lat1 *= R;
	lng1 *= R;
	lat2 *= R;
	lng2 *= R;
	return (
		6371 *
		Math.acos(
			Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
				Math.sin(lat1) * Math.sin(lat2)
		)
	);
};

//--------------------------------------
// Calc average from an array
//--------------------------------------
export const calcAverage = (data) => {
	if (!data) return ' - ';
	let count = 1;
	const sum = data.reduce(function (prevVal, currentVal) {
		if (!prevVal) return currentVal;
		++count;
		return prevVal + currentVal;
	}, 0);
	return sum / count;
};

//--------------------------------------
// Find max and its' index from an array
//--------------------------------------
export const findMax = (data) => {
	if (!data) return [undefined, -1];

	let index = -1;
	const max = data.reduce( (prev, current, i) => {
		if (!prev || prev < current) {
			index = i;
			return current;
		}
		return prev;
	}, undefined)

	return [max, index];
}

//--------------------------------------
// Find min and its' index from an array
//--------------------------------------
export const findMin = (data) => {
	if (!data) return [undefined, -1];

	let index = -1;
	const max = data.reduce( (prev, current, i) => {
		if (!prev || prev > current) {
			index = i;
			return current;
		}
		return prev;
	}, undefined)

	return [max, index];
}