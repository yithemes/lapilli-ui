import type React from "react";
import type { SxProps } from "@yith/styles";
import type { useCard } from "../context";


export type CardActionsOwnProps = {
	/**
	 * If `true`, disable spacing.
	 */
	disableSpacing?: boolean
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardActionsPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardActionsOwnProps> & CardActionsOwnProps
export type CardActionsProps = Omit<CardActionsPropsWithRef, 'ref'>

export type CardActionsOwnerState = Required<Pick<CardActionsOwnProps, 'disableSpacing'>> & { card: ReturnType<typeof useCard> }

export type CardActionsStyled = {
	ownerState: CardActionsOwnerState
}