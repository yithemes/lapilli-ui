import { Breakpoint, generateComponentSlotClasses, styled, useTheme } from '@lapilli-ui/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { GridItemBreakpointProps, GridItemOwnerState, GridItemProps, GridItemStyled } from "./types";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'GridItem',
	[ 'root' ]
);

function useGridItemBreakpointProps( props: Record<string, any> ) {
	const { breakpoints } = useTheme();
	const other = { ...props };
	const breakpointProps: GridItemBreakpointProps = {};

	( Object.keys( breakpoints.values ) as Breakpoint[] ).forEach( ( breakpoint ) => {
		if ( other[ breakpoint ] != null ) {
			breakpointProps[ breakpoint ] = other[ breakpoint ];
			delete other[ breakpoint ];
		}
	} );

	return [ breakpointProps, other ];
}

const GridItemRoot = styled( 'div', { name: 'GridItem', slot: 'Root' } )<GridItemStyled>( ( { ownerState, theme } ) => ( {
	...( theme.breakpoints.stylize(
		ownerState.colSpan,
		( value ) => ( value > 1 && {
			gridColumn: `span ${ value } / span ${ value }`,
		} )
	) ),
	...( theme.breakpoints.stylize<number | null>(
		ownerState.responsiveColSpan,
		( value ) => ( value && value > 1 && {
			gridColumn: `span ${ value } / span ${ value }`,
		} )
	) ),
	...( theme.breakpoints.stylize(
		ownerState.rowSpan,
		( value ) => ( value > 1 && {
			gridRow: `span ${ value } / span ${ value }`,
		} )
	) ),
	...( ownerState.colStart !== undefined && theme.breakpoints.stylize( ownerState.colStart, ( value ) => ( value && { gridColumnStart: value } ) ) ),
	...( ownerState.colEnd !== undefined && theme.breakpoints.stylize( ownerState.colEnd, ( value ) => ( value && { gridColumnEnd: value } ) ) ),
	...( ownerState.rowStart !== undefined && theme.breakpoints.stylize( ownerState.rowStart, ( value ) => ( value && { gridRowStart: value } ) ) ),
	...( ownerState.rowEnd !== undefined && theme.breakpoints.stylize( ownerState.rowEnd, ( value ) => ( value && { gridRowEnd: value } ) ) ),
} ) );

const GridItem = forwardRef<HTMLDivElement, GridItemProps>( function Grid(
	{
		className,
		children,
		colSpan = 1,
		rowSpan = 1,
		colStart,
		colEnd,
		rowStart,
		rowEnd,
		...other
	}, ref ) {

	const [ responsiveColSpan, otherFiltered ] = useGridItemBreakpointProps( other );

	const ownerState: GridItemOwnerState = {
		colSpan,
		rowSpan,
		colStart,
		colEnd,
		rowStart,
		rowEnd,
		responsiveColSpan
	};

	return (
		<GridItemRoot { ...otherFiltered } ref={ ref } ownerState={ ownerState } className={ classNames( className, classes.root ) }>
			{ children }
		</GridItemRoot>
	);
} );

export default GridItem;
