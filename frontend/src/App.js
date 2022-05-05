//import logo from "./logo.svg";
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';

import './css/my-local.css';

import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Modal from 'react-modal';

import HomeScreen from './screens/HomeScreen';
import CreditScreen from './screens/CreditScreen';
import ByDayScreen from './screens/ByDayScreen';
import ByWeekScreen from './screens/ByWeekScreen';

import Header from './components/Header';
import Footer from './components/Footer';
import SelectLocation from './components/SelectLocation';
import LoadingSpinner from './components/LoadingSpinner';
import Message from './components/Message';

import LocationContext from './store/LocationContext';
import StatusContext from './store/StatusContext';

Modal.setAppElement('#root');
const modalStyle = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.85)',
	},
	content: {
		position: 'absolute',
		top: '5rem',
		left: '5rem',
		right: '5rem',
		bottom: '5rem',
		backgroundColor: 'rgba(250, 250, 250, 200',
		borderRadius: '1rem',
		padding: '1.5rem',
	},
};
function App() {
	const { isSelecting, setIsSelecting, location, station } = useContext(LocationContext);
	const { isLoading, loadingMessage, errorMessage } =
		useContext(StatusContext);

	return (
		<>
			<Header />
			<Container>
				{!location && <h6> 場所を選択してください</h6>}
				{location && (
					<div className="mx-3 mt-2">
						{location && (
							<span className="mx-3 h5 align-middle">{`場所：${location.name}, `}</span>
						)}
						{station && (
							<span className="h5 align-middle">{`最寄観測所：${station.name}`}</span>
						)}
						<Button
							type="button"
							className="ms-2"
							variant="light"
							onClick={() => setIsSelecting(true)}
						>
							<i className="fas fa-edit"></i>
						</Button>
					</div>
				)}
				<div className="pt-3">
					<Switch>
						<Route path="/byday" component={ByDayScreen} />
						<Route path="/byweek" component={ByWeekScreen} />
						<Route path="/credit" component={CreditScreen} />
						<Route path="/" component={HomeScreen} />
					</Switch>
				</div>
			</Container>
			<Modal
				isOpen={isSelecting}
				style={modalStyle}
				onRequestClose={() => setIsSelecting(false)}
			>
				<SelectLocation />
			</Modal>
			{errorMessage && <Message variant="danger">{errorMessage}</Message>}
			{isLoading && (
				<LoadingSpinner
					animation="border"
					variant="primary"
					size="sm"
					message={loadingMessage}
					className="mx-3"
				/>
			)}
			<Footer />
		</>
	);
}

export default App;
