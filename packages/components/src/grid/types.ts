import type React from "react";
import type { ResponsiveStyleValue, SxProps } from "@lapilli-ui/styles";

type GridOwnProps = {
	/**
	 * The number of columns of the grid
	 */
	columns?: ResponsiveStyleValue<number>

	/**
	 * The number of rows of the grid. Set false to use auto-layout.
	 */
	rows?: ResponsiveStyleValue<number | boolean>

	/**
	 * The gap between columns and rows
	 */
	gap?: ResponsiveStyleValue<number | string>

	/**
	 * The sx prop lets you style elements inline, using values from your theme.
	 */
	sx?: SxProps
}

type GridPropsWithRef = Omit<React.ComponentProps<'div'>, keyof GridOwnProps> & GridOwnProps
export type GridProps = Omit<GridPropsWithRef, 'ref'>

export type GridOwnerState = Required<Pick<GridOwnProps, 'columns' | 'gap' | 'rows'>>

export type GridStyled = {
	ownerState: GridOwnerState
}