import { styled, useBreakpointProps } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { GridItemOwnerState, GridItemProps, GridItemStyled } from "./types";

const GridItemRoot = styled( 'div', { name: 'GridItem', slot: 'Root' } )<GridItemStyled>( ( { ownerState, theme } ) => ( {
	...( theme.breakpoints.stylize(
		ownerState.colSpan,
		( value ) => ( value > 1 && {
			gridColumn: `span ${ value } / span ${ value }`,
		} )
	) ),
	...( theme.breakpoints.stylize(
		ownerState.responsiveColSpan,
		( value ) => ( value > 1 && {
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
		children,
		colSpan = 1,
		rowSpan = 1,
		colStart,
		colEnd,
		rowStart,
		rowEnd,
		...other
	}, ref ) {

	const [ responsiveColSpan, otherFiltered ] = useBreakpointProps( other );

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
		<GridItemRoot ref={ ref } ownerState={ ownerState } { ...otherFiltered }>
			{ children }
		</GridItemRoot>
	);
} );

export default GridItem;
