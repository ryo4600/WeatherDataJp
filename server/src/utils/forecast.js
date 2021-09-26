const request = require("request");

const forecast = async (longitude, latitude, access_token) => {
	const url = `http://api.weatherstack.com/current?access_key=${access_token}&query=${latitude},${longitude}&units=m`;
	return new Promise((resolve, reject) => {
		request({ url, json: true }, (error, { body }) => {
			if (error) {
				return reject(error)
			} else if (body.error) {
				return reject("unable to find location. " + JSON.stringify(body.error))
			}
			resolve(body.current)
		});
	});
};

module.exports = forecast;
