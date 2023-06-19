import { generateComponentClasses, styled, TypographyVariant } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';
import type { TypographyOwnerState, TypographyProps, TypographyStyled } from "./types";
import classNames from "classnames";

const useComponentClasses = ( ownerState: TypographyOwnerState ) => {
	return generateComponentClasses(
		'Typography',
		{
			root: [
				'root',
				`--${ ownerState.variant }`,
				ownerState.gutterBottom && '--gutterBottom',
			],
		}
	)
}

const TypographyRoot = styled( 'span', { name: 'Typography', slot: 'Root' } )<TypographyStyled>(
	( { theme, ownerState } ) => ( {
		fontFamily: theme.typography.fontFamily,
		margin: 0,
		...( theme.typography[ ownerState.variant ] ?? {} ),
		color: theme.color( ownerState.color ),
		textAlign: ownerState.align,
		...( ownerState.gutterBottom && {
			marginBottom: '0.35em'
		} ),
	} ) );

const variantMapping: Record<TypographyVariant, React.ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	body: 'p',
	body2: 'p',
}

/**
 * The Typography allows to render typography elements (body, heading, ...).
 */
const Typography = forwardRef<HTMLDivElement, TypographyProps>( function Typography(
	{
		className,
		variant = 'body',
		color = 'text.primary',
		component: componentProp,
		gutterBottom = false,
		align = 'left',
		children,
		...props
	},
	ref
) {

	const Component = componentProp ?? variantMapping[ variant ];
	const ownerState: TypographyOwnerState = {
		variant,
		color,
		align,
		gutterBottom
	}

	const classes = useComponentClasses( ownerState );

	return (
		<TypographyRoot { ...props } className={ classNames( className, classes.root ) } ref={ ref } as={ Component } ownerState={ ownerState }>
			{ children }
		</TypographyRoot>
	);
} );

export default Typography;
