import { generateComponentSlotClasses, styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { GridOwnerState, GridProps, GridStyled } from "./types";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'Grid',
	[ 'root' ]
);

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
		className,
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
		<GridRoot { ...other } ref={ ref } ownerState={ ownerState } className={ classNames( className, classes.root ) }>
			{ children }
		</GridRoot>
	);
} );

export default Grid;
