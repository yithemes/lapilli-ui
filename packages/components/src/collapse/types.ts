import type React from "react";
import type { SxProps } from "@lapilli-ui/styles";
import type { TransitionStatus } from "react-transition-group";

export type CollapseOwnProps = {
	/**
	 * Is this open?
	 */
	open?: boolean,
	/**
	 * The transition orientation.
	 */
	orientation?: 'horizontal' | 'vertical',
	/**
	 * The width (horizontal) or height (vertical) of the container when collapsed.
	 */
	collapsedSize?: React.CSSProperties['width'],
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

export type CollapsePropsWithRef = Omit<React.ComponentProps<'div'>, keyof CollapseOwnProps> & CollapseOwnProps
export type CollapseProps = Omit<CollapsePropsWithRef, 'ref'>

export type CollapseOwnerState = Required<Pick<CollapseOwnProps, 'open' | 'orientation' | 'collapsedSize'>> & {
	state: TransitionStatus
}

export type CollapseStyled = {
	ownerState: CollapseOwnerState
};