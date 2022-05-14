import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import StatusContext from "../store/StatusContext";
import WeatherContext from '../store/WeatherContext'

import { generateErrorMsg, getServerUrl } from "../utils/commonTools";
import Forecast3Days from './Forecast3Days'
import Forecast7Days from './Forecast7Days'

function Forecast({ station, show3days = true, show7days = true }) {
	const { setIsLoading, setErrorMessage, setLoadingMessage } =
		useContext(StatusContext);
	const { SetWeekForecast } = useContext(WeatherContext)

	const [forecast, setForecast] = useState();

	//--------------------------------------
	// Get current weather data of the location
	//--------------------------------------
	const getForecast = async () => {
		setErrorMessage("");

		if(!station){
			return
		}
		setIsLoading(true);
		setErrorMessage('');
		setLoadingMessage("天気予報データの取得中");
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() +
					`/weather/forecast?areaName=${station.area_name}`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					"天気予報データの取得でエラーが発生しました。コード：" +
						status
				);
			}
			setForecast(data);
			SetWeekForecast(data.days7)
		} catch (error) {
			setErrorMessage(
				"天気予報データの取得でエラーが発生しました。" +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getForecast();
		return () => {
			//cleanup
		};
	}, [station]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<React.Fragment>
			{!forecast && <h5> 場所を選択してください </h5>}
			{forecast && (
				<div>
					{show3days && <Forecast3Days station={station} days3={forecast.days3} /> }
					{show7days && <Forecast7Days station={station} days7={forecast.days7} /> }
				</div>
			)}
		</React.Fragment>
	);
}

export default Forecast;
