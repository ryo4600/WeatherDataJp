import React from "react";
import { Table } from "react-bootstrap";

function Forecast7Days({ station, days7 }) {
	return (
		<div>
			<h5>{station.area_name}の週間天気予報</h5>
			<Table responsive bordered className="forecastTable days7">
				<thead>
					<tr>
						<th>地点</th>
						<th>項目</th>
						{days7[0].days.map((dayData) => {
							return (
								<th key={`day_${dayData.month}_${dayData.day}`}>
									{`${dayData.month}/${dayData.day}`}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{days7.map((areaData, idx) => {
						return (
							<React.Fragment key={`area_${idx}`}>
								<tr>
									<td rowSpan="3" className="categoryTitle"> {areaData.name} </td>
									<td className="categoryTitle">気温</td>
									{areaData.days.map((dayData) => {
										return <td key={`temp_${dayData.day}`}> {dayData.tempsMax ? `${dayData.tempsMax} / ${dayData.tempsMin}` : ``}</td>
									})}
								</tr>
								<tr>
									<td className="categoryTitle">降水確率</td>
									{areaData.days.map((dayData) => {
										return <td key={`rain_${dayData.day}`}>{dayData.rain ? `${dayData.rain} %` : ''}</td>
									})}
								</tr>
								<tr>
									<td  className="categoryTitle">確度</td>
									{areaData.days.map((dayData) => {
										return <td key={`reliability_${dayData.day}`}>{dayData.reliability ? dayData.reliability : ''}</td>
									})}
								</tr>

							</React.Fragment>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default Forecast7Days;
