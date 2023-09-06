import type { SxProps } from "@lapilli-ui/styles";
import type React from "react";
import type { TypographyProps } from "../typography";

export type FormControlLabelOwnProps = {
	/**
	 * The control component.
	 */
	control: React.ReactNode
	/**
	 * Text or node element to be used as label.
	 */
	label?: React.ReactNode
	/**
	 * The label position
	 */
	labelPlacement?: 'top' | 'bottom' | 'start' | 'end'
	/**
	 * The props of the Typography component for the label.
	 */
	labelTypographyProps?: Omit<TypographyProps, 'ref'>
	/**
	 * Text or node element to be used as help element.
	 */
	help?: React.ReactNode
	/**
	 * The props of the Typography component for the help element.
	 */
	helpTypographyProps?: Omit<TypographyProps, 'ref'>
	/**
	 * If `true` it'll disable Typography for label and help elements.
	 */
	disableTypography?: boolean
	/**
	 * If `true`, the element width will take the 100%.
	 */
	fullWidth?: boolean
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type FormControlLabelPropsWithRef = Omit<React.ComponentProps<'div'>, keyof FormControlLabelOwnProps> & FormControlLabelOwnProps
export type FormControlLabelProps = Omit<FormControlLabelPropsWithRef, 'ref'>

export type FormControlLabelOwnerState = Required<Pick<FormControlLabelOwnProps, 'labelPlacement' | 'fullWidth'>>

export type FormControlLabelStyled = {
	ownerState: FormControlLabelOwnerState
}