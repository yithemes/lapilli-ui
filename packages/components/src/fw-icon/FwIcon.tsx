import { styled, SxProps } from '@yith/styles';
import classNames from 'classnames';
import React from 'react';
import { forwardRef } from 'react';

type GenericFontSize = 'sm' | 'md' | 'lg' | 'xl';

type FwIconOwnerState = {
	fontSize: React.CSSProperties[ 'fontSize' ];
}

type FwIconPropsWithRef = Omit<React.ComponentProps<'i'>, 'fontSize'> & {
	/**
	 * The font size.
	 */
	fontSize?: GenericFontSize | React.CSSProperties[ 'fontSize' ];
	/**
	 * The icon to be shown.
	 */
	icon: string;
	/**
	 * Sx theme props.
	 */
	sx?: SxProps;
};

type FwIconProps = Omit<FwIconPropsWithRef, 'ref'>

type FwIconStyledProps = { ownerState: FwIconOwnerState };

const sizes: Record<GenericFontSize, React.CSSProperties[ 'fontSize' ]> = {
	sm: '16px',
	md: '24px',
	lg: '32px',
	xl: '40px',
};

const FwIconRoot = styled( 'i', { name: 'FwIcon', slot: 'Root' } )<FwIconStyledProps>( ( { ownerState } ) => ( {
	display: 'inline-flex',
	fontSize: ownerState.fontSize
} ) );

const FwIcon = forwardRef<HTMLDivElement, FwIconProps>( function FwIcon(
	{
		className,
		icon,
		fontSize = 'inherit',
		...other
	},
	ref
) {
	const classes = classNames( 'yith-icon', `yith-icon-${ icon }`, className );
	const ownerState: FwIconOwnerState = {
		fontSize: sizes[ fontSize as GenericFontSize ] ?? fontSize
	};

	return <FwIconRoot { ...other } ref={ ref } className={ classes } ownerState={ ownerState } />;
} );

export default FwIcon;
