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
	console.log("items", items)
	return items
}
