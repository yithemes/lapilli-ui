import type React from "react";
import type { FieldSize, PaletteClass, SxProps } from "@yith/styles";
import type { StackProps } from "../stack/types";

type RadioGroupOptionParams = {
	value: string;
	label: React.ReactNode;
	description?: React.ReactNode;
	color?: PaletteClass;
};

type RadioGroupOwnProps = {
	/**
	 * The value of the radio group (if controlled).
	 */
	variant?: 'radio' | 'boxed' | 'compact'
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
	options?: RadioGroupOptionParams[]
	/**
	 * The color of the radio options.
	 */
	color?: PaletteClass
	/**
	 * The field size.
	 */
	size?: FieldSize
	/**
	 * Sx props.
	 */
	sx?: SxProps
};

type RadioGroupPropsWithRef = Omit<StackProps<'div'>, keyof RadioGroupOwnProps> & RadioGroupOwnProps
export type RadioGroupProps = Omit<RadioGroupPropsWithRef, 'ref'>

export type RadioGroupOwnerState = {
	isFocused: boolean;
} & Required<Pick<RadioGroupProps, 'variant' | 'size' | 'color'>>

export type RadioGroupStyled = {
	ownerState: RadioGroupOwnerState
}

export type RadioGroupOptionOwnerState = {
	isChecked: boolean;
	isFocused: boolean;
	color: PaletteClass;
} & Required<Pick<RadioGroupProps, 'variant' | 'size'>>;

export type RadioGroupOptionStyled = {
	ownerState: RadioGroupOptionOwnerState
}

export type RadioGroupOptionState = {
	option: RadioGroupOptionParams
	isChecked: boolean
}

type RadioGroupOptionOwnProps = RadioGroupOptionState & {
	onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"]
}
type RadioGroupOptionPropsWithRef = Omit<React.ComponentProps<'div'>, keyof RadioGroupOptionOwnProps> & RadioGroupOptionOwnProps
export type RadioGroupOptionProps = Omit<RadioGroupOptionPropsWithRef, 'ref'>