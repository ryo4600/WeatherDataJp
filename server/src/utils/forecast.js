const request = require("request");
const { offices } = require("../data/offices.json");
const utils = require("./commonTools");

const currentWeather = async (longitude, latitude, access_token) => {
	const url = `http://api.weatherstack.com/current?access_key=${access_token}&query=${latitude},${longitude}&units=m`;
	return new Promise((resolve, reject) => {
		request({ url, json: true }, (error, { body }) => {
			if (error) {
				return reject(error);
			} else if (body.error) {
				return reject(
					"unable to find location. " + JSON.stringify(body.error)
				);
			}
			resolve(body.current);
		});
	});
};

// const findClosest = (lat, lon) => {
// 	//console.log("area", Object.keys(areas))
// 	var areasInclude = Object.keys(areas).filter((key) => {
// 		const area = areas[key];
// 		return (
// 			area.ne[0] > lat &&
// 			area.sw[0] < lat &&
// 			area.ne[1] > lon &&
// 			area.sw[1] < lon
// 		);
// 	});

// 	var closest = areasInclude
// 		.map((key) => {
// 			const area = areas[key];
// 			return {
// 				area: key,
// 				name: area.name,
// 				latitude: (area.ne[0] + area.sw[0]) / 2.0,
// 				longitude: (area.ne[0] + area.sw[0]) / 2.0,
// 			};
// 		})
// 		.reduce((a, b) => {
// 			return utils.latLonDistance(lat, lon, a.latitude, a.longitude) <
// 				utils.latLonDistance(lat, lon, b.latitude, b.longitude)
// 				? a
// 				: b;
// 		});

// 	return closest;
// }

//--------------------------------------
// find an office where the area belongs
//--------------------------------------
const findOffice = (area_name) => {
	var officeFound = Object.keys(offices).filter((key) => {
		const office = offices[key];
		if (office.name === area_name) {
			return office;
		}
	});
	return officeFound;
};

//--------------------------------------
// Parse forecast for 3 days part
//--------------------------------------
const parse3daysForcast = (data) => {
	let retVals = [];

	if(!data) {
		return retVals
	}

	// name, code, weather and winds
	data[0].areas.map((areaRoot) => {
		let val = { name: areaRoot.area.name, code: areaRoot.area.code };
		val.days = data[0].timeDefines.map((dt, index) => {
			const dateVal = new Date(dt)
			return {
				year: dateVal.getFullYear(),
				month: dateVal.getMonth() + 1,
				day: dateVal.getDate(),
				weather: areaRoot.weathers[index],
				winds: areaRoot.winds[index],
				rains: [],
				temperatures: [{hour:9, temperature: ''}, {hour:0, temperature: ''}]
			};
		});
		retVals.push(val);
	});

	// precipitations percentage
	data[1].areas.map((areaRoot, index) => {
		let val = retVals[index]
		data[1].timeDefines.map((dt, index) => {
			const dateVal = new Date(dt)
			const found = val.days.find((dayData) => dayData.day === dateVal.getDate())
			found.rains.push(
				{
					hour: dateVal.getHours(),
					rain: areaRoot.pops[index],
				}
			)
		}
		);

		// rain has four values per day => 0, 6, 12, 18 h
		// if first data is for 12, add default value for 0 and 6
		val.days.map((dayParsed) => {
			let timeToFill = dayParsed.rains.length === 0 ? 18 : dayParsed.rains[0].hour - 6
			for(; timeToFill >= 0; timeToFill -= 6){
				dayParsed.rains.splice(0, 0, { hour: timeToFill, rain: ''})
			}

		})
	});

	// temperature
	data[2].areas.map((areaRoot, index) => {
		let val = retVals[index]
		if( !val) return
		data[2].timeDefines.map((dt, index) => {
			const dateVal = new Date(dt)
			const found = val.days.find((dayData) => dayData.day === dateVal.getDate())
			let idxToUpdate = 0;
			if( dateVal.getHours() === 0){
				idxToUpdate = 1;
			}

			found.temperatures[idxToUpdate].temperature = areaRoot.temps[index]
		});
	});

	return retVals;
};

//--------------------------------------
// Parse forecast for 7 days part
//--------------------------------------
const parse7daysForcast = (data) => {
	let retVals = [];

	if(!data) {
		return retVals
	}

	// name, code, rain, reliability
	data[0].areas.map((areaRoot) => {
		let val = { name: areaRoot.area.name, code: areaRoot.area.code };
		val.days = data[0].timeDefines.map((dt, index) => {
			const dateVal = new Date(dt)
			return {
				year: dateVal.getFullYear(),
				month: dateVal.getMonth() + 1,
				day: dateVal.getDate(),
				rain: areaRoot.pops[index],
				reliability: areaRoot.reliabilities[index],
				days: [],
			};
		});
		retVals.push(val);
	});

	// precipitations percentage
	data[1].areas.map((areaRoot, index) => {
		let val = retVals[index]
		data[1].timeDefines.map((dt, index) => {
			const dateVal = new Date(dt)
			const found = val.days.find((dayData) => dayData.day === dateVal.getDate())

			// Assuming timeDefines have only one definition per day.
			// Therefore, we do not put values in arrays like the parsese3day 
			found.tempsMin = areaRoot.tempsMin[index]
			found.tempsMinUpper = areaRoot.tempsMinUpper[index]
			found.tempsMax = areaRoot.tempsMax[index]
			found.tempsMaxUpper = areaRoot.tempsMaxUpper[index]
			found.tempsMaxLower = areaRoot.tempsMaxLower[index]
		});
	});

	return retVals;
};

//--------------------------------------
// weather forecast
//--------------------------------------
const forecast = async (area_name) => {

	const office = findOffice(area_name);

	// fails first time when starting from compiled client
	if( office.length === 0) {
		return
	}

	const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${office[0]}.json`;

	return new Promise((resolve, reject) => {
		request({ url, json: true }, (error, { body }) => {
			if (error) {
				return reject(error);
			} else if (body.error) {
				return reject(
					"unable to find location. " + JSON.stringify(body.error)
				);
			}
	
			const days3 = parse3daysForcast(body[0].timeSeries)
			const days7 = parse7daysForcast(body[1].timeSeries)

			resolve({
				days3,
				days7,
			});
		});
	});
};

module.exports = {
	currentWeather,
	forecast,
};
