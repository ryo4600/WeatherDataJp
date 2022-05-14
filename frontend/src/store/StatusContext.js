import React, { useState } from "react";

const StatusContext = React.createContext({
	loadingMessage: "",
	setLoadingMessage: (message) => {},
	errorMessage: "",
	setErrorMessage: (message) => {},
});

export default StatusContext;

///////////////////////////////////////////////////////////
// Status provider
///////////////////////////////////////////////////////////
export const StatusContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const contextValue = {
		isLoading,
		setIsLoading,
		loadingMessage,
		setLoadingMessage,
		errorMessage,
		setErrorMessage,
	};

	return (
		<StatusContext.Provider value={contextValue}>
			{props.children}
		</StatusContext.Provider>
	);
};
