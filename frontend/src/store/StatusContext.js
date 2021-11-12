import React, { useState } from "react";

const StatusContext = React.createContext({
	loadingMessage: "",
	SetLoadingMessage: (message) => {},
	errorMessage: "",
	setErrorMessage: (message) => {},
});

export default StatusContext;

///////////////////////////////////////////////////////////
// Status provider
///////////////////////////////////////////////////////////
export const StatusContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, SetLoadingMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const contextValue = {
		isLoading,
		setIsLoading,
		loadingMessage,
		SetLoadingMessage,
		errorMessage,
		setErrorMessage,
	};

	return (
		<StatusContext.Provider value={contextValue}>
			{props.children}
		</StatusContext.Provider>
	);
};
