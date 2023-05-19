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
	/**
	 * If `true`, disable the restore focus behavior after closing the dropdown.
	 */
	disableRestoreFocus?: boolean
	/**
	 * If `true`, the focus trap will not automatically shift focus to its first focusable element.
	 */
	disableAutoFocus?: boolean;
	/**
	 * If `true`, the focus trap will not prevent focus from leaving the dropdown content while open.
	 */
	disableConstrainedFocus?: boolean;
};

export type DropdownCallbackArgs = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	open: () => void;
	ref: React.Ref<HTMLElement>;
};