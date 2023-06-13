import { generateComponentSlotClasses, styled } from '@yith/styles';
import React, { forwardRef } from 'react';

import type { CardProps } from "./types";
import Paper from "../paper";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'Card',
	[ 'root' ]
);

const CardRoot = styled( Paper, { name: 'Card', slot: 'Root' } )( () => ( {
	overflow: 'hidden'
} ) );

const Card = forwardRef<HTMLDivElement, CardProps>( function Card(
	{
		className,
		children,
		raised = false,
		...props
	},
	ref
) {

	return <CardRoot
		elevation={ raised ? 8 : undefined }
		{ ...props }
		ref={ ref }
		className={ classNames( className, classes.root ) }
	>
		{ children }
	</CardRoot>
} );

export default Card;
