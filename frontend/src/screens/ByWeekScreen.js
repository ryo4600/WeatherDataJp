import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";

import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import configData from "../config.json";
import LocationContext from "../store/LocationContext";
import StatusContext from "../store/StatusContext";

import DateAndPeriodInput from '../components/parts/DateAndPeriodInput';
import ByWeekDetail from "../components/ByWeekDetail";
import { getServerUrl, generateErrorMsg } from "../utils/commonTools";
import EditableLocationText from "../components/parts/EditableLocationText";

//-----------------------------------------------------------------------------
// SCREEN: By Week
//-----------------------------------------------------------------------------
function ByWeekScreen() {
	const [date, setDate] = useState(new Date());
	const [years, setYears] = useState(10);
	const [byWeekData, setByWeekData] = useState(undefined);
	const { station } = useContext(LocationContext);
	const { setIsLoading, setLoadingMessage, setErrorMessage } = useContext(StatusContext);

	const handleYearsChange = (value) => {
		setYears(value);
		execGetData(date, value);
	};

	const handleDateChange = (value) => {
		setDate(value);
		execGetData(value, years);
	};

	const execGetData = async (dt, yrs) => {
		if(!station ){
			return
		}

		try {
			setIsLoading(true);
			setErrorMessage('');
			setLoadingMessage(`${dt}のデータ取得中`);
			const { data } = await axios.get(
				`${getServerUrl()}/weather/byweek/${station.code}` +
					`?year=${date.getFullYear()}&month=${date.getMonth() + 1}` +
					`&day=${date.getDate()}&years=${yrs}`
			);
			setByWeekData(data);
		} catch (error) {
			setErrorMessage(
				"過去のデータ取得でエラーが発生しました。" +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	const getHeaders = (data) => {
		if (data === undefined || data.length === 0)
			return ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"];
		return data[0].data.map((x) => x.month + "/" + x.day);
	};

	const createArrays = (data) => {
		if (data === undefined) return;

		let retVal = [];
		data.forEach((val) => {
			retVal.push({
				year: val[0].year,
				day1: val[0].val,
				day2: val[1].val,
				day3: val[2].val,
				day4: val[3].val,
				day5: val[4].val,
				day6: val[5].val,
				day7: val[6].val,
			});
		});

		return retVal;
	};

	useEffect(() => {
		document.title = `${configData.TITLE}（週でみる)`;
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
			{byWeekData && (
				<div>
					<h3>観測地点：{station.name}</h3>
					<Tabs className="my-3">
						<TabList>
							<Tab> 最高気温 </Tab>
							<Tab> 最低気温 </Tab>
							<Tab> 平均気温 </Tab>
							<Tab> 降水量 </Tab>
							<Tab> 積雪 </Tab>
							<Tab> 日中天気 </Tab>
							<Tab> 夜間天気 </Tab>
						</TabList>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.temp_high,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.temp_low,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.temp_avg,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.rain_total,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.snow_total,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.summary_day,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
						<TabPanel>
							<ByWeekDetail
								byWeekData={createArrays(
									byWeekData.map((yearData) =>
										yearData.data.map((x) => ({
											year: yearData.year,
											val: x.summary_night,
										}))
									)
								)}
								headers={getHeaders(byWeekData)}
							/>
						</TabPanel>
					</Tabs>
				</div>
			)}
		</Container>
	);
}

export default ByWeekScreen;
