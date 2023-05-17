import type { FieldSize, PaletteClass, SxProps } from "@yith/styles";
import type React from "react";

type ButtonOwnProps = {
	/**
	 * The variant style of the button.
	 */
	variant?: 'contained' | 'outlined' | 'text' | 'dashed';
	/**
	 * The color.
	 */
	color?: PaletteClass;
	/**
	 * The size.
	 */
	size?: FieldSize;
	/**
	 * If `true` the button will take the full width of its container.
	 */
	fullWidth?: boolean
	/**
	 * If `true` the button will be shown shortened.
	 */
	short?: boolean
	/**
	 * If `true` the button will be disabled.
	 */
	disabled?: boolean
	/**
	 * If provided, it renders an icon element inside the button on the left.
	 */
	startIcon?: React.ReactNode
	/**
	 * If provided, it renders an icon element inside the button on the right.
	 */
	endIcon?: React.ReactNode
	/**
	 * Sx theme props.
	 */
	sx?: SxProps
};

type ButtonPropsWithRef = Omit<React.ComponentProps<'button'>, keyof ButtonOwnProps> & ButtonOwnProps
export type ButtonProps = Omit<ButtonPropsWithRef, 'ref'>

export type ButtonOwnerState = Required<Pick<ButtonOwnProps, 'variant' | 'color' | 'size' | 'fullWidth' | 'short' | 'disabled'>>

export type ButtonStyled = {
	ownerState: ButtonOwnerState
};