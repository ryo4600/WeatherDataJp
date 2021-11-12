import configData from "../config.json";

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
	console.log("items", items);
	return items;
};

const R = Math.PI / 180;

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
