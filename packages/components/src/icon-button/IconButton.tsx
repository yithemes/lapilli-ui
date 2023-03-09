import { alpha, FieldSize, PaletteClass, styled, SxProps } from '@yith/styles';
import React, { forwardRef } from 'react';

type IconButtonOwnerState = {
	/**
	 * The color of the icon button.
	 */
	color: 'default' | 'inherit' | PaletteClass;
	/**
	 * Set the variant to change the style of the icon button.
	 */
	variant: 'ghost' | 'shadowed';
	/**
	 * The size.
	 */
	size: FieldSize;
	/**
	 * The font size.
	 */
	fontSize?: FieldSize | React.CSSProperties['fontSize'];
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type IconButtonOwnProps = Partial<IconButtonOwnerState>;
type IconButtonPropsWithRef = Omit<React.ComponentProps<'button'>, keyof IconButtonOwnProps> & IconButtonOwnProps;
type IconButtonProps = Omit<IconButtonPropsWithRef, 'ref'>;

type StyledIconButtonProps = {
	ownerState: IconButtonOwnerState;
};

const IconButtonRoot = styled( 'button', { name: 'IconButton', slot: 'Root' } )<StyledIconButtonProps>`
	${ ( { ownerState, theme } ) => {
	const { color, variant, size } = ownerState;

	let mainColor = theme.palette.action.active;
	if ( color !== 'default' && color !== 'inherit' ) {
		mainColor = theme.palette[ color ].main;
	}

	const padding = {
		sm: 9,
		md: 12,
		lg: 15,
		xl: 18,
	}[ size ];


	const fontSizeMapping = {
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
	};
	const fontSize = fontSizeMapping[ ownerState.fontSize as FieldSize ] ?? ownerState.fontSize ?? fontSizeMapping[ size ];

	return {
		textAlign: 'center',
		flex: '0 0 auto',
		fontSize: fontSize,
		padding: padding,
		border: 0,
		borderRadius: '50%',
		cursor: 'pointer',
		lineHeight: 0,
		color: 'inherit' !== color ? mainColor : color,
		background: 'transparent',
		boxShadow: `0 0 0 8px ${ alpha( mainColor, 0 ) }`,
		transition: 'background .3s ease-in-out, box-shadow .3s ease-in-out',
		'&:disabled': {
			pointerEvents: 'none',
			opacity: theme.palette.action.disabledOpacity
		},
		...( variant === 'ghost' && {
			'&:hover': {
				background: alpha( mainColor, theme.palette.action.hoverOpacity ),
				boxShadow: `0 0 0 0px ${ alpha( mainColor, theme.palette.action.hoverOpacity ) }`,
			},
			'&:focus-visible': {
				border: 0,
				outline: 0,
				boxShadow: '0 0 0 3px ' + alpha( mainColor, theme.palette.action.focusOpacity ),
			},
		} ),
		...( variant === 'shadowed' && {
			background: theme.palette.background.default,
			boxShadow: `0 2px 7px 0 rgba(170,198,222, .5)`,
			'&:hover': {
				boxShadow: `0 3px 10px 0 rgba(170,198,222, .6)`,
			},
			'&:focus-visible': {
				border: 0,
				outline: 0,
				boxShadow: '0 3px 12px 0 rgba(170,198,222, .6), 0 0 0 3px rgba(170,198,222, .2)',
			},
		} ),

	};
} }
`;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>( function IconButton(
	{
		type = 'button',
		color = 'default',
		variant = 'ghost',
		size = 'md',
		fontSize,
		children,
		...other
	},
	ref ) {
	const ownerState: IconButtonOwnerState = { color, variant, size, fontSize };
	return (
		<IconButtonRoot type={ type } ref={ ref } ownerState={ ownerState } { ...other }>
			{ children }
		</IconButtonRoot>
	);
} );

export default IconButton;
