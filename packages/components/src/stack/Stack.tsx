import React, { CSSProperties } from 'react';

import { generateComponentSlotClasses, styled } from '@yith/styles';
import type { StackAlignment, StackJustify, StackOwnerState, StackProps, StyledStackProps } from "./types";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'Stack',
	[ 'root' ]
);

function mapAlignValue( value: StackAlignment ) {
	const map: Record<StackAlignment, CSSProperties['alignItems']> = {
		start: 'flex-start',
		end: 'flex-end',
		center: 'center',
		stretch: 'stretch',
		baseline: 'baseline'
	};
	return map[ value ] ?? value;
}

function mapJustifyValue( value: StackJustify ) {
	const map: Record<StackJustify, CSSProperties['justifyContent']> = {
		start: 'flex-start',
		end: 'flex-end',
		center: 'center',
		'space-around': 'space-around',
		'space-between': 'space-between',
		'space-evenly': 'space-evenly',
	};
	return map[ value ] ?? value;
}

const StackRoot = styled( 'div', { name: 'Stack', slot: 'Root' } )<StyledStackProps>( ( { ownerState, theme } ) => ( {
	display: ownerState.inline ? 'inline-flex' : 'flex',
	flexDirection: 'column',
	...( theme.breakpoints.stylize( ownerState.align, ( value ) => ( { alignItems: mapAlignValue( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.justify, ( value ) => ( { justifyContent: mapJustifyValue( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.direction, ( value ) => ( { flexDirection: value + ( ownerState.isReverse ? '-reverse' : '' ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.spacing, ( value ) => ( { gap: theme.spacing( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.wrap, ( value ) => ( { flexWrap: !!value ? 'wrap' : undefined } ) ) ),
} ) );

const Stack = React.forwardRef<HTMLDivElement, StackProps<'div'>>( function Stack(
	{
		className,
		as = 'div',
		direction = 'column',
		isReverse = false,
		wrap = false,
		spacing = 0,
		align = 'stretch',
		justify = 'start',
		inline = false,
		children,
		...others
	},
	ref
) {

	const ownerState: StackOwnerState = {
		direction,
		isReverse,
		wrap,
		spacing,
		align,
		justify,
		inline
	};

	return (
		<StackRoot  { ...others } as={ as } ownerState={ ownerState } ref={ ref } className={ classNames( className, classes.root ) } >
			{ children }
		</StackRoot>
	);
} );

export default Stack;
