import type React from "react";
import type { Breakpoint } from "@maya-ui/styles";

type ModalOwnProps = {
	/**
	 * Set `true` to show the modal.
	 */
	open?: boolean
	/**
	 * Set `true` to disable showing the modal through a portal.
	 */
	disablePortal?: boolean
	/**
	 * The max-width of the modal container.
	 */
	maxWidth?: false | Breakpoint | React.CSSProperties['maxWidth'];
	/**
	 * If `true` set the width to the maxWidth.
	 */
	fullWidth?: boolean;
	/**
	 * Callback fired when the component requests to be closed.
	 */
	onClose?: ( event: KeyboardEvent | React.MouseEvent, reason: 'backdropClick' | 'escapeKeyDown' | 'closeIconClick' ) => void
	/**
	 * If `true`, the modal will not automatically shift focus to its first focusable element.
	 */
	disableAutoFocus?: boolean;
	/**
	 * If `true`, the modal will not prevent focus from leaving the modal while open.
	 */
	disableConstrainedFocus?: boolean;
	/**
	 * If `true`, the modal will not restore focus to previously focused element when it's closed.
	 */
	disableRestoreFocus?: boolean;
}

type ModalPropsWithRef = Omit<React.ComponentProps<'div'>, keyof ModalOwnProps> & ModalOwnProps
export type ModalProps = Omit<ModalPropsWithRef, 'ref'>

export type ModalOwnerState = Required<Pick<ModalOwnProps, 'maxWidth' | 'fullWidth'>>

export type ModalStyled = {
	ownerState: ModalOwnerState
}

export type ModalContentProps = Omit<React.ComponentProps<'div'>, 'ref'>
export type ModalActionsProps = Omit<React.ComponentProps<'div'>, 'ref'>