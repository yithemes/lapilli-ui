import React, { forwardRef } from "react";
import { generateComponentClasses, styled } from "@yith/styles";
import classNames from "classnames";
import { modalTitleClasses } from "./ModalTitle";

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

const ModalContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>( function ModalContent(
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