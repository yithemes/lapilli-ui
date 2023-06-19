import { alpha, FieldSize, generateComponentClasses, PaletteClass, styled, SxProps } from '@yith/styles';
import React, { forwardRef } from 'react';
import { capitalize } from "lodash";
import classNames from "classnames";

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
	 * The padding of the field. Useful in combination with adaptiveSizing.
	 */
	padding?: React.CSSProperties['padding'];
	/**
	 * Set to `true` to adapt the sizing based on the contained icon and padding.
	 */
	adaptiveSizing: boolean;
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

const useComponentClasses = ( ownerState: IconButtonOwnerState ) => {
	return generateComponentClasses(
		'IconButton',
		{
			root: [
				'root',
				`--${ ownerState.variant }`,
				`--color${ capitalize( ownerState.color ) }`,
				`--size${ capitalize( ownerState.size ) }`,
				ownerState.adaptiveSizing && '--adaptiveSizing',
			]
		}
	)
}

const IconButtonRoot = styled( 'button', { name: 'IconButton', slot: 'Root' } )<StyledIconButtonProps>`
	${ ( { ownerState, theme } ) => {
		const { color, variant, size } = ownerState;

		let mainColor = theme.palette.action.active;
		if ( color !== 'default' && color !== 'inherit' ) {
			mainColor = theme.palette[ color ].main;
		}

		const outerSize = {
			sm: 32,
			md: 40,
			lg: 48,
			xl: 56
		}

		const fontSizeMapping = {
			sm: 16,
			md: 18,
			lg: 22,
			xl: 24,
		};

		const paddingMapping = {
			sm: ( outerSize.sm - fontSizeMapping.sm ) / 2,
			md: ( outerSize.md - fontSizeMapping.md ) / 2,
			lg: ( outerSize.lg - fontSizeMapping.lg ) / 2,
			xl: ( outerSize.xl - fontSizeMapping.xl ) / 2,
		};

		const padding = ownerState.padding ?? paddingMapping[ size ];
		const fontSize = fontSizeMapping[ ownerState.fontSize as FieldSize ] ?? ownerState.fontSize ?? fontSizeMapping[ size ];

		return {
			textAlign: 'center',
			flex: '0 0 auto',
			fontSize: fontSize,
			width: outerSize[ size ],
			height: outerSize[ size ],
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
			...( ownerState.adaptiveSizing && {
				padding: padding,
				width: 'auto',
				height: 'auto'
			} ),
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

/**
 * The IconButton is a simple button containing an icon.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>( function IconButton(
	{
		type = 'button',
		color = 'default',
		variant = 'ghost',
		size = 'md',
		adaptiveSizing = false,
		fontSize,
		padding,
		className,
		children,
		...other
	},
	ref ) {

	const ownerState: IconButtonOwnerState = { color, variant, size, fontSize, adaptiveSizing, padding };
	const classes = useComponentClasses( ownerState );

	return (
		<IconButtonRoot { ...other } type={ type } ref={ ref } ownerState={ ownerState } className={ classNames( className, classes.root ) }>
			{ children }
		</IconButtonRoot>
	);
} );

export default IconButton;
