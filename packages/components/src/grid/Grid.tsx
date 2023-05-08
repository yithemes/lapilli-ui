import { styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { GridOwnerState, GridProps, GridStyled } from "./types";

const GridRoot = styled( 'div', { name: 'Grid', slot: 'Root' } )<GridStyled>( ( { ownerState, theme } ) => ( {
	display: 'grid',
	...( theme.breakpoints.stylize(
		ownerState.columns,
		( value ) => ( {
			gridTemplateColumns: `repeat(${ value }, minmax(0, 1fr))`,
		} )
	) ),
	...( theme.breakpoints.stylize(
		ownerState.rows,
		( value ) => ( !!value && {
			gridTemplateRows: `repeat(${ value }, minmax(0, 1fr))`,
		} )
	) ),
	...( theme.breakpoints.stylize(
		ownerState.gap,
		( value ) => {
			return ( {
				gap: theme.spacing( value ),
			} )
		}
	) ),
} ) );

const Grid = forwardRef<HTMLDivElement, GridProps>( function Grid(
	{
		children,
		columns = 1,
		rows = false,
		gap = 0,
		...other
	}, ref ) {

	const ownerState: GridOwnerState = {
		columns,
		rows,
		gap
	};

	return (
		<GridRoot ref={ ref } ownerState={ ownerState } { ...other }>
			{ children }
		</GridRoot>
	);
} );

export default Grid;
