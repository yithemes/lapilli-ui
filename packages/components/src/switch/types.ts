import type React from "react";
import type { FieldSize, PaletteClass } from "@yith/styles";

export type SwitchOwnerState = {
	/**
	 * Set the checked status of the Switch component. Leave it empty to use a non-controlled component.
	 */
	checked: boolean
	/**
	 * If `true`, the component is disabled.
	 */
	disabled: boolean
	/**
	 * The color.
	 */
	color: PaletteClass
	/**
	 * The field size.
	 */
	size: FieldSize
	/**
	 * True if the field is focused.
	 */
	isFocused: boolean
}

type SwitchAdditionalProps = {
	/**
	 * Choose if the field containing the value should be
	 */
	type?: 'checkbox' | 'hidden'
	/**
	 * Callback fired when the value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: boolean ) => void
}

type SwitchPropsWithRef = Omit<React.ComponentProps<'input'>, keyof SwitchOwnerState | keyof SwitchAdditionalProps> & Omit<SwitchOwnerState, 'isFocused'> & SwitchAdditionalProps
export type SwitchProps = Omit<SwitchPropsWithRef, 'ref'>

export type SwitchStyled = {
	ownerState: SwitchOwnerState
}