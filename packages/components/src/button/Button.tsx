import { alpha, FieldSize, generateComponentClasses, PaletteClass, styled } from '@yith/styles';
import { capitalize } from 'lodash';
import React, { forwardRef } from 'react';
import classNames from "classnames";

type ButtonOwnerState = {
	/**
	 * The variant style of the button.
	 */
	variant: 'contained' | 'outlined' | 'text' | 'dashed';
	/**
	 * The color.
	 */
	color: PaletteClass;
	/**
	 * The size.
	 */
	size: FieldSize;
	/**
	 * If `true` the button will take the full width of its container.
	 */
	fullWidth: boolean
	/**
	 * If `true` the button will be shown shortened.
	 */
	short: boolean
};

export type ButtonProps = Omit<React.ComponentProps<'button'>, keyof ButtonOwnerState> &
	Partial<ButtonOwnerState> & {
	/**
	 * If provided, it renders an icon element inside the button on the left.
	 */
	startIcon?: React.ReactNode;
	/**
	 * If provided, it renders an icon element inside the button on the right.
	 */
	endIcon?: React.ReactNode;
};

type StyledButtonProps = {
	ownerState: ButtonOwnerState
};

type ButtonSpacing = {
	horizontal: number,
	vertical: number
}

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

const getSpacing = ( ownerState: ButtonOwnerState ): ButtonSpacing => {
	const SPACINGS: Record<FieldSize, ButtonSpacing> = {
		sm: { horizontal: ownerState.short ? 6 : 20, vertical: 4.5 },
		md: { horizontal: ownerState.short ? 10 : 32, vertical: 8.5 },
		lg: { horizontal: ownerState.short ? 15 : 40, vertical: 12.5 },
		xl: { horizontal: ownerState.short ? 20 : 48, vertical: 16.5 },
	}

	return SPACINGS[ ownerState.size ];
}

const getPadding = ( ownerState: ButtonOwnerState ): React.CSSProperties['padding'] => {
	const spacing = getSpacing( ownerState );

	return `${ spacing.vertical }px ${ spacing.horizontal }px`
}

const ButtonRoot = styled( 'button', { name: 'Button', slot: 'Root' } )<StyledButtonProps>( ( { ownerState, theme } ) => ( {
	display: 'inline-flex',
	alignItems: 'center',
	border: 0,
	cursor: 'pointer',
	lineHeight: 1.5,
	fontSize: theme.fields.fontSize,
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
	'&:focus': {
		boxShadow: '0 0 0 3px ' + alpha( theme.palette[ ownerState.color ].main ?? '#ffffff', 0.15 ),
	},
	...( ownerState.variant === 'contained' && {
		background: theme.palette[ ownerState.color ].main,
		border: `1px solid rgba(255,255,255,0)`,
		color: theme.palette[ ownerState.color ].contrastText,
		'&:hover': {
			background: theme.palette[ ownerState.color ].light,
		}
	} ),
	...( ownerState.variant === 'outlined' && {
		background: 'rgba(255,255,255,0)',
		border: `1px solid ${ alpha( theme.palette[ ownerState.color ].main ?? '', 0.7 ) }`,
		color: theme.palette[ ownerState.color ].main,
		'&:hover': {
			background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.04 ),
			borderColor: theme.palette[ ownerState.color ].main,
		},
	} ),
	...( ownerState.variant === 'text' && {
		background: 'rgba(255,255,255,0)',
		border: `1px solid rgba(255,255,255,0)`,
		color: theme.palette[ ownerState.color ].main,
		'&:hover': {
			background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.04 ),
		},
	} ),
	...( ownerState.variant === 'dashed' && {
		background: alpha( theme.palette[ ownerState.color ].main ?? '', 0.05 ),
		border: `1px dashed ${ alpha( theme.palette[ ownerState.color ].main ?? '', 0.7 ) }`,
		color: alpha( theme.palette[ ownerState.color ].main ?? '', 0.8 ),
		'&:hover': {
			color: theme.palette[ ownerState.color ].main,
			borderColor: theme.palette[ ownerState.color ].main,
		},
	} ),
} ) );

const ButtonStartIcon = styled( 'span', { name: 'Button', slot: 'StartIcon' } )( ( { ownerState }: StyledButtonProps ) => ( {
	lineHeight: 0,
	marginRight: getSpacing( ownerState ).horizontal / 2,
	marginLeft: -( getSpacing( ownerState ).horizontal / 2 - 5 ),
} ) );
const ButtonEndIcon = styled( 'span', { name: 'Button', slot: 'EndIcon' } )( ( { ownerState }: StyledButtonProps ) => ( {
	lineHeight: 0,
	marginLeft: getSpacing( ownerState ).horizontal / 2,
	marginRight: -( getSpacing( ownerState ).horizontal / 2 - 5 )
} ) );

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
			startIcon,
			endIcon,
			children,
			...props
		},
		ref
	) {
		const ownerState: ButtonOwnerState = { variant, color, size, fullWidth, short };
		const classes = useComponentClasses( ownerState );
		return (
			<ButtonRoot
				ref={ ref }
				type={ type }
				ownerState={ ownerState }
				{ ...props }
				onMouseLeave={ ( e: React.MouseEvent ) => e.preventDefault() }
				className={ classNames( classes.root, className ) }
			>
				{ !!startIcon && <ButtonStartIcon ownerState={ ownerState } className={ classes.startIcon }>{ startIcon }</ButtonStartIcon> }
				{ children }
				{ !!endIcon && <ButtonEndIcon ownerState={ ownerState } className={ classes.endIcon }>{ endIcon }</ButtonEndIcon> }
			</ButtonRoot>
		);
	}
);

export default Button;
