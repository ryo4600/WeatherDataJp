import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";

import axios from "axios";

import DateAndPeriodInput from '../components/parts/DateAndPeriodInput';
import configData from "../config.json";
import LocationContext from "../store/LocationContext";
import StatusContext from '../store/StatusContext'
import ByDayDetail from "../components/ByDayDetail";
import ByDaySummary from "../components/ByDaySummary";
import { getServerUrl, generateErrorMsg } from "../utils/commonTools";
import EditableLocationText from "../components/parts/EditableLocationText";

//-----------------------------------------------------------------------------
// SCREEN: By Day
//-----------------------------------------------------------------------------
function ByDayScreen() {
	const [date, setDate] = useState(new Date());
	const [years, setYears] = useState(10);
	const [byDayData, setByDayData] = useState(undefined);
	const { station } = useContext(LocationContext);
	const { setIsLoading, setLoadingMessage, setErrorMessage } =
		useContext(StatusContext);

	const handleYearsChange = (value) => {
		setYears(value);
		execGetData(date, value);
	};

	const handleDateChange = (value) => {
		setDate(value);
		execGetData(value, years);
	};

	const execGetData = async (dt, yrs) => {
		if(!station) {
			return
		}
		try {
			setIsLoading(true);
			setErrorMessage('');
			setLoadingMessage(`${dt}のデータ取得中`)
			const { data } = await axios.get(
				`${getServerUrl()}/weather/byday/${	station.code}` +
				`?year=${date.getFullYear()}&month=${date.getMonth() + 1}` +
				`&day=${date.getDate()}&years=${yrs}`
			);
			setByDayData(data);
		} catch (error) {
			setErrorMessage(
				"過去のデータ取得でエラーが発生しました。" +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		document.title = `${configData.TITLE}（日でみる)`;
		const f = async () => {
			execGetData(date, years);
		};
		f();
	}, [date, years, station]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<EditableLocationText />
			<DateAndPeriodInput
				date={date}
				years={years}
				handleDateChange={handleDateChange}
				handleYearsChange={handleYearsChange}
			/>
			<hr />
			{byDayData && (
				<div>
					<h3>観測地点：{station.name}</h3>
					<ByDaySummary byDayData={byDayData} />
					<ByDayDetail byDayData={byDayData} />
				</div>
			)}
		</Container>
	);
}

export default ByDayScreen;
