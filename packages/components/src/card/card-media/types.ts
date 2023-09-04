import type React from "react";
import type { SxProps } from "@maya-ui/styles";

export type CardMediaOwnerState = {
	isMedia: boolean
	isImage: boolean
}

export type CardMediaOwnProps = {
	/**
	 * The element type of the component.
	 */
	component?: React.ElementType
	/**
	 * The source of the media.
	 */
	src?: string
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardMediaPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardMediaOwnProps> & CardMediaOwnProps
export type CardMediaProps = Omit<CardMediaPropsWithRef, 'ref'>

export type CardMediaStyled = {
	ownerState: CardMediaOwnerState
}