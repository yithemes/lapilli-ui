import { generateComponentSlotClasses, styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardContentProps } from "./types";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'CardContent',
	[ 'root' ]
);

const CardContentRoot = styled( 'div', { name: 'CardContent', slot: 'Root' } )( () => ( {
	padding: 16,
	'&:last-child': {
		paddingBottom: 24,
	},
} ) );

const CardContent = forwardRef<HTMLDivElement, CardContentProps>( function CardContent(
	{
		className,
		children,
		...props
	},
	ref
) {

	return <CardContentRoot
		{ ...props }
		className={ classNames( className, classes.root ) }
		ref={ ref }
	>
		{ children }
	</CardContentRoot>
} );

export default CardContent;
