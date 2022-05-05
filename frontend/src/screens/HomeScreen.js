import React from "react";
import { Container } from "react-bootstrap";

import configData from "../config.json";
// import Forecast from "../components/Forecast";
import NormalDays from '../components/NormalDays'

//-----------------------------------------------------------------------------
// SCREEN: Home
//-----------------------------------------------------------------------------
function HomeScreen() {
	document.title = `${configData.TITLE}（ホーム)`;

	return (
		<Container>
			{/* <Forecast station={station} /> */}
			<NormalDays />
		</Container>
	);
}

export default HomeScreen;
