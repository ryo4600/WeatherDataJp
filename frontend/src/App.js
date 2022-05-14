//import logo from "./logo.svg";
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';

import './css/my-local.css';

import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomeScreen from './screens/HomeScreen';
import CreditScreen from './screens/CreditScreen';
import ByDayScreen from './screens/ByDayScreen';
import ByWeekScreen from './screens/ByWeekScreen';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Message from './components/Message';
import StatusContext from './store/StatusContext';

function App() {
	const { isLoading, loadingMessage, errorMessage } =
		useContext(StatusContext);

	return (
		<>
			<Header />
			<Container>
				<div className="pt-3">
					<Switch>
						<Route path="/byday" component={ByDayScreen} />
						<Route path="/byweek" component={ByWeekScreen} />
						<Route path="/credit" component={CreditScreen} />
						<Route path="/" component={HomeScreen} />
					</Switch>
				</div>
				{errorMessage && (
					<Message variant="danger">{errorMessage}</Message>
				)}
				{isLoading && (
					<LoadingSpinner
						animation="border"
						variant="primary"
						size="sm"
						message={loadingMessage}
						className="ms-3 mt-3"
					/>
				)}
			</Container>
			<Footer />
		</>
	);
}

export default App;
