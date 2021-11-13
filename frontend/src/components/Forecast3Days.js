import React from "react";
import { Table } from "react-bootstrap";

function Forecast3Days({ station, days3 }) {
	return (
		<div>
			<h5>{station.area_name}の天気予報</h5>
			{days3.map((area, index) => {
				return (
					<Table key={area.name + index} responsive bordered className="forecastTable">
						<thead>
							<tr className="forecastHeader">
								<th className="forecastTitleCol">地点</th>
								<th className="forecastTitleCol">項目</th>
								{days3[0].days.map((dayData) => {
									return (
										<th key={`day_${dayData.month}_${dayData.day}`}	className="days3">
											{`${dayData.month}/${dayData.day}`}{" "}
										</th>);
								})}
							</tr>
						</thead>
						<tbody>
							<React.Fragment key={area.name}>
								<tr>
									<td rowSpan="4" className="categoryTitle">
										{area.name}
									</td>
									<td className="categoryTitle">天気</td>
									{area.days.map((dayData) => (
										<td	key={`weather_${area.code}_${dayData.day}`}>
											{dayData.weather}
										</td>
									))}
								</tr>
								<tr>
									<td className="categoryTitle">風向</td>
									{area.days.map((dayData) => (
										<td	key={`wind_${area.code}_${dayData.day}`}>
											{dayData.winds}
										</td>
									))}
								</tr>
								<tr>
									<td className="categoryTitle">降水確率</td>
									{area.days.map((dayData) => (
										<td	key={`rains_${dayData.month}_${dayData.day}`}>
											<Table borderless>
												<tbody>
													<tr>
														<td>0～</td>
														<td>6～</td>
														<td>12～</td>
														<td>18～</td>
													</tr>
													<tr>
														{dayData.rains.map(
															(rain) => {
																return (
																	<td	key={`rains_${dayData.month}_${dayData.day}_${rain.hour}`}>
																		{rain.rain ? `${rain.rain} %` : "-"}
																	</td>
																);
															}
														)}
													</tr>
												</tbody>
											</Table>
										</td>
									))}
								</tr>
								<tr>
									<td className="categoryTitle">気温</td>
									{area.days.map((dayData) => (
										<td key={`temp_${dayData.month}_${dayData.day}`}>
											<Table borderless>
												<tbody>
													<tr>
														<td>日中の最高</td>
														<td>朝の最低</td>
													</tr>
													<tr>
														{dayData.temperatures.map(
															(temperature) => {
																return (
																	<td	key={`temps_${dayData.month}_${dayData.day}_${temperature.hour}`}>
																		{temperature.temperature ? `${temperature.temperature}℃` : "-"}
																	</td>
																);
															}
														)}
													</tr>
												</tbody>
											</Table>
										</td>
									))}
								</tr>
							</React.Fragment>
						</tbody>
					</Table>
				);
			})}
		</div>
	);
}

export default Forecast3Days;
