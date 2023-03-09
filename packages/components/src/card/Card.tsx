import { styled } from '@yith/styles';
import React, { forwardRef } from 'react';

import type { CardProps } from "./types";
import Paper from "../paper";

const CardRoot = styled( Paper, { name: 'Card', slot: 'Root' } )( () => ( {
	overflow: 'hidden'
} ) );

const Card = forwardRef<HTMLDivElement, CardProps>( function Card(
	{
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
	>
		{ children }
	</CardRoot>
} );

export default Card;
