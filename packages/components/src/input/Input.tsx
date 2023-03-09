import { FieldSize, styled, SxProps } from '@yith/styles';
import { noop } from 'lodash';
import React from 'react';
import { forwardRef, useState } from 'react';

type InputFieldVariant = 'outlined' | 'ghost';

type TextFieldProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'size'> & {
	/**
	 * Type of the input element to render.
	 */
	type?: 'text' | 'email' | 'password';
	/**
	 * The value of the field
	 */
	value?: string;
	/**
	 * Specified the input style.
	 */
	variant?: InputFieldVariant;
	/**
	 * Callback fired when the input value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: string ) => void;
	/**
	 * If provided, displays the adornment at the start position inside the input field.
	 */
	startAdornment?: React.ReactNode;
	/**
	 * If provided, displays the adornment at the end position inside the input field.
	 */
	endAdornment?: React.ReactNode;
	/**
	 * Set to `true` to show a mini field (useful for small number fields).
	 */
	isMini?: never;
	/**
	 * Set to `true` to make the input field get the full width.
	 */
	fullWidth?: boolean;
	/**
	 * The field size.
	 */
	size?: FieldSize;
	/**
	 * Sx theme props.
	 */
	sx?: SxProps;
};


type NumberFieldProps = Omit<TextFieldProps, 'type' | 'isMini' | 'value'> & {
	type: 'number'
	isMini?: boolean
	value?: string | number
};

type InputOwnPropsWithRef = TextFieldProps | NumberFieldProps;
type InputOwnProps = Omit<InputOwnPropsWithRef, 'ref'>;

type InputOwnerState = {
	variant: InputFieldVariant;
	size: FieldSize;
	isFocused: boolean;
	isMini: boolean;
	fullWidth: boolean;
	hasStartAdornment: boolean;
	hasEndAdornment: boolean;
};

type StyledInputProps = { ownerState: InputOwnerState };

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
	fontFamily: 'inherit !important',
	margin: '0 !important',
	outline: 'none !important',
	height: 'auto !important',
	lineHeight: '1.5em !important',
	boxShadow: 'none !important'
};

const InputRoot = styled( 'div', {
	name: 'Input',
	slot: 'Root',
} )<StyledInputProps>( ( { theme, ownerState } ) => {
	const { isMini, hasStartAdornment, hasEndAdornment, fullWidth } = ownerState;
	const style: React.CSSProperties = {
		borderRadius: theme.fields.borderRadius,
		fontSize: theme.fields.fontSize,
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

const InputField = styled( 'input', {
	name: 'Input',
	slot: 'Field',
} )<StyledInputProps>( ( { theme, ownerState } ) => {
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
		padding: paddingProp + ' !important',
		fontSize: 'inherit' + ' !important',
		width: ( !isMini ? ( fullWidth ? '100%' : 'auto' ) : minWidth ) + ' !important',
		'&::placeholder': {
			color: theme.fields.placeholderColor
		}
	};
} );

const InputBackdrop = styled( 'div', { name: 'Input', slot: 'Backdrop' } )<StyledInputProps>`
	box-sizing: border-box;
	border-radius: inherit;
	inset: 0px;
	margin: 0px;
	padding: 0px;
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

type InputAdornmentOwnerState = {
	position: 'start' | 'end';
};

const InputAdornment = styled( 'div', { name: 'Input', slot: 'Adornment' } )<{ ownerState: InputAdornmentOwnerState }>`
	display: flex;
	align-items: center;
	height: 0.01em;
	white-space: no-wrap;
	${ ( { theme, ownerState } ) => {
	const { position } = ownerState;

	return {
		[ `margin${ 'start' === position ? 'Right' : 'Left' }` ]: '14px',
		color: theme.palette.action.active,
	};
} }
`;

const Input = forwardRef<HTMLInputElement, InputOwnProps>( function Input(
	{
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
		size = 'md',
		...other
	},
	ref
) {
	const [ isFocused, setIsFocused ] = useState( false );

	const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		if ( event.nativeEvent.defaultPrevented ) {
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
		hasStartAdornment: !!startAdornment,
		hasEndAdornment: !!endAdornment,
	};

	return (
		<InputRoot ownerState={ ownerState }>
			{ !!startAdornment && <InputAdornment ownerState={ { position: 'start' } }>{ startAdornment }</InputAdornment> }
			<InputField
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
				autoComplete="off"
				ownerState={ ownerState }
				{ ...other }
			/>
			{ !!endAdornment && <InputAdornment ownerState={ { position: 'end' } }>{ endAdornment }</InputAdornment> }
			<InputBackdrop ownerState={ ownerState }/>
		</InputRoot>
	);
} );


export default Input;
