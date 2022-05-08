const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(
	path.join(__dirname, "..", "data", "weather.sqlite3")
);

//---------------------------------------------------------
// Get all stations
//---------------------------------------------------------
const getStations = async () => {
	const query =
		"SELECT stations.*, areas.name as area_name FROM stations JOIN areas ON stations.area_id = areas.code WHERE station_type=0";
	return await db_all(query);
};

//---------------------------------------------------------
// Get past weather data of a station for the day
//---------------------------------------------------------
const getDataByDay = async (station_code, year, month, day,	years) => {
	const query = `SELECT * FROM weatherData WHERE station_code=${station_code} AND year < ${year} AND year >=${
		year - years
	} AND month=${month} AND day=${day} ORDER BY year DESC`;
	return await db_all(query);
};

//---------------------------------------------------------
// Get past weather data of a station for the week
//---------------------------------------------------------
const getDataByWeek = async (station_code, year, month, day, years) => {
	const year_from = year - years;
	const year_to = year

	let retVal = [];
	var dt_from = new Date(year, month - 1, day);
	let dt_to = new Date(dt_from);
	dt_to.setDate(dt_to.getDate() + 7);

	// Query once runs much faster than query each year.

	let query;
	if (dt_from.getMonth() === dt_to.getMonth()) {
		// same month
		query =
			`SELECT * FROM weatherdata WHERE station_code=${station_code} ` +
			`AND year >= ${year_from} AND year < ${year_to} AND month = ${dt_from.getMonth() + 1} ` +
			`AND (day >= ${dt_from.getDate()} AND day < ${dt_to.getDate()})  `;
	} else {
		// next month
		query =
			`SELECT * FROM weatherdata WHERE station_code=${station_code} ` +
			`AND ((year >= ${year_from} AND year < ${year_to} AND month = ${dt_from.getMonth() + 1} AND day >= ${dt_from.getDate()})` +
			` OR (year >= ${year_from} AND year < ${year_to} AND month = ${dt_to.getMonth() + 1} AND day < ${dt_to.getDate()}))`;
	}

	const all = await db_all(query);
	for(var i = year_to - 1; i >= year_from; i--) {
		retVal.push({ year : i, data: all.filter((theData) => theData.year === i ) });
	}

	return retVal;
};

//---------------------------------------------------------
// Utility function to make sqlite3 awaitable
//---------------------------------------------------------
const db_all = async (query) => {
	return new Promise((resolve, reject) => {
		db.all(query, (err, rows) => {
			if (err) {
				return reject(err);
			}
			resolve(rows);
		});
	});
}

module.exports = {
	getStations,
	getDataByDay,
	getDataByWeek,
};
