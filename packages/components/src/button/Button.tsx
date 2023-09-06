import { alpha, FieldSize, generateComponentClasses, styled } from '@lapilli-ui/styles';
import { capitalize } from 'lodash';
import React, { forwardRef } from 'react';
import classNames from "classnames";

import type { ButtonOwnerState, ButtonProps, ButtonStyled } from "./types";

const useComponentClasses = ( ownerState: ButtonOwnerState ) => {
	return generateComponentClasses(
		'Button',
		{
			root: [ 'root', `--${ ownerState.variant }`, `--size${ capitalize( ownerState.size ) }`, `--color${ capitalize( ownerState.color ) }` ],
			startIcon: [ 'startIcon' ],
			endIcon: [ 'endIcon' ],
		}
	)
}

type ButtonSpacing = {
	horizontal: number,
	vertical: number
}

const getSpacing = ( ownerState: ButtonOwnerState ): ButtonSpacing => {
	const SPACINGS: Record<FieldSize, ButtonSpacing> = {
		sm: { horizontal: ownerState.short ? 12 : 20, vertical: 4.5 },
		md: { horizontal: ownerState.short ? 16 : 32, vertical: 8.5 },
		lg: { horizontal: ownerState.short ? 20 : 40, vertical: 12.5 },
		xl: { horizontal: ownerState.short ? 24 : 48, vertical: 16.5 },
	}

	return SPACINGS[ ownerState.size ];
}

const getPadding = ( ownerState: ButtonOwnerState ): React.CSSProperties['padding'] => {
	const spacing = getSpacing( ownerState );

	return `${ spacing.vertical }px ${ spacing.horizontal }px`
}

const ButtonRoot = styled( 'button', { name: 'Button', slot: 'Root' } )<ButtonStyled>( ( { ownerState, theme } ) => ( {
	display: 'inline-flex',
	alignItems: 'center',
	border: 0,
	cursor: 'pointer',
	lineHeight: 1.5,
	fontSize: theme.fields.fontSize,
	fontFamily: theme.fields.fontFamily,
	borderRadius: theme.fields.borderRadius,
	padding: getPadding( ownerState ),
	fontWeight: 600,
	transition: 'all .3s ease-in-out',
	textDecoration: 'none',
	whiteSpace: 'nowrap',
	justifyContent: 'center',
	outline: 0,
	...( ownerState.fullWidth && {
		width: '100%'
	} ),
	'&:focus-visible': {
		boxShadow: '0 0 0 3px ' + alpha( theme.palette[ ownerState.color ].main ?? '#ffffff', 0.15 ),
	},
	...( ownerState.variant === 'contained' && {
		background: theme.palette[ ownerState.color ].main,
		border: `1px solid rgba(255,255,255,0)`,
		color: theme.palette[ ownerState.color ].contrastText,
		...( !ownerState.disabled && {
			'&:hover': {
				background: theme.palette[ ownerState.color ].light,
			}
		} )
	} ),
	...( ownerState.variant === 'outlined' && {
		background: 'rgba(255,255,255,0)',
		border: `1px solid ${ alpha( theme.palette[ ownerState.color ].main ?? '', 0.7 ) }`,
		color: theme.palette[ ownerState.color ].main,
		...( !ownerState.disabled && {
			'&:hover': {
				background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.04 ),
				borderColor: theme.palette[ ownerState.color ].main,
			}
		} )
	} ),
	...( ownerState.variant === 'text' && {
		background: 'rgba(255,255,255,0)',
		border: `1px solid rgba(255,255,255,0)`,
		color: theme.palette[ ownerState.color ].main,
		...( !ownerState.disabled && {
			'&:hover': {
				background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.04 ),
			},
		} )
	} ),
	...( ownerState.variant === 'dashed' && {
		background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.05 ),
		border: `1px dashed ${ alpha( theme.palette[ ownerState.color ].main ?? '', 0.8 ) }`,
		color: alpha( theme.palette[ ownerState.color ].main ?? '', 0.9 ),
		...( !ownerState.disabled && {
			'&:hover': {
				color: theme.palette[ ownerState.color ].main,
				borderColor: theme.palette[ ownerState.color ].main,
				background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.1 ),
			},
		} )
	} ),
	...( ownerState.disabled && {
		opacity: theme.palette.action.disabledOpacity,
		cursor: 'not-allowed'
	} )
} ) );

const commonIconStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '0.01em',
	fontSize: '1.3em',
	lineHeight: 0,
}

const ButtonStartIcon = styled( 'span', { name: 'Button', slot: 'StartIcon' } )<ButtonStyled>( ( { ownerState } ) => ( {
	...commonIconStyle,
	marginRight: getSpacing( ownerState ).horizontal / 2,
	marginLeft: -( getSpacing( ownerState ).horizontal / 2 - 5 ),
} ) );
const ButtonEndIcon = styled( 'span', { name: 'Button', slot: 'EndIcon' } )<ButtonStyled>( ( { ownerState } ) => ( {
	...commonIconStyle,
	marginLeft: getSpacing( ownerState ).horizontal / 2,
	marginRight: -( getSpacing( ownerState ).horizontal / 2 - 5 ),
} ) );

/**
 * Lets users take actions and make choices with a single click or tap through the Button component.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{
			className,
			type = 'button',
			variant = 'contained',
			color = 'primary',
			size = 'md',
			fullWidth = false,
			short = false,
			disabled = false,
			startIcon,
			endIcon,
			children,
			...props
		},
		ref
	) {
		const ownerState: ButtonOwnerState = { variant, color, size, fullWidth, short, disabled };
		const classes = useComponentClasses( ownerState );
		return (
			<ButtonRoot
				ref={ ref }
				type={ type }
				ownerState={ ownerState }
				{ ...props }
				onMouseLeave={ ( e: React.MouseEvent ) => e.preventDefault() }
				className={ classNames( classes.root, className ) }
				disabled={ disabled }
			>
				{ !!startIcon && <ButtonStartIcon ownerState={ ownerState } className={ classes.startIcon }>{ startIcon }</ButtonStartIcon> }
				{ children }
				{ !!endIcon && <ButtonEndIcon ownerState={ ownerState } className={ classes.endIcon }>{ endIcon }</ButtonEndIcon> }
			</ButtonRoot>
		);
	}
);

export default Button;
