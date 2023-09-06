import React, { forwardRef } from "react";
import { generateComponentClasses, styled } from "@lapilli-ui/styles";
import Typography, { TypographyProps } from "../../typography";
import classNames from "classnames";

export const modalTitleClasses = generateComponentClasses(
	'ModalTitle',
	{
		root: [ 'root' ]
	}
);

const ModalTitleRoot = styled( Typography, { name: 'ModalTitle', slot: 'Root' } )(
	() => ( {
		padding: '20px 24px',
		margin: 0
	} ) );

const ModalTitle = forwardRef<HTMLDivElement, TypographyProps>( function ModalTitle(
	{
		className,
		children,
		...other
	},
	ref
) {
	return <ModalTitleRoot
		component="h2"
		variant="h5"
		{ ...other }
		ref={ ref }
		className={ classNames( modalTitleClasses.root, className ) }
	>
		{ children }
	</ModalTitleRoot>
} );

export default ModalTitle;