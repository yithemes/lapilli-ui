import { generateComponentSlotClasses, styled } from '@lapilli-ui/styles';
import React, { forwardRef } from 'react';

import type { CardProps } from "./types";
import Paper from "../paper";
import classNames from "classnames";
import { CardProvider } from "./context";

const classes = generateComponentSlotClasses(
	'Card',
	[ 'root' ]
);

const subcomponentClasses = {
	actions: generateComponentSlotClasses( 'CardActions', [ 'root' ] ).root,
	content: generateComponentSlotClasses( 'CardContent', [ 'root' ] ).root,
	header: generateComponentSlotClasses( 'CardHeader', [ 'root' ] ).root,
	media: generateComponentSlotClasses( 'CardMedia', [ 'root' ] ).root,
}

const CardRoot = styled( Paper, { name: 'Card', slot: 'Root' } )( () => ( {
	overflow: 'hidden',
	boxSizing: 'border-box',
	[ [
		`.${ subcomponentClasses.actions }+.${ subcomponentClasses.content }`,
		`.${ subcomponentClasses.actions }+.${ subcomponentClasses.header }`,
		`.${ subcomponentClasses.content }+.${ subcomponentClasses.actions }`,
		`.${ subcomponentClasses.content }+.${ subcomponentClasses.header }`,
		`.${ subcomponentClasses.header }+.${ subcomponentClasses.actions }`,
		`.${ subcomponentClasses.header }+.${ subcomponentClasses.content }`,
	].join( ',' ) ]: {
		paddingTop: 0
	}
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
		size = 'md',
		...props
	},
	ref
) {

	const providerProps: Omit<React.ComponentProps<typeof CardProvider>, 'children'> = { size };

	return <CardProvider { ...providerProps }>
		<CardRoot
			elevation={ raised ? 8 : undefined }
			{ ...props }
			ref={ ref }
			className={ classNames( className, classes.root ) }
		>
			{ children }
		</CardRoot>
	</CardProvider>
} );

export default Card;
