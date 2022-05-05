import React, { useState, useEffect, useContext } from 'react';
import { Container, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import configData from '../config.json';

import LocationContext from '../store/LocationContext';
import NormalDay from './NormalDay';

function NormalDays() {
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
		var newArray = [];
		newArray.push(station);
		setStations(newArray);
		//stations.forEach((st) => st.execGetData(date, years));
	}, [date, years, station]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className="flex-wrap my-2">
				<span className="me-3 center-text">日付</span>
				<div className="flex-wrap">
					<DatePicker
						className="py-1 px-1"
						dateFormat="MM 月 dd 日"
						selected={date}
						onChange={handleDateChange}
					/>
				</div>
				<span className="mx-3 center-text"> 期間</span>
				<div className="flex-wrap">
					<Form.Control
						as="select"
						value={years}
						onChange={(e) => handleYearsChange(e.target.value)}
					>
						<option key="10" value="10">
							10年
						</option>
						<option key="20" value="20">
							20年
						</option>
						<option key="50" value="50">
							全て
						</option>
					</Form.Control>
				</div>
			</div>
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

export default NormalDays;
