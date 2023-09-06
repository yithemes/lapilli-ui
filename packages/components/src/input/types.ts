import type React from "react";
import type { FieldSize, SxProps } from "@lapilli-ui/styles";

type TextInputOwnProps = {
	/**
	 * Type of the input element to render.
	 */
	type?: 'text' | 'email' | 'password';
	/**
	 * The value of the field
	 */
	value?: string;
	/**
	 * Specified the input style.
	 */
	variant?: 'outlined' | 'ghost';
	/**
	 * Callback fired when the input value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: string ) => void;
	/**
	 * If provided, displays the adornment at the start position inside the input field.
	 */
	startAdornment?: React.ReactNode;
	/**
	 * If provided, displays the adornment at the end position inside the input field.
	 */
	endAdornment?: React.ReactNode;
	/**
	 * Set to `true` to show a mini field (useful for small number fields).
	 */
	isMini?: never;
	/**
	 * Set to `true` to make the input field get the full width.
	 */
	fullWidth?: boolean;
	/**
	 * If `true`, the input will be disabled.
	 */
	disabled?: boolean;
	/**
	 * If `true`, the input will indicate an error state.
	 */
	error?: boolean;
	/**
	 * The field size.
	 */
	size?: FieldSize;
	/**
	 * Sx theme props.
	 */
	sx?: SxProps;
};

type NumberInputOwnProps = Omit<TextInputOwnProps, 'type' | 'isMini' | 'value'> & {
	type: 'number'
	isMini?: boolean
	value?: string | number
};

type InputOwnProps = TextInputOwnProps | NumberInputOwnProps;

type InputPropsWithRef = Omit<React.ComponentProps<'input'>, keyof InputOwnProps> & InputOwnProps
export type InputProps = Omit<InputPropsWithRef, 'ref'>

export type InputOwnerState = Required<Pick<InputOwnProps, 'variant' | 'size' | 'isMini' | 'fullWidth' | 'disabled' | 'error'>> & {
	/**
	 * Is the input focused?
	 */
	isFocused: boolean
	/**
	 * Has the input a start adornment?
	 */
	hasStartAdornment: boolean
	/**
	 * Has the input an end adornment?
	 */
	hasEndAdornment: boolean
}

export type InputStyled = {
	ownerState: InputOwnerState
};