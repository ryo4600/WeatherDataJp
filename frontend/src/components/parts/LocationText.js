import React from 'react';

function LocationText(props) {
	const {location, station} = props;

	return (
		<span className={props.className}>
			{location && (
				<span className="me-3 align-middle">{`場所：${location.name} `}</span>
			)}
			{station && (
				<span className="align-middle">{`最寄観測所：${station.name}`}</span>
			)}
		</span>
	);
}

export default LocationText;
