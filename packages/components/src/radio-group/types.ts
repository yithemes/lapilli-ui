import type React from "react";
import type { FieldSize, SxProps } from "@yith/styles";
import type { StackProps } from "../stack/types";
import type { RadioGroupContextValue } from "./context";

type RadioGroupOptionParams = {
	value: string
	label: React.ReactNode
	description?: React.ReactNode
	disabled?: boolean
};

type RadioGroupOwnProps = {
	/**
	 * The value of the radio group (if controlled).
	 */
	variant?: 'radio' | 'boxed' | 'segmented'
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
	 * The field size.
	 */
	size?: FieldSize
	/**
	 * Set to `true` to make the field fits width to its parent's width.
	 */
	fullWidth?: boolean;
	/**
	 * Set the preferred sizing layout for the items: 'adaptive' will adapt the item sizes to fill the whole size of the container; 'equal' will set the item sizes to be the same.
	 */
	sizing?: false | 'adaptive' | 'equal';
	/**
	 * If `true`, the whole field will be disabled.
	 */
	disabled?: boolean;
	/**
	 * Sx props.
	 */
	sx?: SxProps
};

type RadioGroupPropsWithRef = Omit<StackProps<'div'>, keyof RadioGroupOwnProps | 'inline'> & RadioGroupOwnProps
export type RadioGroupProps = Omit<RadioGroupPropsWithRef, 'ref'>

export type RadioGroupOwnerState = {
	isFocused: boolean;
} & Required<Pick<RadioGroupProps, 'variant' | 'size'>>

export type RadioGroupStyled = {
	ownerState: RadioGroupOwnerState
}

export type RadioGroupOptionOwnerState = {
	isChecked: boolean
	isFocused: boolean
	isDisabled: boolean
	groupContext: RadioGroupContextValue
};

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