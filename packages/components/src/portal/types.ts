import type React from "react";

export interface PortalProps {
	/**
	 * A DOM element or a function returning a DOM element that will contain the children.
	 * By default, it uses the document.body.
	 */
	container?: Element | ( () => Element | null )
	/**
	 * Set to `true` if you want to disable the portal.
	 * If so, the children will be placed under the DOM hierarchy.
	 * On the contrary, it'll be placed inside the 'container'.
	 */
	disablePortal?: boolean
	/**
	 * The children to be rendered in the 'container'.
	 */
	children: React.ReactNode
}