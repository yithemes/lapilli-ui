import type React from "react";
import type { FieldSize, PaletteClass, SxProps } from "@yith/styles";

type CheckboxOwnProps = {
	/**
	 * Set the checked status of the Checkbox component. Leave it empty to use a non-controlled component.
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
	 * Callback fired when the value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: boolean ) => void
	/**
	 * The icon
	 */
	icon?: React.ReactNode
	/**
	 * The icon
	 */
	checkedIcon?: React.ReactNode
	/**
	 * Set to `true` to disable the field padding
	 */
	noPadding?: boolean
	/**
	 * Sx theme props.
	 */
	sx?: SxProps
}

type CheckboxPropsWithRef = Omit<React.ComponentProps<'input'>, keyof CheckboxOwnProps> & CheckboxOwnProps
export type CheckboxProps = Omit<CheckboxPropsWithRef, 'ref'>

export type CheckboxOwnerState = Required<Pick<CheckboxOwnProps, 'checked' | 'color' | 'disabled' | 'size' | 'noPadding'>> & {
	/**
	 * True if the field is focused.
	 */
	isFocused: boolean
	/**
	 * True if the field is using icons.
	 */
	useIcons: boolean
}

export type CheckboxStyled = {
	ownerState: CheckboxOwnerState
}