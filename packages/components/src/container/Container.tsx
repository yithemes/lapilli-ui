import { Breakpoint, generateComponentClasses, styled, useTheme } from '@yith/styles';
import React, { forwardRef } from 'react';
import type { ContainerOwnerState, ContainerProps, ContainerStyled } from "./types";
import { capitalize } from "lodash";
import classNames from "classnames";

const useComponentClasses = ( ownerState: ContainerOwnerState ) => {
	const theme = useTheme();
	return generateComponentClasses(
		'Container',
		{
			root: [
				'root',
				`--align${ capitalize( ownerState.align ) }`,
				theme.breakpoints.isBreakpoint( ownerState.maxWidth ) && `--maxWidth${ capitalize( ownerState.maxWidth ) }`
			]
		}
	)
}

const ContainerRoot = styled( 'div', { name: 'Container', slot: 'Root' } )<ContainerStyled>( ( { ownerState, theme } ) => ( {
	display: 'block',
	width: '100%',
	boxSizing: 'border-box',
	...( [ 'center', 'right' ].includes( ownerState.align ) && {
		marginLeft: 'auto',
	} ),
	...( [ 'center', 'left' ].includes( ownerState.align ) && {
		marginRight: 'auto',
	} ),
	...( ownerState.maxWidth !== false && {
		maxWidth: theme.breakpoints.isBreakpoint( ownerState.maxWidth )
			? ( theme.breakpoints.values[ ownerState.maxWidth as Breakpoint ] + theme.breakpoints.unit )
			: ownerState.maxWidth
	} ),
	...( ownerState.gutters && {
		paddingLeft: theme.spacing( ownerState.gutters ),
		paddingRight: theme.spacing( ownerState.gutters )
	} ),
} ) );

/**
 * The Container is an element that contains children. You can use it to set a specific `maxWidth`, to choose its alignment, to set gutters (horizontal padding) and so on...
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>( function Container(
	{
		className,
		children,
		maxWidth = false,
		gutters = 2,
		align = 'left',
		...other
	},
	ref
) {
	const ownerState: ContainerOwnerState = { maxWidth, align, gutters };
	const classes = useComponentClasses( ownerState );

	return (
		<ContainerRoot { ...other } className={ classNames( className, classes.root ) } ownerState={ ownerState } ref={ ref }>
			{ children }
		</ContainerRoot>
	);
} );

export default Container;
