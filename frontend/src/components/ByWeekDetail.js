import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";

function ByWeekDetail({byWeekData, headers}) {

	const cellFormetter = (cell, row, rowIndex, formatExtraData) => {
		if( typeof(cell) === 'number'){
			return cell >= 0 ? cell : "-"
		}
		return cell
	}

	const columns = [
		{
			dataField: "year",
			text: "年",
			sort: true,
		},
		{
			dataField: "day1",
			text: headers[0],
			formatter: cellFormetter,
		},
		{
			dataField: "day2",
			text: headers[1],
			formatter: cellFormetter,
		},
		{
			dataField: "day3",
			text: headers[2],
			formatter: cellFormetter,
		},
		{
			dataField: "day4",
			text: headers[3],
			formatter: cellFormetter,
		},
		{
			dataField: "day5",
			text: headers[4],
			formatter: cellFormetter,
		},
		{
			dataField: "day6",
			text: headers[5],
			formatter: cellFormetter,
		},
		{
			dataField: "day7",
			text: headers[6],
			formatter: cellFormetter,
		},
	];

	return (
		<BootstrapTable parentClassName="table-responsive"
			keyField="year"
			data={byWeekData}
			columns={columns}
			striped
			bordered
			hover
			rowClasses='summaryRow'
			headerClasses='summaryHeader'
		></BootstrapTable>
	)
}

export default ByWeekDetail
