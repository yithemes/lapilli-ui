import React, { forwardRef } from "react";
import { styled } from "@yith/styles";

const ModalActionsRoot = styled( 'div', { name: 'ModalActions', slot: 'Root' } )(
	() => ( {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 24,
		flex: '0 0 auto',
		'& > :not(:first-of-type)': {
			marginLeft: 8,
		}
	} ) );

const ModalActions = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>( function ModalActions(
	{
		children,
		...other
	},
	ref
) {
	return <ModalActionsRoot ref={ ref } { ...other }>
		{ children }
	</ModalActionsRoot>
} );

export default ModalActions;