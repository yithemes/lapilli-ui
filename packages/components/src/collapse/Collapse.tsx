import { styled } from '@yith/styles';
import React, { forwardRef } from 'react';
import { motion } from "framer-motion";

import type { CollapseProps } from "./types";

const CollapseRoot = styled( motion.div, { name: 'Collapse', slot: 'Root' } )``;

const Collapse = forwardRef<HTMLDivElement, CollapseProps>( function Collapse(
	{
		children,
		open = false,
		orientation = 'vertical',
		collapsedSize = 0,
		...props
	},
	ref
) {

	const property = 'vertical' === orientation ? 'height' : 'width';
	const oppositeProperty = 'vertical' === orientation ? 'width' : 'height';

	return <CollapseRoot
		ref={ ref }
		animate={ open ? 'open' : 'collapsed' }
		initial={ open ? 'open' : 'collapsed' }
		variants={ {
			open: { [ property ]: 'auto', [ oppositeProperty ]: 'auto', transitionEnd: { overflow: 'visible' } },
			collapsed: { [ property ]: collapsedSize, [ oppositeProperty ]: 'auto', overflow: 'hidden' }
		} }
		transition={ {
			type: "tween",
			duration: 0.15,
			ease: "easeInOut"
		} }
		{ ...props }
	>
		{ children }
	</CollapseRoot>
} );

export default Collapse;
