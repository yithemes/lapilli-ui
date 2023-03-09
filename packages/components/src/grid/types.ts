import type React from "react";
import type { ResponsiveStyleValue } from "@yith/styles";

type GridOwnProps = {
	/**
	 * The number of columns of the grid
	 */
	columns?: ResponsiveStyleValue<number>

	/**
	 * The gap between columns and rows
	 */
	gap?: ResponsiveStyleValue<number | string>
}

type GridPropsWithRef = Omit<React.ComponentProps<'div'>, keyof GridOwnProps> & GridOwnProps
export type GridProps = Omit<GridPropsWithRef, 'ref'>

export type GridOwnerState = Required<Pick<GridOwnProps, 'columns' | 'gap'>>

export type GridStyled = {
	ownerState: GridOwnerState
}