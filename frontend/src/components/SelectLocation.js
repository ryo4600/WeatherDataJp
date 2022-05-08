import React, { useState, useEffect, useRef } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import axios from 'axios';

import Message from './Message';
import LoadingSpinner from './LoadingSpinner';
import styles from './SelectLocation.module.css';
import {
	generateErrorMsg,
	getServerUrl,
	latLonDistance,
} from '../utils/commonTools';
import LocationText from './parts/LocationText';

const distance = (place, station) => {
	return latLonDistance(
		place.latitude,
		place.longitude,
		station.latitude,
		station.longitude
	);
};

//-----------------------------------------------------------------------------
// COMPONENT SELECT LOCATION
//-----------------------------------------------------------------------------
function SelectLocation({ location, station, locationSelected }) {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState(undefined);
	const [errorMessage, setErrorMessage] = useState(undefined);
	const [nameSelection, setNameSelection] = useState(undefined);
	const [stations, setStations] = useState(undefined);
	const [selectedLocation, setSelectedLocation] = useState();

	const txtToSearch = useRef();

	//--------------------------------------
	// Get all stations
	//--------------------------------------
	const getStations = async () => {
		setIsLoading(true);
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() + `/stations`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					'観測所一覧の取得でエラーが発生しました。コード：' + status
				);
			}
			setStations(data);
		} catch (error) {
			setErrorMessage(
				'観測所一覧の取得でエラーが発生しました。' +
					generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	//--------------------------------------
	// Get location name
	//--------------------------------------
	const getLocationName = async (latitude, longitude) => {
		try {
			setSelectedLocation(null);
			setNameSelection(null);

			setLoadingMessage('名称を取得中');

			const config = {
				headers: {
					'Content-type': 'application/json',
					//Authorization: `Bearer ${token}`,
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() +
					`/placelookup?latitude=${latitude}&longitude=${longitude}`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					'場所名の取得でエラーが発生しました。コード：' + status
				);
			}
			setNameSelection(data);
		} catch (error) {
			setErrorMessage(
				'場所名の取得でエラーが発生しました。' + generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	//--------------------------------------
	// Get user's location
	//--------------------------------------
	const getLocation = () => {
		setErrorMessage('');

		if (!navigator.geolocation) {
			return setErrorMessage(
				'お使いの環境では位置情報の取得ができません'
			);
		}

		setSelectedLocation(null);
		setNameSelection(null);
		setIsLoading(true);
		setLoadingMessage('現在地を取得中');

		navigator.geolocation.getCurrentPosition((position) => {
			getLocationName(
				position.coords.latitude,
				position.coords.longitude
			);
		});
	};

	//--------------------------------------
	// find location from name
	//--------------------------------------
	const findLocation = async () => {
		setErrorMessage('');
		setIsLoading(true);
		try {
			setLoadingMessage('名称を検索中');

			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() +
					`/geolocation?address=${txtToSearch.current.value}`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					'場所名の取得でエラーが発生しました。コード：' + status
				);
			}
			setNameSelection(data);
		} catch (error) {
			setErrorMessage(
				'場所名の取得でエラーが発生しました。' + generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	//--------------------------------------
	// Make the place name shorter
	//--------------------------------------
	const trimLocationName = (name, keyword) => {
		const addresses = name.split(',');
		// obtained location name can be very long, so make it short.
		// ex. Japan, Yokohama, Kohoku-ku 2-11-4  -> Japan, Yokohama
		let trimedName = '';
		for (var address of addresses) {
			trimedName += address.trim();
			if (address.includes(keyword)) {
				break;
			}
			trimedName += ',';
		}
		return trimedName;
	};

	//--------------------------------------
	// Place is selected
	//--------------------------------------
	const onOk = () => {
		const location = selectedLocation;
		if (txtToSearch.current.value.length > 0) {
			location.name = trimLocationName(
				location.name,
				txtToSearch.current.value
			);
		}
		const station = stations.reduce((a, b) =>
			distance(location, a) < distance(location, b) ? a : b
		);
		locationSelected(location, station);
	};

	//--------------------------------------
	// Initial loading
	//--------------------------------------
	useEffect(() => {
		const f = async () => {
			if (!stations) {
				await getStations();
			}
		};
		f();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	//--------------------------------------
	// Rendering
	//--------------------------------------
	return (
		<div>
			<span>現在の設定</span>
			<LocationText
				location={location}
				station={station}
				className="ms-2"
			/>
			<div className={`${styles.inputArea} px-0 my-2`}>
				<input
					type="text"
					ref={txtToSearch}
					placeholder="地名や住所を入力してください"
					className="flex-fill px-2"
				></input>
				<Button
					variant="success"
					onClick={findLocation}
					className="ms-1"
				>
					<span>名前で検索</span>
				</Button>
				<span className="mx-1 center-text">または</span>
				<Button variant="success" onClick={getLocation}>
					<i className="fas fa-map-marker-alt" />
					<span> 現在地取得</span>
				</Button>
			</div>
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
			{nameSelection && (
				<>
					<ListGroup>
						{nameSelection.map((place, idx) => {
							return (
								<ListGroup.Item
									className="list-group-item"
									href="#"
									key={`place_${idx}`}
									onClick={() => {
										setSelectedLocation(place);
									}}
									active={selectedLocation === place}
								>
									{place.name}
								</ListGroup.Item>
							);
						})}
					</ListGroup>
					<Button
						variant="success"
						onClick={onOk}
						className="mt-2"
						disabled={!selectedLocation}
					>
						<span>決定</span>
					</Button>
				</>
			)}
		</div>
	);
}

export default SelectLocation;
