import React, { CSSProperties } from 'react';

import { styled } from '@yith/styles';
import type { StackAlignment, StackJustify, StackProps, StyledStackProps } from "./types";

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
	display: 'flex',
	flexDirection: 'column',
	...( theme.breakpoints.stylize( ownerState.align, ( value ) => ( { alignItems: mapAlignValue( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.justify, ( value ) => ( { justifyContent: mapJustifyValue( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.direction, ( value ) => ( { flexDirection: value + ( ownerState.isReverse ? '-reverse' : '' ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.spacing, ( value ) => ( { gap: theme.spacing( value ) } ) ) ),
	...( theme.breakpoints.stylize( ownerState.wrap, ( value ) => ( { flexWrap: !!value ? 'wrap' : undefined } ) ) ),
} ) );

const Stack = React.forwardRef<HTMLDivElement, StackProps<'div'>>( function Stack(
	{
		as = 'div',
		direction = 'column',
		isReverse = false,
		wrap = false,
		spacing = 0,
		align = 'stretch',
		justify = 'start',
		children,
		...others
	},
	ref
) {

	const ownerState = {
		direction,
		isReverse,
		wrap,
		spacing,
		align,
		justify,
	};

	return (
		<StackRoot as={ as } ownerState={ ownerState } ref={ ref } { ...others }>
			{ children }
		</StackRoot>
	);
} );

export default Stack;
