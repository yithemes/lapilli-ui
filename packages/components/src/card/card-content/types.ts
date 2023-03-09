import type React from "react";
import type { SxProps } from "@yith/styles";

export type CardContentOwnProps = {
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type CardContentPropsWithRef = Omit<React.ComponentProps<'div'>, keyof CardContentOwnProps> & CardContentOwnProps
export type CardContentProps = Omit<CardContentPropsWithRef, 'ref'>