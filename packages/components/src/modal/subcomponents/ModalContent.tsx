import React, { forwardRef } from "react";
import { generateComponentClasses, styled } from "@lapilli-ui/styles";
import classNames from "classnames";
import { modalTitleClasses } from "./ModalTitle";
import type { ModalContentProps } from "../types";

export const modalContentClasses = generateComponentClasses(
	'ModalContent',
	{
		root: [ 'root' ]
	}
);

const ModalContentRoot = styled( 'div', { name: 'ModalContent', slot: 'Root' } )(
	() => ( {
		flex: '1 1 auto',
		overflowY: 'auto',
		padding: 24,
		[ `.${ modalTitleClasses.root } + &` ]: {
			paddingTop: 0
		}
	} ) );

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>( function ModalContent(
	{
		className,
		children,
		...other
	},
	ref
) {
	return <ModalContentRoot ref={ ref } className={ classNames( modalContentClasses.root, className ) } { ...other }>
		{ children }
	</ModalContentRoot>
} );

export default ModalContent;