const path = require("path");
const express = require("express");

const HTTP_PORT = 9000

const db = require('./utils/db_handler')

const app = express();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

//---------------------------------------------------------
// GET: Get all stations
//---------------------------------------------------------
app.get('/stations', (req, res) => {
	db.getStations((err,data) => {
		if(err){
			return res.status(500).send(err)
		} 
		res.json(data)
	})
})

//---------------------------------------------------------
// GET: Get weather data by day
// ex.  /weather/byday?station_code=47401&year=2021&month=9&day=1&years=10
//---------------------------------------------------------
app.get('/weather/byday', (req, res) => {
	const {station_code, year, month, day, years } = req.query
	db.getDataByDay(station_code, year, month, day, years, (err, data) => {
		if(err){
			return res.status(500).send(err)
		} 
		res.json(data)
	})
})

app.listen(HTTP_PORT, () => {
	console.log(`Server is up on port ${HTTP_PORT}.`)
   })