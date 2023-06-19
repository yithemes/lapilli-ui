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

/**
 * The Card component provides an easy way to show "surfaces" that display contents and actions related to a specific topic.
 *
 * You can create Cards containing different elements: text, images, actions, buttons and so on...
 *
 * To do that you can use the set of the Card subcomponents: `CardHeader`, `CardContent`, `CardMedia` and `CardActions`.
 */
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
