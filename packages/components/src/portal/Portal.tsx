import React from "react";
import ReactDOM from "react-dom";
import type { PortalProps } from "./types";
import { useDocument } from "../document-provider";

const getContainer = ( container: PortalProps['container'], defaultNode?: Element ) => {
	const theContainer = typeof container === 'function' ? container() : container;

	return theContainer || defaultNode;
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
	const document = useDocument();
	const renderContainer = getContainer( container, document?.body );

	if ( disablePortal || !renderContainer ) {
		return <>{ children }</>
	}

	return ReactDOM.createPortal( children, renderContainer );
}