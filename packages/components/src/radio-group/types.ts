import type React from "react";
import type { PaletteClass, SxProps } from "@yith/styles";
import type { StackProps } from "../stack/types";

type RadioGroupOption = {
	value: string;
	label: React.ReactNode;
	description?: React.ReactNode;
	color?: PaletteClass;
};

type RadioGroupOwnProps = {
	/**
	 * The value of the radio group (if controlled).
	 */
	variant?: 'radio' | 'boxed' | 'pill'
	/**
	 * The value of the radio group (if controlled).
	 */
	value?: string
	/**
	 * The HTML name for the radio fields.
	 */
	name?: string
	/**
	 * Triggered when the value changes (if controlled).
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: string ) => void
	/**
	 * The options to be shown.
	 */
	options?: RadioGroupOption[]
	/**
	 * The color of the radio options.
	 */
	color?: PaletteClass
	/**
	 * Sx props.
	 */
	sx?: SxProps
};

export type RadioGroupItemOwnerState = {
	isChecked: boolean;
	color: PaletteClass;
};

type RadioGroupPropsWithRef = Omit<StackProps<'div'>, keyof RadioGroupOwnProps> & RadioGroupOwnProps
export type RadioGroupProps = Omit<RadioGroupPropsWithRef, 'ref'>

export type RadioGroupOwnerState = Required<Pick<RadioGroupProps, 'color'>>

export type RadioGroupStyled = {
	ownerState: RadioGroupOwnerState
}

export type RadioGroupItemStyled = {
	ownerState: RadioGroupItemOwnerState
}