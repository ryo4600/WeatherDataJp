import React, { useState } from "react";

const LocationContext = React.createContext({
	location: {},
	setLocation: (location) => {},
	station: {},
	setStation: (station) => {},
	currentDate: new Date(),
	selectDate: (date) => {},
});

export default LocationContext;

///////////////////////////////////////////////////////////
// Global methods
///////////////////////////////////////////////////////////
// ---------------------------------
// Retrieve previous data
// ---------------------------------
const retrieveStoredData = () => {
	const storedDate = localStorage.getItem("currentDate");
	const storedLocation = localStorage.getItem('location')
	const storedStation = localStorage.getItem('station')

	let selectedDate = new Date();
	if (storedDate) {
		selectedDate = new Date(storedDate);
	}

	let location = undefined;
	if(storedLocation) {
		try {
			location = JSON.parse(storedLocation)
		} catch {
			location = undefined
		}
	}

	let station = undefined
	if(storedStation) {
		try {
			station = JSON.parse(storedStation)
		}catch {
			station = undefined
		}
	}

	return {
		date: selectedDate,
		location,
		station
	};
};

///////////////////////////////////////////////////////////
// Location provider
///////////////////////////////////////////////////////////
export const LocationContextProvider = (props) => {
	const storedData = retrieveStoredData();

	let initialDate = new Date();
	const [location, setLocation] = useState (storedData.location)
	const [station, setStation] = useState(storedData.station)
	const [date, setDate] = useState(initialDate);

	const locationSelectedHandler = (loc) => {
		setLocation(loc)
		localStorage.setItem('location', JSON.stringify(loc))
	}

	const stationSelectedHandler = (stn) => {
		setStation(stn)
		localStorage.setItem('station', JSON.stringify(stn))
	}

	const selectDateHandler = (date) => {
		setDate(date);
		localStorage.setItem("currentDate", date.toISOString());
	};

	const contextValue = {
		location,
		setLocation: locationSelectedHandler,
		station,
		setStation: stationSelectedHandler,
		currentDate: date,
		selectDate: selectDateHandler,
	};

	return (
		<LocationContext.Provider value={contextValue}>
			{props.children}
		</LocationContext.Provider>
	);
};
