const request = require("request");

const forwardGeocoding = async (address, access_token) => {
	// console.log('reverseGeocoding...', address, access_token)
	const encodedAddress = encodeURIComponent(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${access_token}&language=ja`;
	return new Promise((resolve, reject) => {
		request({ url: url, json: true }, (error, response) => {
			if (error) {
				return reject("unable to connect to location server");
			} else if (!response.body.features) {
				return reject("sending request error " + response.body.message, undefined);
			} else if (response.body.features.length == 0) {
				return reject("no location found", undefined);
			}

			//resolve(response.body.features)
			resolve(response.body.features.map( (feature) => {
				const {center, place_name} = feature
				return {name: place_name, latitude: center[1], longitude: center[0],} 
			}))
		});
	})
};

const reverseGeocoding = async (latitude, longitude, access_token) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${access_token}&language=ja`;
	return new Promise((resolve, reject) => {
		request({ url: url, json: true }, (error, response) => {
			if (error) {
				return reject("unable to connect to location server");
			} else if (!response.body.features) {
				return reject("sending request error " + response.body.message, undefined);
			} else if (response.body.features.length == 0) {
				return reject("no location found", undefined);
			}

			resolve(response.body.features.map( (feature) => {
				const {center, place_name} = feature
				return {name: place_name, latitude: center[1], longitude: center[0],} 
			}))
		});
	})
};


module.exports = {
	forwardGeocoding,
	reverseGeocoding,
}