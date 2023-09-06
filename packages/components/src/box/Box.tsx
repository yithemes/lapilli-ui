import { generateComponentClasses, styled } from '@lapilli-ui/styles';
import React from 'react';
import type { BoxProps } from "./types";
import classNames from "classnames";

const useComponentClasses = () => {
	return generateComponentClasses(
		'Box',
		{
			root: [
				'root',
			]
		}
	)
}

const BoxRoot = styled( 'div', { name: 'Box', slot: 'Root' } )``;

/**
 * The Box is useful to have a component that exposes the `sx` prop, so you can easily stylize it.
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>( function Box(
	{
		className,
		children,
		...other
	}, ref ) {

	const classes = useComponentClasses()

	return (
		<BoxRoot { ...other } className={ classNames( className, classes.root ) } ref={ ref }>
			{ children }
		</BoxRoot>
	);
} );

export default Box;
