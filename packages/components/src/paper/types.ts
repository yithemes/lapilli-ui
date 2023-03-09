import type React from "react";
import type { SxProps, Theme, ThemeColor } from "@yith/styles";

type PaperOwnProps = {
	/**
	 * The variant to use.
	 */
	variant?: 'elevation' | 'outlined'
	/**
	 * Shadow depth.
	 */
	elevation?: number
	/**
	 * If `true`, rounded corners are disabled.
	 */
	squared?: boolean
	/**
	 * The shadow color to use.
	 */
	shadowColor?: keyof Theme['shadows']
	/**
	 * The border color to use.
	 */
	borderColor?: ThemeColor
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type PaperPropsWithRef = Omit<React.ComponentProps<'div'>, keyof PaperOwnProps> & PaperOwnProps
export type PaperProps = Omit<PaperPropsWithRef, 'ref'>

export type PaperOwnerState = Required<Pick<PaperOwnProps, 'elevation' | 'variant' | 'squared' | 'shadowColor' | 'borderColor'>>

export type PaperStyled = {
	ownerState: PaperOwnerState
}