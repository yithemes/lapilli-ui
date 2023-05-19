import type React from "react";

export type FocusTrapProps = {
	/**
	 * The open status of the focus trap.
	 */
	open: boolean
	/**
	 * The children of the focus trap.
	 */
	children: React.ReactElement
	/**
	 * If `true`, the focus trap will not automatically shift focus to its first tappable element.
	 */
	disableAutoFocus?: boolean;
	/**
	 * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
	 */
	disableConstrainedFocus?: boolean;
	/**
	 * If `true`, the focus trap will not restore focus to previously focused element when it's closed.
	 */
	disableRestoreFocus?: boolean;
}
