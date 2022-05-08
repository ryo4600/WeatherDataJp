import React, { useState, useEffect, useContext } from 'react';
import configData from '../config.json';

import DateAndPeriodInput from '../components/parts/DateAndPeriodInput';
import NormalDay from '../components/NormalDay';
import LocationContext from '../store/LocationContext';
import EditableLocationText from '../components/parts/EditableLocationText';

function HomeScreen() {
	const [date, setDate] = useState(new Date());
	const [years, setYears] = useState(10);

	const { station } = useContext(LocationContext);
	const [stations, setStations] = useState([]);

	const handleYearsChange = (value) => {
		setYears(value);
		//stations.forEach((st)=>st.execGetData(date, value))
	};

	const handleDateChange = (value) => {
		setDate(value);
		//stations.forEach((st) => st.execGetData(value, years));
	};

	useEffect(() => {
		document.title = `${configData.TITLE}(ホーム)`;
		if (station) {
			var newArray = [];
			newArray.push(station);
			setStations(newArray);
		}
		//stations.forEach((st) => st.execGetData(date, years));
	}, [date, years, station]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<EditableLocationText />
			<DateAndPeriodInput
				date={date}
				years={years}
				handleDateChange={handleDateChange}
				handleYearsChange={handleYearsChange}
			/>
			<hr />
			{stations &&
				stations.map((st) => {
					return (
						<NormalDay
							key={st.code}
							station={st}
							date={date}
							years={years}
						/>
					);
				})}
		</>
	);
}

export default HomeScreen;
