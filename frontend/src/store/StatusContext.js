import React, { useState } from "react";

const StatusContext = React.createContext({
	location: {},
	setLocation: (location) => {},
	station: {},
	setStation: (station) => {},
	isLoading: false,
	setIsLoading: (isLoading) => {},
	loadingMessage: "",
	SetLoadingMessage: (message) => {},
	errorMessage: "",
	setErrorMessage: (message) => {},
	currentDate: new Date(),
	selectDate: (date) => {},
});

export default StatusContext;

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
// Status provider
///////////////////////////////////////////////////////////
export const StatusContextProvider = (props) => {
	const storedData = retrieveStoredData();

	let initialDate = new Date();
	const [location, setLocation] = useState (storedData.location)
	const [station, setStation] = useState(storedData.station)
	const [date, setDate] = useState(initialDate);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, SetLoadingMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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
		setLocation,
		station,
		setStation,
		currentDate: date,
		selectDate: selectDateHandler,
		isLoading,
		setIsLoading,
		loadingMessage,
		SetLoadingMessage,
		errorMessage,
		setErrorMessage,
	};

	return (
		<StatusContext.Provider value={contextValue}>
			{props.children}
		</StatusContext.Provider>
	);
};
