import type React from "react";
import type { SxProps } from "@yith/styles";
import type { useCard } from "../context";

export type CardContentOwnProps = {
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardContentPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardContentOwnProps> & CardContentOwnProps
export type CardContentProps = Omit<CardContentPropsWithRef, 'ref'>

export type CardContentOwnerState = { card: ReturnType<typeof useCard> }

export type CardContentStyled = {
	ownerState: CardContentOwnerState
}