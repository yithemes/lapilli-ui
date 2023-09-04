import type React from "react";
import type { FieldSize, PaletteClass, SxProps } from "@maya-ui/styles";

export type SliderMark = {
	/**
	 * The value.
	 */
	value: number

	/**
	 * The mark label.
	 */
	label?: React.ReactNode;
}

type SliderOwnProps = {
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
	 * The value.
	 */
	value?: number
	/**
	 * Callback fired when the value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void
	/**
	 * The default value. Useful when the component is not controlled.
	 */
	defaultValue?: number
	/**
	 * The minimum value.
	 */
	min?: number
	/**
	 * The maximum value.
	 */
	max?: number
	/**
	 * The step.
	 */
	step?: number
	/**
	 * Set to `true` to show marks.
	 */
	marks?: boolean | SliderMark[]
	/**
	 * The field name.
	 */
	name?: string
	/**
	 * Sx theme props.
	 */
	sx?: SxProps
}

type SliderPropsWithRef = Omit<React.ComponentProps<'div'>, keyof SliderOwnProps> & SliderOwnProps
export type SliderProps = Omit<SliderPropsWithRef, 'ref'>

export type SliderOwnerState = Required<Pick<SliderOwnProps, 'color' | 'disabled' | 'size'>> & {
	isDragging: boolean
	isFocused: boolean
	hasMarkLabels: boolean
}

export type SliderStyled = {
	ownerState: SliderOwnerState
}