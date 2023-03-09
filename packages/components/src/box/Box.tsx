import { styled } from '@yith/styles';
import React from 'react';
import type { BoxProps } from "./types";

const BoxRoot = styled( 'div', { name: 'Box', slot: 'Root' } )``;

const Box = React.forwardRef<HTMLDivElement, BoxProps>( function Box(
	{
		children,
		...other
	}, ref ) {
	return (
		<BoxRoot { ...other } ref={ ref }>
			{ children }
		</BoxRoot>
	);
} );

export default Box;
