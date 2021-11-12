import React, { useState, useContext, useEffect, useRef } from "react";
import { Accordion, Button, Dropdown, DropdownButton } from "react-bootstrap";

import axios from "axios";

import StatusContext from "../store/StatusContext";
import LocationContext from "../store/LocationContext";

import styles from "./SelectLocation.module.css";
import {
	generateErrorMsg,
	getServerUrl,
	latLonDistance,
} from "../utils/commonTools";

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
function SelectLocation() {
	const { location, setLocation, station, setStation } =
		useContext(LocationContext);

	const { setIsLoading, SetLoadingMessage, setErrorMessage } =
		useContext(StatusContext);

	const [nameSelection, setNameSelection] = useState(undefined);
	const [stations, setStations] = useState(undefined);
	const txtSearch = useRef();

	//--------------------------------------
	// Get all stations
	//--------------------------------------
	const getStations = async () => {
		setIsLoading(true);
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() + `/stations`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					"観測所一覧の取得でエラーが発生しました。コード：" + status
				);
			}
			setStations(data);
		} catch (error) {
			setErrorMessage(
				"観測所一覧の取得でエラーが発生しました。" +
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
			SetLoadingMessage("名称を取得中");

			const config = {
				headers: {
					"Content-type": "application/json",
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
					"場所名の取得でエラーが発生しました。コード：" + status
				);
			}
			setNameSelection(data);
		} catch (error) {
			setErrorMessage(
				"場所名の取得でエラーが発生しました。" + generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	//--------------------------------------
	// Get user's location
	//--------------------------------------
	const getLocation = () => {
		setErrorMessage("");

		if (!navigator.geolocation) {
			return setErrorMessage(
				"お使いの環境では位置情報の取得ができません"
			);
		}

		setIsLoading(true);
		SetLoadingMessage("現在地を取得中");

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
		setErrorMessage("");
		setIsLoading(true);
		try {
			SetLoadingMessage("名称を検索中");

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data, status } = await axios.get(
				getServerUrl() +
					`/geolocation?address=${txtSearch.current.value}`,
				config
			);

			if (status !== 200) {
				return setErrorMessage(
					"場所名の取得でエラーが発生しました。コード：" + status
				);
			}
			setNameSelection(data);
		} catch (error) {
			setErrorMessage(
				"場所名の取得でエラーが発生しました。" + generateErrorMsg(error)
			);
		} finally {
			setIsLoading(false);
		}
	};

	//--------------------------------------
	// Place is selected
	//--------------------------------------
	const onLocationSelected = (place) => {
		setLocation(place);

		const closest = stations.reduce((a, b) =>
			distance(place, a) < distance(place, b) ? a : b
		);
		setStation(closest);
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
		<Accordion defaultActiveKey="0">
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					{!location && <h6> 場所を選択してください</h6>}
					{location && 
					<h6 className="mx-3 mt-2">
						{location && (
							<span className="mx-3">{`場所：${location.name}, `}</span>
						)}
						{station && (
							<span>{`最寄観測所：${station.name}`}</span>
						)}
					</h6>
					}
				</Accordion.Header>
				<Accordion.Body>
					<React.Fragment>
						<div className={`${styles.inputArea} mt-0`}>
							<input
								type="text"
								ref={txtSearch}
								placeholder="地名や住所を入力してください"
								className="mb-2"
							></input>
							<Button
								variant="success"
								onClick={findLocation}
								className="mx-1 mb-2"
							>
								<span>名前で検索</span>
							</Button>
							<Button
								variant="success"
								onClick={getLocation}
								className="mx-3 mb-2"
							>
								<i className="fas fa-map-marker-alt" />
								<span> 現在地取得</span>
							</Button>
							{nameSelection && (
								<DropdownButton
									variant="outline-success"
									id="dropdown-basic"
									title={`地点候補：${nameSelection.length} 件`}
									className="mb-2 mx-3"
								>
									{nameSelection.map((place, idx) => {
										return (
											<Dropdown.Item
												href="#"
												key={`place_${idx}`}
												onClick={() => {
													onLocationSelected(place);
												}}
											>
												{place.name}
											</Dropdown.Item>
										);
									})}
								</DropdownButton>
							)}
						</div>
					</React.Fragment>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default SelectLocation;
