import type React from "react";
import type { Breakpoint, ResponsiveStyleValue } from "@yith/styles";

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
} & ResponsiveColSpan;

type GridItemPropsWithRef = Omit<React.ComponentProps<'div'>, keyof GridItemOwnProps> & GridItemOwnProps
export type GridItemProps = Omit<GridItemPropsWithRef, 'ref'>

export type GridItemOwnerState = Required<Pick<GridItemOwnProps, 'colSpan'>> & {
	responsiveColSpan: { [key in Breakpoint]?: number | null }
}

export type GridItemStyled = {
	ownerState: GridItemOwnerState
}