import React from 'react';

import { breakpointStylize, css, ResponsiveStyleValue, styled } from '@yith/styles';
import type { SxProps } from '@yith/styles';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackOwnerState = {
	direction: ResponsiveStyleValue<Direction>;
	spacing: ResponsiveStyleValue<number | string>;
	alignItems: React.CSSProperties[ 'alignItems' ];
	justifyContent: React.CSSProperties[ 'justifyContent' ];
};

type StackOwnProps<C extends React.ElementType> = {
	as?: C;
	children?: React.ReactNode;
	sx?: SxProps;
} & Partial<StackOwnerState>;

type StackPropsWithRef<C extends React.ElementType> = StackOwnProps<C> & Omit<React.ComponentProps<C>, keyof StackOwnProps<C>>;
type StackProps<C extends React.ElementType> = Omit<StackPropsWithRef<C>, 'ref'>;

type StyledStackProps = {
	ownerState: StackOwnerState
};

const StackRoot = styled( 'div', { name: 'Stack', slot: 'Root' } )<StyledStackProps>( ( { ownerState, theme } ) => {
	const { direction, spacing, alignItems, justifyContent } = ownerState;

	const styles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems,
		justifyContent,
		...( breakpointStylize( theme, direction, ( value ) => ( { flexDirection: value } ) ) ),
		...( breakpointStylize( theme, spacing, ( value ) => ( { gap: theme.spacing( value ) } ) ) ),
	};

	return css( styles );
} );

const Stack = React.forwardRef<HTMLDivElement, StackProps<'div'>>( function Stack(
	props,
	ref
) {
	const {
		as = 'div',
		direction = 'column',
		spacing = 0,
		alignItems = 'stretch',
		justifyContent = 'flex-start',
		children,
		...others
	} = props;
	const ownerState = {
		direction,
		spacing,
		alignItems,
		justifyContent,
	};

	return (
		<StackRoot as={ as } ownerState={ ownerState } ref={ ref } { ...others }>
			{ children }
		</StackRoot>
	);
} );

export default Stack;
