import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import StatusContext from '../store/StatusContext';
import axios from 'axios';

import {
	getServerUrl,
	generateErrorMsg,
	calcAverage,
	findMax,
	findMin,
} from '../utils/commonTools';
import styles from './NormalDay.module.css'

function NormalDay({ station, date, years }) {
	const { setIsLoading, SetLoadingMessage, setErrorMessage } =
		useContext(StatusContext);

	//const [byDayData, setByDayData] = useState(undefined);
	const [avgTemp, setAvgTemp] = useState(0);
	const [highest, setHighest] = useState();
	const [highestYear, setHighestYear] = useState();
	const [lowest, setLowest] = useState();
	const [lowestYear, setLowestYear] = useState();
	const [numRain, setNumRain] = useState();
	const [numSnow, setNumSnow] = useState();

	const execGetData = async (dt, yrs) => {
		if (!station) {
			return;
		}
		try {
			setIsLoading(true);
			SetLoadingMessage(`${dt}のデータ取得中`);
			const { data } = await axios.get(
				`${getServerUrl()}/weather/byday/${station.code}` +
					`?year=${date.getFullYear()}&month=${date.getMonth() + 1}` +
					`&day=${date.getDate()}&years=${yrs}`
			);

			// Update display values
			setAvgTemp(calcAverage(data.map((val) => val.temp_avg)));
			const [highest, idxHigh] = findMax(data.map(val => val.temp_high))
			setHighest(highest);
			setHighestYear(data.at(idxHigh).year)
			const [lowest, idexLow] = findMin(data.map((val) => val.temp_low));
			setLowest(lowest);
			setLowestYear(data.at(idexLow).year);
			setNumRain(data.filter(val => val.rain_total >= 0).length)
			setNumSnow(data.filter((val) => val.snow_total >= 0).length);

		} catch (error) {
			setErrorMessage(
				'過去のデータ取得でエラーが発生しました。' +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const f = async () => {
			execGetData(date, years);
		};
		f();
	}, [date, years, station]); // eslint-disable-line react-hooks/exhaustive-deps

	//--------------------------------------
	// Rendering
	//--------------------------------------
	return (
		<Card className={`my-1 p-2 rounded`}>
			<div className="mb-2">
				<span className="h3">{station.name}</span>
				<span className="mx-2">
					の{date.getMonth() + 1}月 {date.getDate()}日の過去{years}
					年は...
				</span>
			</div>
			<span>
				平均気温は{' '}
				<span className={`h3 ${styles.dataText}`}>
					{avgTemp.toFixed(1)}
				</span>{' '}
				℃でした。
			</span>
			<span>
				最も気温が高たったのは
				<span className={`h3 ${styles.dataText}`}>{highestYear}</span>
				年の
				<span className={`h3 ${styles.dataText}`}>{highest}</span>
				℃でした。
			</span>
			<span>
				最も気温が低かったのは
				<span className={`h3 ${styles.dataText}`}>{lowestYear}</span>
				年の
				<span className={`h3 ${styles.dataText}`}>{lowest}</span>
				℃でした。
			</span>
			<span>
				雨が観測された日は
				<span className={`h3 ${styles.dataText}`}>{numRain}</span>
				日ありました。
			</span>
			<span>
				雪が観測された日は
				<span className={`h3 ${styles.dataText}`}>{numSnow}</span>
				日ありました。
			</span>
		</Card>
	);
}

export default NormalDay;
