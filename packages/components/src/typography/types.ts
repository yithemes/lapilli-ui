import type React from "react";
import type { ThemeColor, SxProps, TypographyVariant } from "@lapilli-ui/styles";

export type TypographyOwnerState = {
	/**
	 * The variant of typography to be used.
	 */
	variant: TypographyVariant
	/**
	 * The theme color.
	 */
	color: ThemeColor
	/**
	 *
	 * If `true`, the text will have a bottom margin.
	 */
	gutterBottom: boolean
	/**
	 *
	 * If `true`, the text will have a bottom margin.
	 */
	align: React.CSSProperties['textAlign']
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type TypographyOwnProps = Partial<TypographyOwnerState> & {
	/**
	 * The component used for the root node. Either a string to use an HTML element or a component.
	 */
	component?: React.ElementType
}

type TypographyPropsWithRef = Omit<React.ComponentProps<'span'>, keyof TypographyOwnProps> & TypographyOwnProps
export type TypographyProps = Omit<TypographyPropsWithRef, 'ref'>

export type TypographyStyled = {
	ownerState: TypographyOwnerState
}