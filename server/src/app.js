const path = require("path");
const express = require("express");

const HTTP_PORT = 9000;

const db = require("./utils/db_handler");

const app = express();

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

app.listen(HTTP_PORT, () => {
	console.log(`Server is up on port ${HTTP_PORT}.`);
});
