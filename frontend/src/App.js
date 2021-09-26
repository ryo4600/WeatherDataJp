//import logo from "./logo.svg";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import "./App.css";

import React, { useContext } from "react";
import "./css/my-local.css";

import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Message from "./components/Message";

import StatusContext from "./store/StatusContext";

import HomeScreen from "./screens/HomeScreen";
import CreditScreen from "./screens/CreditScreen";
import ByDayScreen from "./screens/ByDayScreen";
import ByWeekScreen from "./screens/ByWeekScreen";
import SelectLocation from "./components/SelectLocation";

function App() {
	const { isLoading, loadingMessage, errorMessage } =
		useContext(StatusContext);

	return (
		<React.Fragment>
			<Header />
			<SelectLocation />

			{isLoading && (
				<LoadingSpinner
					animation="border"
					variant="primary"
					size="sm"
					message={loadingMessage}
					className="mx-3"
				/>
			)}
			{errorMessage && <Message variant="danger">{errorMessage}</Message>}

			<Container className="container">
				<Switch>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/byday" component={ByDayScreen} />
					<Route path="/byweek" component={ByWeekScreen} />
					<Route path="/credit" component={CreditScreen} />
				</Switch>
			</Container>
			<Footer />
		</React.Fragment>
	);
}

export default App;
