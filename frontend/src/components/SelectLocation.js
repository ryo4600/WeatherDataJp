import React, { useState, useContext, useEffect } from "react";
import {
	ButtonGroup,
	Row,
	ToggleButton,
	Button,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";

import axios from "axios";

import StatusContext from "../store/StatusContext";
import styles from "./SelectLocation.module.css";
import { generateErrorMsg, getServerUrl, groupBy } from "../utils/commonTools";

//-----------------------------------------------------------------------------
// COMPONENT SELECT LOCATION
//-----------------------------------------------------------------------------
function SelectLocation() {
	const {
		location,
		//setLocation,
		setIsLoading,
		SetLoadingMessage,
		setErrorMessage,
	} = useContext(StatusContext);

	const radios = [
		{ name: "自動", value: "1" },
		{ name: "名前から", value: "2" },
		{ name: "観測地点を選ぶ", value: "3" },
	];

	const [radioSelection, setRadioSelection] = useState(radios[0].value);
	const [nameSelection, setNameSelection] = useState(undefined);

	const [stations, setStations] = useState(undefined);

	//--------------------------------------
	// Get all stations
	//--------------------------------------
	const getStations = async () => {
		console.log("get station started");
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

	useEffect(() => {
		const f = async () => {
			if (!stations) {
				await getStations();
			}
		};
		f();
	}, []);

	//--------------------------------------
	// Rendering
	//--------------------------------------
	return (
		<React.Fragment>
			<h5 className="mx-3 mt-3">場所の選択</h5>
			<div className={styles.root}>
				<ButtonGroup>
					{radios.map((radio, idx) => (
						<ToggleButton
							className="mx-1"
							key={idx}
							id={`radio-${idx}`}
							type="radio"
							name="location"
							variant="outline-primary"
							value={radio.value}
							checked={radioSelection === radio.value}
							onChange={(e) =>
								setRadioSelection(e.currentTarget.value)
							}
						>
							{radio.name}
						</ToggleButton>
					))}
				</ButtonGroup>

				{radioSelection === radios[0].value && (
					<React.Fragment>
						<Button
							variant="success"
							onClick={getLocation}
							className="mx-3"
						>
							<i className="fas fa-map-marker-alt" />
							<span> 現在地取得</span>
						</Button>
						{nameSelection && (
							<DropdownButton
								variant="outline-success"
								id="dropdown-basic"
								title="地点候補"
							>
								{nameSelection.map((place) => {
									return (
										<Dropdown.Item
											href="#"
											key={place.place_name}
										>
											{place.place_name}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>
						)}
					</React.Fragment>
				)}
				{radioSelection === radios[1].value && <label>station</label>}
				{radioSelection === radios[2].value && (
					<DropdownButton
						variant="success"
						id="dropdown-basic"
						title="観測所"
					>
						{stations.map((station) => {
							return (<Dropdown.Item
								href="#"
								key={`area_${station.code}`}
							>
								{station.name}
							</Dropdown.Item>)
						})}
					</DropdownButton>
				)}
			</div>
			<div>
				{location && (
					<Row>
						<h5>
							地点候補：<Dropdown></Dropdown>{" "}
						</h5>
					</Row>
				)}
			</div>
		</React.Fragment>
	);
}

export default SelectLocation;
