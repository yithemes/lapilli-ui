import { breakpointStylize, styled, useBreakpointProps } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { GridItemOwnerState, GridItemProps, GridItemStyled } from "./types";

const GridItemRoot = styled( 'div', { name: 'GridItem', slot: 'Root' } )<GridItemStyled>( ( { ownerState, theme } ) => ( {
	...( breakpointStylize(
		theme,
		ownerState.colSpan,
		( value ) => ( value > 1 && {
			gridColumn: `span ${ value } / span ${ value }`,
		} )
	) ),
	...( breakpointStylize(
		theme,
		ownerState.responsiveColSpan,
		( value ) => ( value > 1 && {
			gridColumn: `span ${ value } / span ${ value }`,
		} )
	) ),
} ) );

const GridItem = forwardRef<HTMLDivElement, GridItemProps>( function Grid(
	{
		children,
		colSpan = 1,
		...other
	}, ref ) {

	const [ responsiveColSpan, otherFiltered ] = useBreakpointProps( other );

	const ownerState: GridItemOwnerState = {
		colSpan,
		responsiveColSpan
	};

	return (
		<GridItemRoot ref={ ref } ownerState={ ownerState } { ...otherFiltered }>
			{ children }
		</GridItemRoot>
	);
} );

export default GridItem;
