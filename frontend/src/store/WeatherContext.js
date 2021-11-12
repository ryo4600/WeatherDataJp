import React, { useState } from "react";

const WeatherContext = React.createContext({
	weekForecast: {},
	SetWeekForecast: (days7) => {},
});

export default WeatherContext;

///////////////////////////////////////////////////////////
// Status provider
///////////////////////////////////////////////////////////
export const WeatherContextProvider = (props) => {
	const [weekForecast, SetWeekForecast] = useState(undefined);

	const contextValue = {
		weekForecast,
		SetWeekForecast,
	};

	return (
		<WeatherContext.Provider value={contextValue}>
			{props.children}
		</WeatherContext.Provider>
	);
};
