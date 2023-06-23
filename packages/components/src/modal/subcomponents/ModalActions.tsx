import { forwardRef } from "react";
import { styled } from "@yith/styles";
import type { ModalActionsProps } from "../types";

const ModalActionsRoot = styled( 'div', { name: 'ModalActions', slot: 'Root' } )(
	() => ( {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 20,
		flex: '0 0 auto',
		'& > :not(:first-of-type)': {
			marginLeft: 8,
		}
	} ) );

const ModalActions = forwardRef<HTMLDivElement, ModalActionsProps>( function ModalActions(
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