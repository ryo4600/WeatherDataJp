import React from "react";
import { Spinner } from "react-bootstrap";

//-----------------------------------------------------------------------------
// COMPONENT: LOADING SPINNER
//-----------------------------------------------------------------------------
function LoadingSpinner(props) {
	return (
		<div {...props}>
			<Spinner variant={props.variant} animation={props.animation} size={props.size}>
				<span className="visually-hidden"> Loading ... </span>
			</Spinner>
			<span> {props.message}</span>
		</div>
	);
}

export default LoadingSpinner;
