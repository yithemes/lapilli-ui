import type React from "react";
import type { Breakpoint, ResponsiveStyleValue } from "@lapilli-ui/styles";

type ResponsiveColSpan = {
	/**
	 * The number of columns the item will get for each breakpoint.
	 */
	[breakpoint in Breakpoint]?: number | null
};

type GridItemOwnProps = {
	/**
	 * The number of columns the item will get.
	 */
	colSpan?: ResponsiveStyleValue<number>
	/**
	 * The number of the column the item will start in.
	 */
	colStart?: ResponsiveStyleValue<React.CSSProperties['gridColumnStart']>
	/**
	 * The number of the column the item will end in.
	 */
	colEnd?: ResponsiveStyleValue<React.CSSProperties['gridColumnEnd']>
	/**
	 * The number of rows the item will get.
	 */
	rowSpan?: ResponsiveStyleValue<number>
	/**
	 * The number of the row the item will start in.
	 */
	rowStart?: ResponsiveStyleValue<React.CSSProperties['gridRowStart']>
	/**
	 * The number of the row the item will end in.
	 */
	rowEnd?: ResponsiveStyleValue<React.CSSProperties['gridRowEnd']>
} & ResponsiveColSpan;

type GridItemPropsWithRef = Omit<React.ComponentProps<'div'>, keyof GridItemOwnProps> & GridItemOwnProps
export type GridItemProps = Omit<GridItemPropsWithRef, 'ref'>

export type GridItemOwnerState = Required<Pick<GridItemOwnProps, 'colSpan' | 'rowSpan'>> &
	Pick<GridItemOwnProps, 'colStart' | 'colEnd' | 'rowStart' | 'rowEnd'> & {
	responsiveColSpan: { [key in Breakpoint]?: number | null }
}

export type GridItemStyled = {
	ownerState: GridItemOwnerState
}