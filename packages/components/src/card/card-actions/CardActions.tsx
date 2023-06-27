import { generateComponentClasses, styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardActionsOwnerState, CardActionsProps, CardActionsStyled } from "./types";
import classNames from "classnames";
import { useCard } from "../context";

const useComponentClasses = ( ownerState: CardActionsOwnerState ) => {
	return generateComponentClasses(
		'CardActions',
		{
			root: [
				'root',
				ownerState.disableSpacing && '--disableSpacing'
			],
		}
	)
}

const CardActionsRoot = styled( 'div', { name: 'CardActions', slot: 'Root' } )( ( { ownerState }: CardActionsStyled ) => ( {
	display: 'flex',
	alignItems: 'center',
	boxSizing: 'border-box',
	padding: ownerState.card.sizing( 1 ),
	...( ownerState.compact && {
		padding: ownerState.card.sizing( 1 / 2 ),
	} ),
	...( !ownerState.disableSpacing && {
		gap: ownerState.card.sizing( 1 / 2 ),
	} ),
} ) );

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>( function CardActions(
	{
		className,
		disableSpacing = false,
		compact = false,
		children,
		...props
	},
	ref
) {

	const card = useCard();
	const ownerState: CardActionsOwnerState = { disableSpacing, compact, card };
	const classes = useComponentClasses( ownerState );

	return <CardActionsRoot
		{ ...props }
		className={ classNames( className, classes.root ) }
		ownerState={ ownerState }
		ref={ ref }
	>
		{ children }
	</CardActionsRoot>
} );

export default CardActions;
