import React, { useContext, useEffect, useState } from 'react'
import { Table } from "react-bootstrap";
import axios from "axios";

import StatusContext from "../store/StatusContext";

import { generateErrorMsg, getServerUrl } from "../utils/commonTools";


function CurrentWeather({location}) {
	const { setIsLoading, setErrorMessage, SetLoadingMessage } =
		useContext(StatusContext);

	const [weather, setWeather] = useState();

	//--------------------------------------
	// Get current weather data of the location
	//--------------------------------------
	const getWeather = async () => {
		setIsLoading(true);
		SetLoadingMessage("現在の天気情報の取得中");
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() +
					`/weather/current?latitude=${location.latitude}&longitude=${location.longitude}`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					"現在の天気情報の取得でエラーが発生しました。コード：" + status
				);
			}
			setWeather(data);
		} catch (error) {
			setErrorMessage(
				"現在の天気情報の取得でエラーが発生しました。" +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getWeather();
		return () => {
			//cleanup
		};
	}, [location]); // eslint-disable-line react-hooks/exhaustive-deps

	const toLocalTime = (timeUtc) => {
		// 9:02 AM => 9:02, AM
		const timeAndAmPm = timeUtc.split(" ");
		const time = timeAndAmPm[0].split(":");
		if (timeAndAmPm[1].toUpperCase() === "PM" && time[0] !== 12) {
			time[0] = +time[0] + 12;
		}
		else if (timeAndAmPm[1].toUpperCase() === "AM" && time[0] === 12) {
			time[0] = +time[0] - 12;
		}
		console.log("time", timeUtc, time[0])
		const offset = new Date().getTimezoneOffset() / 60;
		var hour = time[0] - offset;
		if (hour >= 24) hour -= 24;
		else if (hour < 0) hour += 24;

		return `${hour}:${time[1]}`;
		//return new Date(dateUtc.getTime() - offset)
	};

	return (
		<React.Fragment>
						{!weather && <h5> 場所を選択してください </h5>}
			{weather && (
				<div>
					<h5>{`${toLocalTime(weather.observation_time)} の "${
						location.name
					}" の天気`}</h5>
					<Table responsive bordered className="weatherData">
						<thead>
							<tr>
								{/* <th>天気</th> */}
								<th>気温(℃)</th>
								<th>湿度(%)</th>
								<th>体感気温(℃)</th>
								<th>風速 (km/h)</th>
								<th>風向</th>
								<th>気圧</th>
								<th>降水量</th>
								<th>雲量</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								{/* <td>
									{weather.weather_icons.map((icon, idx) => {
										return (
											<img
												src={icon}
												width="35"
												key={`img_${idx}`}
												className="px-0 py-0"
												alt={weather.weather_descriptions[idx]}
											/>
										);
									})}
								</td> */}
								<td>{weather.temperature}</td>
								<td>{weather.humidity}</td>
								<td>{weather.feelslike}</td>
								<td>{weather.wind_speed}</td>
								<td>{weather.wind_dir}</td>
								<td>{weather.pressure}</td>
								<td>{weather.precip}</td>
								<td>{weather.cloudcover} %</td>
							</tr>
						</tbody>
					</Table>
				</div>
			)}
		</React.Fragment>
	)
}

export default CurrentWeather
