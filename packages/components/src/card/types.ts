import type React from "react";
import type { SxProps } from "@yith/styles";
import type { PaperProps } from "../paper";

export type CardOwnProps = {
	/**
	 * If `true`, the card will be shown as raised.
	 */
	raised?: boolean
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardOwnProps> & CardOwnProps & PaperProps
export type CardProps = Omit<CardPropsWithRef, 'ref'>