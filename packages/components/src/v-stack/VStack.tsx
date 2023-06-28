import React from "react";
import type { StackProps } from "../stack/types";
import Stack from "../stack";

type VStackProps = Omit<StackProps<'div'>, 'direction'>;

/**
 * Let's create a vertical stacked layout by using the VStack component. It uses the flexbox layout.
 */
const VStack = React.forwardRef<HTMLDivElement, VStackProps>( function VStack(
	{
		align = 'stretch',
		justify = 'start',
		isReverse = false,
		wrap = false,
		inline = false,
		spacing = 0,
		as = 'div',
		...other
	}, ref ) {

	const props = { as, isReverse, wrap, spacing, align, justify, inline, ...other };

	return <Stack { ...props } direction='column' ref={ ref }/>
} );

export default VStack;
