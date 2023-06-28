import React from "react";
import type { StackProps } from "../stack/types";
import Stack from "../stack";

type HStackProps = Omit<StackProps<'div'>, 'direction'>;

/**
 * Let's create a horizontal stacked layout by using the HStack component. It uses the flexbox layout.
 */
const HStack = React.forwardRef<HTMLDivElement, HStackProps>( function HStack(
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

	return <Stack { ...props } direction='row' ref={ ref }/>
} );

export default HStack;
