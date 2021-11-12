import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { LocationContextProvider } from "./store/LocationContext";
import { WeatherContextProvider } from "./store/WeatherContext";
import { StatusContextProvider } from "./store/StatusContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<LocationContextProvider>
		<WeatherContextProvider>
			<StatusContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</StatusContextProvider>
		</WeatherContextProvider>
	</LocationContextProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
