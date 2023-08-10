import { generateComponentClasses, styled } from '@yith/styles';
import { capitalize, noop } from 'lodash';
import React from 'react';
import { forwardRef, useState } from 'react';
import type { InputOwnerState, InputProps, InputStyled } from "./types";
import classNames from "classnames";

const useComponentClasses = ( ownerState: InputOwnerState ) => {
	return generateComponentClasses(
		'Input',
		{
			root: [
				'root',
				`--${ ownerState.variant }`,
				`--size${ capitalize( ownerState.size ) }`,
				ownerState.isFocused && 'focused',
				ownerState.disabled && 'disabled',
				ownerState.isMini && '--mini',
				ownerState.hasStartAdornment && '--hasStartAdornment',
				ownerState.hasEndAdornment && '--hasEndAdornment',
			],
			field: [ 'field' ],
			backdrop: [ 'backdrop' ],
			startAdornment: [ 'startAdornment' ],
			endAdornment: [ 'endAdornment' ],
		}
	)
}

const splitPadding = ( padding: React.CSSProperties[ 'padding' ] ) => {
	const sPadding = padding?.toString().split( ' ' );
	const length = sPadding?.length;

	if ( !length ) {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		};
	}

	return {
		top: sPadding[ 0 ],
		right: sPadding[ 1 ] ?? sPadding[ 0 ],
		bottom: sPadding[ 2 ] ?? sPadding[ 0 ],
		left: sPadding[ 3 ] ?? sPadding[ 1 ] ?? sPadding[ 0 ],
	};
};

const RESET_STYLES: React.CSSProperties = {
	// @ts-ignore
	appearance: 'none !important',
	display: 'block !important',
	width: '100% !important',
	minWidth: '0 !important',
	backgroundColor: 'transparent !important',
	// @ts-ignore
	boxSizing: 'border-box !important',
	border: '1px solid transparent !important',
	color: 'inherit !important',
	margin: '0 !important',
	outline: 'none !important',
	height: 'auto !important',
	lineHeight: '1.5em !important',
	boxShadow: 'none !important',
	'&[type=number]::-webkit-inner-spin-button': {
		opacity: 0
	},
	'&[type=number]:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-inner-spin-button': {
		opacity: 1
	}
};

const InputRoot = styled( 'div', { name: 'Input', slot: 'Root' } )<InputStyled>( ( { theme, ownerState } ) => {
	const { isMini, hasStartAdornment, hasEndAdornment, fullWidth } = ownerState;
	const style: React.CSSProperties = {
		borderRadius: theme.fields.borderRadius,
		fontSize: theme.fields.fontSize,
		textAlign: 'start',
		background: 'transparent',
		color: theme.fields.color,
		width: !isMini && fullWidth ? '100%' : 'fit-content',
		flex: !isMini && fullWidth ? '1 1 0%' : '0 1 0%',
	};
	const padding = splitPadding( theme.fields.padding[ ownerState.size ] );

	if ( hasStartAdornment ) {
		style.paddingLeft = padding.left;
	}
	if ( hasEndAdornment ) {
		style.paddingRight = padding.right;
	}

	return {
		display: 'inline-flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		position: 'relative',
		zIndex: 1,
		...style
	}
} );

const InputField = styled( 'input', { name: 'Input', slot: 'Field' } )<InputStyled>( ( { theme, ownerState } ) => {
	const { isMini, hasStartAdornment, hasEndAdornment, fullWidth } = ownerState;
	const padding = splitPadding( theme.fields.padding[ ownerState.size ] );

	if ( hasStartAdornment ) {
		padding.left = '0px';
	}
	if ( hasEndAdornment ) {
		padding.right = '0px';
	}

	const paddingProp = `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`;

	const minWidth = `calc(60px + ${ padding.right } + ${ padding.left })`;

	return {
		...RESET_STYLES,
		fontFamily: theme.fields.fontFamily + ' !important',
		padding: paddingProp + ' !important',
		fontSize: 'inherit' + ' !important',
		width: ( !isMini ? ( fullWidth ? '100%' : 'auto' ) : minWidth ) + ' !important',
		'&::placeholder': {
			color: theme.fields.placeholderColor
		},
		...( ownerState.disabled && {
			opacity: theme.palette.action.disabledOpacity,
		} )
	};
} );

const InputBackdrop = styled( 'div', { name: 'Input', slot: 'Backdrop' } )<InputStyled>`
	box-sizing: border-box;
	border-radius: inherit;
	inset: 0px;
	margin: 0;
	padding: 0;
	pointer-events: none;
	position: absolute;

	${ ( { theme, ownerState } ) => {
		const { isFocused, variant } = ownerState;

		const style: React.CSSProperties = {
			background: theme.fields.background,
			borderColor: theme.fields.borderColor,
			fontSize: theme.fields.fontSize,
			zIndex: -1
		};

		const variantStyles = {
			outlined: {
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: theme.fields.borderColor,
				...( isFocused && {
					borderColor: theme.fields.focusedBorderColor,
					boxShadow: theme.fields.focusedBoxShadow,
				} ),
			},
			ghost: {},
		}[ variant ];

		return { ...style, ...variantStyles };
	} }
`;

const InputStartAdornment = styled( 'div', { name: 'Input', slot: 'StartAdornment' } )( ( { theme } ) => ( {
	display: 'flex',
	alignItems: 'center',
	height: '0.01em',
	whiteSpace: 'nowrap',
	color: theme.palette.action.active,
	marginRight: '14px'
} ) );

const InputEndAdornment = styled( 'div', { name: 'Input', slot: 'EndAdornment' } )( ( { theme } ) => ( {
	display: 'flex',
	alignItems: 'center',
	height: '0.01em',
	whiteSpace: 'nowrap',
	color: theme.palette.action.active,
	marginLeft: '14px'
} ) );

/**
 * The Input component allows the user to enter text (or password, or numbers) into a UI.
 */
const Input = forwardRef<HTMLInputElement, InputProps>( function Input(
	{
		className,
		type = 'text',
		value,
		variant = 'outlined',
		onChange = noop,
		onFocus = noop,
		onBlur = noop,
		startAdornment,
		endAdornment,
		isMini = false,
		fullWidth = false,
		disabled = false,
		size = 'md',
		...other
	},
	ref
) {
	const [ isFocused, setIsFocused ] = useState( false );

	const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		if ( event.nativeEvent.defaultPrevented || disabled ) {
			return;
		}
		const newValue = event.target.value ?? '';
		onChange( event, newValue );
	};

	const ownerState: InputOwnerState = {
		variant,
		size,
		isFocused,
		isMini,
		fullWidth,
		disabled,
		hasStartAdornment: !!startAdornment,
		hasEndAdornment: !!endAdornment,
	};

	const classes = useComponentClasses( ownerState );

	return (
		<InputRoot ownerState={ ownerState } className={ classNames( className, classes.root ) }>
			{ !!startAdornment && <InputStartAdornment className={ classes.startAdornment }>{ startAdornment }</InputStartAdornment> }
			<InputField
				autoComplete="off"
				{ ...other }
				ref={ ref }
				type={ type }
				value={ value }
				onChange={ handleChange }
				onFocus={ ( e: React.FocusEvent<HTMLInputElement> ) => {
					setIsFocused( true );
					onFocus( e );
				} }
				onBlur={ ( e: React.FocusEvent<HTMLInputElement> ) => {
					setIsFocused( false );
					onFocus( e );
				} }
				ownerState={ ownerState }
				disabled={ disabled }
				className={ classes.field }
			/>
			{ !!endAdornment && <InputEndAdornment className={ classes.endAdornment }>{ endAdornment }</InputEndAdornment> }
			<InputBackdrop ownerState={ ownerState } className={ classes.backdrop }/>
		</InputRoot>
	);
} );


export default Input;
