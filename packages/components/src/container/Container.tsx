import { Breakpoint, styled, SxProps } from '@yith/styles';
import React, { forwardRef } from 'react';

type ContainerProps = React.ComponentProps<'div'> & {
	maxWidth?: false | Breakpoint | number;
	sx?: SxProps;
};

type ContainerOwnserState = {
	maxWidth: false | Breakpoint | number;
};

type StyledContainerProps = { ownerState: ContainerOwnserState };

const ContainerRoot = styled( 'div', { name: 'Container', slot: 'Root' } )<StyledContainerProps>`
	${ ( { ownerState, theme } ) => {
	const { maxWidth } = ownerState;
	const style: any = {};

	if ( maxWidth !== false ) {
		if ( typeof maxWidth === 'string' && typeof theme.breakpoints.values[ maxWidth ] !== 'undefined' ) {
			style.maxWidth = theme.breakpoints.values[ maxWidth ] + theme.breakpoints.unit;
		} else {
			style.maxWidth = maxWidth;
		}
	}
	return style;
} }
`;

const Container = forwardRef<HTMLDivElement, ContainerProps>( function Container(
	{ children, maxWidth = false, ...props },
	ref
) {
	const ownerState: ContainerOwnserState = { maxWidth };

	return (
		<ContainerRoot { ...props } ownerState={ ownerState } ref={ ref }>
			{ children }
		</ContainerRoot>
	);
} );

export default Container;
