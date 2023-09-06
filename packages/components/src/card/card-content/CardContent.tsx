import { generateComponentSlotClasses, styled } from '@lapilli-ui/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardContentOwnerState, CardContentProps, CardContentStyled } from "./types";
import classNames from "classnames";
import { useCard } from "../context";

const classes = generateComponentSlotClasses(
	'CardContent',
	[ 'root' ]
);

const CardContentRoot = styled( 'div', { name: 'CardContent', slot: 'Root' } )<CardContentStyled>( ( { ownerState } ) => ( {
	padding: ownerState.card.sizing( 1 ),
	boxSizing: 'border-box',
} ) );

const CardContent = forwardRef<HTMLDivElement, CardContentProps>( function CardContent(
	{
		className,
		children,
		...props
	},
	ref
) {

	const card = useCard();
	const ownerState: CardContentOwnerState = { card };

	return <CardContentRoot
		{ ...props }
		ownerState={ ownerState }
		className={ classNames( className, classes.root ) }
		ref={ ref }
	>
		{ children }
	</CardContentRoot>
} );

export default CardContent;
