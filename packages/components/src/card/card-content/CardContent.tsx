import { styled } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

import type { CardContentProps } from "./types";

const CardContentRoot = styled( 'div', { name: 'CardContent', slot: 'Root' } )( () => ( {
	padding: 16,
	'&:last-child': {
		paddingBottom: 24,
	},
} ) );

const CardContent = forwardRef<HTMLDivElement, CardContentProps>( function CardContent(
	{
		children,
		...props
	},
	ref
) {

	return <CardContentRoot
		{ ...props }
		ref={ ref }
	>
		{ children }
	</CardContentRoot>
} );

export default CardContent;
