import { generateComponentClasses, styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardActionsOwnerState, CardActionsProps, CardActionsStyled } from "./types";
import classNames from "classnames";

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
	padding: 8,
	...( !ownerState.disableSpacing && {
		'& > :not(:first-of-type)': {
			marginLeft: 8,
		},
	} ),
} ) );

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>( function CardActions(
	{
		className,
		disableSpacing = false,
		children,
		...props
	},
	ref
) {

	const ownerState: CardActionsOwnerState = { disableSpacing };
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
