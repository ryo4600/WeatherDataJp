import React, { useState, useEffect, useContext } from "react";
import { Container, Form } from "react-bootstrap";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import configData from "../config.json";
import LocationContext from "../store/LocationContext";
import StatusContext from '../store/StatusContext'
import ByDayDetail from "../components/ByDayDetail";
import ByDaySummary from "../components/ByDaySummary";
import { getServerUrl, generateErrorMsg } from "../utils/commonTools";

//-----------------------------------------------------------------------------
// SCREEN: By Day
//-----------------------------------------------------------------------------
function ByDayScreen() {
	const [date, setDate] = useState(new Date());
	const [years, setYears] = useState(10);
	const [byDayData, setByDayData] = useState(undefined);
	const { station } = useContext(LocationContext);
	const { setIsLoading, SetLoadingMessage, setErrorMessage } =
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
			SetLoadingMessage(`${dt}のデータ取得中`)
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
			<div className="flex-wrap my-2">
				<div className="flex-wrap">
					<DatePicker
						className="py-1 px-1"
						dateFormat="MM 月 dd 日"
						selected={date}
						onChange={handleDateChange}
					/>
				</div>
				<span className="mx-3 center-text"> の過去</span>
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
				<span className="mx-3 center-text"> を見る</span>
			</div>
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
