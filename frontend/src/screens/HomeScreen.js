import React, {useContext} from "react";
import { Container } from "react-bootstrap";

import configData from "../config.json";
import Forecast from "../components/Forecast";
import LocationContext from "../store/LocationContext";

//-----------------------------------------------------------------------------
// SCREEN: Home
//-----------------------------------------------------------------------------
function HomeScreen() {
	const { station } = useContext(LocationContext);

	document.title = `${configData.TITLE}（ホーム)`;

	return (
		<Container>
			<Forecast station={station} />
		</Container>
	);
}

export default HomeScreen;
