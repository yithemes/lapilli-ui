import type React from "react";
import type { PopoverProps } from "../popover";

export type DropdownProps = {
	/**
	 * Callback triggered when the dropdown is opened.
	 */
	onOpen?: () => void
	/**
	 * Callback triggered when the dropdown is closed.
	 */
	onClose?: () => void
	/**
	 * Callback triggered to render the toggle element.
	 */
	renderToggle: ( args: DropdownCallbackArgs ) => React.ReactElement
	/**
	 * Callback triggered to render the content.
	 */
	renderContent: ( args: DropdownCallbackArgs ) => React.ReactElement
	/**
	 * Props to be passed to the Popover component.
	 */
	popoverProps?: PopoverProps
	/**
	 * If `true`, hitting the escape key will not close the dropdown.
	 */
	disableEscapeKeyDown?: boolean
};

export type DropdownCallbackArgs = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onOpen: () => void;
	ref: React.Ref<HTMLElement>;
};