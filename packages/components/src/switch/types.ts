import type React from "react";
import type { FieldSize, PaletteClass, SxProps } from "@lapilli-ui/styles";

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
	/**
	 * Set to `true` to disable the field padding
	 */
	noPadding?: boolean
	/**
	 * The default checked status. Useful when the component is not controlled.
	 */
	defaultChecked?: boolean
	/**
	 * Sx theme props.
	 */
	sx?: SxProps
}

type SwitchPropsWithRef = Omit<React.ComponentProps<'input'>, keyof SwitchOwnProps> & SwitchOwnProps
export type SwitchProps = Omit<SwitchPropsWithRef, 'ref'>

export type SwitchOwnerState = Required<Pick<SwitchOwnProps, 'checked' | 'color' | 'disabled' | 'size' | 'noPadding'>> & {
	/**
	 * True if the field is focused.
	 */
	isFocused: boolean
}

export type SwitchStyled = {
	ownerState: SwitchOwnerState
}