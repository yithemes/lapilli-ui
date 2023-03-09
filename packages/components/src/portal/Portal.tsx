import React from "react";
import ReactDOM from "react-dom";
import type { PortalProps } from "./types";

const getContainer = ( container: PortalProps['container'] ) => {
	const theContainer = typeof container === 'function' ? container() : container;

	return theContainer || document.body;
}

export default function Portal(
	{
		disablePortal = false,
		container,
		children
	}: PortalProps ) {
	const renderContainer = getContainer( container );

	if ( disablePortal ) {
		return <>{ children }</>
	}

	return ReactDOM.createPortal( children, renderContainer );
}