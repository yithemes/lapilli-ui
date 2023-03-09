import { styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { PaperOwnerState, PaperProps, PaperStyled } from "./types";

const PaperRoot = styled( 'div', { name: 'Paper', slot: 'Root' } )<PaperStyled>( ( { ownerState, theme } ) => ( {
	background: theme.palette.background.paper,
	color: theme.palette.text.primary,
	transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
	...( !ownerState.squared && {
		borderRadius: theme.shape.borderRadius
	} ),
	...( ownerState.elevation && {
		boxShadow: theme.shadows[ ownerState.shadowColor ][ ownerState.elevation ] ?? "none"
	} ),
	...( ownerState.variant === 'outlined' && {
		border: `1px solid ${ theme.color( ownerState.borderColor ) }`
	} )
} ) );

const Paper = forwardRef<HTMLDivElement, PaperProps>( function Paper(
	{
		children,
		elevation: elevationProp,
		variant = 'elevation',
		squared = false,
		shadowColor: shadowColorProp,
		borderColor = 'border.primary',
		...other
	}, ref ) {

	const elevation = elevationProp ?? ( 'elevation' === variant ? 1 : 0 );
	const shadowColor = shadowColorProp ?? ( 'elevation' === variant ? 'primary' : 'secondary' );

	const ownerState: PaperOwnerState = {
		elevation,
		variant,
		squared,
		shadowColor,
		borderColor
	};

	return (
		<PaperRoot ref={ ref } ownerState={ ownerState } { ...other }>
			{ children }
		</PaperRoot>
	);
} );

export default Paper;
