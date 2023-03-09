import { styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardActionsOwnerState, CardActionsProps, CardActionsStyled } from "./types";

const CardActionsRoot = styled( 'div', { name: 'CardActions', slot: 'Root' } )( ( { ownerState }: CardActionsStyled ) => ( {
	display: 'flex',
	alignItems: 'center',
	padding: 8,
	...( !ownerState.disableSpacing && {
		'& > :not(:first-of-type)': {
			marginLeft: 8,
		},
	} ),
} ) );

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>( function CardActions(
	{
		disableSpacing = false,
		children,
		...props
	},
	ref
) {

	const ownerState: CardActionsOwnerState = { disableSpacing };

	return <CardActionsRoot
		{ ...props }
		ownerState={ ownerState }
		ref={ ref }
	>
		{ children }
	</CardActionsRoot>
} );

export default CardActions;
