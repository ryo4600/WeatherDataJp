import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

function ByDayDetail({byDayData}) {
	const columns = [
		{
			dataField: "year",
			text: "年",
			sort: true,
		},
		{
			dataField: "month",
			text: "月",
		},
		{
			dataField: "day",
			text: "日",
			sort: true,
		},
		{
			dataField: "temp_high",
			text: "最高気温",
			sort: true,
		},
		{
			dataField: "temp_low",
			text: "最低気温",
			sort: true,
		},
		{
			dataField: "temp_avg",
			text: "平均気温",
			sort: true,
		},
		{
			dataField: "rain_total",
			text: "降水量",
			sort: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return cell >= 0 ? cell : "-"
			}
		},
		{
			dataField: "snow_total",
			text: "降雪量",
			sort: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return cell >= 0 ? cell : "-"
			}
		},
		{
			dataField: "summary_day",
			text: "昼間",
			sort: true,
		},
		{
			dataField: "summary_night",
			text: "夜間",
			sort: true,
		},
	]

	return (
		<BootstrapTable
			parentClassName="table-responsive"
			keyField="year"
			data={byDayData}
			columns={columns}
			striped
			bordered
			hover
			rowClasses='summaryRow'
			headerClasses='summaryHeader'
		></BootstrapTable>
	);
}

export default ByDayDetail;
