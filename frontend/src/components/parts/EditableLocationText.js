import React, { useContext } from 'react';
import LocationText from './LocationText';
import { Button } from 'react-bootstrap';

import SelectLocation from '../SelectLocation'
import LocationContext from '../../store/LocationContext';
import Modal from 'react-modal';

function EditableLocationText() {
	const { isSelecting, setIsSelecting, location, station, setLocation, setStation } =
		useContext(LocationContext);

	Modal.setAppElement('#root');
	const modalStyle = {
		overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			backgroundColor: 'rgba(0,0,0,0.5)',
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

	const locationSelected = (place, station) => {
		setLocation(place);
		setStation(station);
		setIsSelecting(false);
	}

	return (
		<div>
			{!location ? (
				<span className="me-3 align-middle">
					場所を設定してください
				</span>
			) : (
				<LocationText location={location} station={station} />
			)}
			<Button
				type="button"
				className="ms-3 btn btn-outline-primary"
				variant="transparent"
				onClick={() => setIsSelecting(true)}
			>
				<i className="fas fa-cog me-1"></i>
				<span>場所を設定</span>
			</Button>
			<Modal
				isOpen={isSelecting}
				style={modalStyle}
				onRequestClose={() => setIsSelecting(false)}
			>
				<SelectLocation location={location} station={station} locationSelected={locationSelected} />
			</Modal>
		</div>
	);
}

export default EditableLocationText;
