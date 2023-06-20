import type React from "react";
import type { SxProps } from "@yith/styles";
import type { TypographyProps } from "../../typography";
import type { useCard } from "../context";

export type CardHeaderOwnProps = {
	/**
	 * The title of the card header.
	 */
	title?: React.ReactNode
	/**
	 * The subtitle of the card header.
	 */
	subtitle?: React.ReactNode
	/**
	 * The action to display in the card header.
	 */
	action?: React.ReactNode
	/**
	 * The adornment to display in the card header at the start position.
	 */
	startAdornment?: React.ReactNode
	/**
	 * The adornment to display in the card header at the end position (before action).
	 */
	endAdornment?: React.ReactNode
	/**
	 * If `true` it'll disable Typography for title and subtitle.
	 */
	disableTypography?: boolean
	/**
	 * The props of the Typography component for the title.
	 */
	titleTypographyProps?: Omit<TypographyProps, 'ref'>
	/**
	 * The props of the Typography component for the subtitle.
	 */
	subtitleTypographyProps?: Omit<TypographyProps, 'ref'>
	/**
	 * The props of the start adornment wrapper.
	 */
	startAdornmentProps?: React.ComponentProps<'div'> & { sx?: SxProps }
	/**
	 * The props of the end adornment wrapper.
	 */
	endAdornmentProps?: React.ComponentProps<'div'> & { sx?: SxProps }
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardHeaderPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardHeaderOwnProps> & CardHeaderOwnProps
export type CardHeaderProps = Omit<CardHeaderPropsWithRef, 'ref'>

export type CardHeaderOwnerState = { card: ReturnType<typeof useCard> }

export type CardHeaderStyled = {
	ownerState: CardHeaderOwnerState
}