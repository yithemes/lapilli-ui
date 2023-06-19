import React from "react";
import ReactDOM from "react-dom";
import type { PortalProps } from "./types";

const getContainer = ( container: PortalProps['container'] ) => {
	const theContainer = typeof container === 'function' ? container() : container;

	return theContainer || document.body;
}

/**
 * The Portal component allows you to render children into a DOM node that exists outside the Portal's DOM hierarchy.
 */
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