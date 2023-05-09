import type React from "react";
import type { FieldSize, PaletteClass } from "@yith/styles";

type SwitchOwnProps = {
	/**
	 * Set the checked status of the Switch component. Leave it empty to use a non-controlled component.
	 */
	checked?: boolean
	/**
	 * If `true`, the component is disabled.
	 */
	disabled?: boolean
	/**
	 * The color.
	 */
	color?: PaletteClass
	/**
	 * The field size.
	 */
	size?: FieldSize
	/**
	 * Choose if the field containing the value should be
	 */
	type?: 'checkbox' | 'hidden'
	/**
	 * Callback fired when the value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: boolean ) => void
}

type SwitchPropsWithRef = Omit<React.ComponentProps<'input'>, keyof SwitchOwnProps> & SwitchOwnProps
export type SwitchProps = Omit<SwitchPropsWithRef, 'ref'>

export type SwitchOwnerState = Required<Pick<SwitchOwnProps, 'checked' | 'color' | 'disabled' | 'size'>> & {
	/**
	 * True if the field is focused.
	 */
	isFocused: boolean
}

export type SwitchStyled = {
	ownerState: SwitchOwnerState
}