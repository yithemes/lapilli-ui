import type React from "react";
import type { SxProps } from "@maya-ui/styles";
import type { MotionProps } from "framer-motion";

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

export type CollapsePropsWithRef = Omit<React.ComponentProps<'div'>, keyof CollapseOwnProps | keyof MotionProps> & CollapseOwnProps & MotionProps
export type CollapseProps = Omit<CollapsePropsWithRef, 'ref'>