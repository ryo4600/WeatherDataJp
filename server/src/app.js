const path = require("path");
const express = require("express");
const cors = require('cors')

const HTTP_PORT = process.env.PORT || 9000

const db = require("./utils/db_handler");
const {forwardGeocoding, reverseGeocoding} = require("./utils/geocode");
const {currentWeather, forecast} = require("./utils/forecast");

const app = express();
app.use(cors())

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

//---------------------------------------------------------
// GET: Get all stations
//---------------------------------------------------------
app.get("/stations", async (req, res) => {
	try {
		const data = await db.getStations();
		res.json(data);
	} catch (err) {
		return res.status(500).send(err);
	}
});

//---------------------------------------------------------
// GET: Get weather data for past years of the day
// ex.  /weather/byday/47401?year=2021&month=9&day=1&years=10
//---------------------------------------------------------
app.get("/weather/byday/:station_code", async (req, res) => {
	const station_code = req.params.station_code;
	const { year, month, day, years } = req.query;
	try {
		const data = await db.getDataByDay(
			station_code,
			year,
			month,
			day,
			years
		);
		res.json(data);
	} catch (err) {
		return res.status(500).send(err);
	}
});

//---------------------------------------------------------
// GET: Get weather data for past years of the week specified
// ex.  /weather/byweek/47401?year=2021&month=9&day=1&years=10
//---------------------------------------------------------
app.get("/weather/byweek/:station_code", async (req, res) => {
	const station_code = req.params.station_code;
	const { year, month, day, years } = req.query;

	try {
		const data = await db.getDataByWeek(
			station_code,
			year,
			month,
			day,
			years
		);
		res.json(data);
	} catch (err) {
		return res.status(500).send(err);
	}
});

//---------------------------------------------------------
// GET: Get the latitude, longitude from place name
//---------------------------------------------------------
app.get("/geolocation", async (req, res) => {
	if (!req.query.address) {
		return res.status(400).send({
			error: "you must provide an address",
		});
	}

	try {
		res.json(await forwardGeocoding(req.query.address, process.env.GEOCODE_TOKEN))
	}
	catch(err){
		return res.status(500).send(err);
	}
})

//---------------------------------------------------------
// GET: Get the placename from latitude, longitude
//---------------------------------------------------------
app.get("/placelookup", async (req, res) =>{
	if (!req.query.latitude || !req.query.longitude) {
		return res.status(400).send({
			error: "you must provide latitude and longitude",
		});
	}

	try {
		res.json(await reverseGeocoding(req.query.latitude, req.query.longitude, process.env.GEOCODE_TOKEN))
	}
	catch(err){
		return res.status(500).send(err);
	}

})

//---------------------------------------------------------
// GET: Get the weather forecast from latitude and longitude
//---------------------------------------------------------
app.get("/weather/forecast", async(req, res) => {
	try {
		const data = await forecast(req.query.areaName)
		res.json(data)
	} catch(err) {
		return res.status(500).send("failed to get the forecast. " + err)
	}
})

//---------------------------------------------------------
// GET: Get the current weather from latitude and longitude
//---------------------------------------------------------
app.get("/weather/current", async(req, res) => {
	try {
		const data = await currentWeather(req.query.longitude, req.query.latitude, process.env.FORECAST_TOKEN)
		res.json(data)
			// res.send({
			// 	address: req.query.address,
			// 	forecast: forecastData,
			// 	location,
			// });
		//});
	} catch(err) {
		return res.status(500).send("failed to get the forecast. " + err)
	}
})

//---------------------------------------------------------
// Need this route for heroku deployment
//---------------------------------------------------------
app.get('*', (req, res)=> {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(HTTP_PORT, () => {
	console.log(`Server is up on port ${HTTP_PORT}.`);
});
