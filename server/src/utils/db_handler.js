const sqlite3 = require('sqlite3');
var path = require('path')

const db = new sqlite3.Database(path.join(__dirname, '..', 'data', 'weather.sqlite3'))

//---------------------------------------------------------
// Get all stations
//---------------------------------------------------------
const getStations = (callback) => {
	const sql = 'SELECT stations.*, areas.name as area_name FROM stations JOIN areas ON stations.area_id = areas.code'
	db.all(sql, (err, res) => {
		if(err) {
			callback( err, null)}
		else {
			callback(null, res)
		}
	})
}

//---------------------------------------------------------
// Get past weather data of a station
//---------------------------------------------------------
const getDataByDay = (station_code, year, month, day, years, callback) => {
	const sql = `SELECT * FROM weatherData WHERE station_code=${station_code} AND year <= ${year} AND year >=${year-years} AND month=${month} AND day=${day} ORDER BY year DESC`
	console.log(sql)
	db.all(sql, (err, res) => {
		if(err) {
			callback( err, null)}
		else {
			callback(null, res)
		}
	})
}

module.exports = {
	getStations,
	getDataByDay,
}