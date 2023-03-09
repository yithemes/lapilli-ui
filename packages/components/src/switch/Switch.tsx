import { noop } from 'lodash';
import { forwardRef, useState } from 'react';

import { FieldSize, PaletteClass, styled } from '@yith/styles';
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { useControlledState, ZeroWidthSpace } from "../utils";
import React from 'react';

interface SwitchProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'type' | 'checked' | 'size'> {
	/**
	 * Choose if the field containing the value should be
	 */
	type?: 'checkbox' | 'hidden'
	/**
	 * The color.
	 */
	color?: PaletteClass
	/**
	 * Set the checked status of the Switch component. Leave it empty to use a non-controlled component.
	 */
	checked?: boolean
	/**
	 * Callback fired when the value changes.
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: boolean ) => void
	/**
	 * The field size.
	 */
	size?: FieldSize;
}

type SwitchOwnerState = {
	isChecked: boolean
	isFocused: boolean
	color: PaletteClass,
	size: FieldSize
};


type StyledSwitchProps = { ownerState: SwitchOwnerState };

const SwitchRoot = styled( 'span', { name: 'Switch', slot: 'Root' } )<StyledSwitchProps>`
	display: inline-block;
	cursor: pointer;
	position: relative;
	transition: all 0.3s;
	box-sizing: border-box;
	user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-o-user-select: none;

	${ ( { ownerState, theme } ) => {
	const { size, color, isChecked, isFocused } = ownerState;
	const background = !isChecked ? ( 'light' === theme.mode ? theme.palette.grey[ 200 ] : theme.palette.grey[ 600 ] ) : theme.palette[ color ].main;
	const foreground = !isChecked ? theme.palette.grey[ 500 ] : theme.palette[ color ].main;
	const focusedShadowColor = theme.palette[ color ].main;
	return {
		background: background,
		color: foreground,
		width: 44,
		height: 24,
		borderRadius: 24,
		lineHeight: '20px',
		border: '2px solid #0000',
		boxShadow: '0 0 0 0 rgba(0,0,0,0)',
		...( size === 'sm' && {
			width: 36,
			height: 20,
			borderRadius: 20,
			lineHeight: '16px',
		} ),
		...( size === 'lg' && {
			width: 52,
			height: 28,
			borderRadius: 28,
			lineHeight: '24px',
		} ),
		...( size === 'xl' && {
			width: 60,
			height: 32,
			borderRadius: 32,
			lineHeight: '28px',
		} ),

		...( isFocused && {
			boxShadow: `0 0 0px 2px ${ theme.palette.background.default }, 0 0 0px 4px ${ focusedShadowColor }`
		} )
	};
} }
`;
const SwitchField = styled( 'input', { name: 'Switch', slot: 'Field' } )`
	position: absolute !important;
	opacity: 0 !important;
	margin: 0 !important;
	padding: 0 !important;
	left: 0 !important;
	top: 0 !important;
	width: 100% !important;
	height: 100% !important;
	cursor: inherit !important;
	z-index: 1 !important;
`;
const SwitchThumb = styled( 'span', { name: 'Switch', slot: 'Thumb' } )( ( { ownerState }: StyledSwitchProps ) => ( {
	background: '#fff',
	borderRadius: '50%',
	position: 'absolute',
	transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '10px',
	width: 20,
	height: 20,
	top: 0,
	left: !ownerState.isChecked ? 0 : 20,
	boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
	...( ownerState.size === 'sm' && {
		width: 16,
		height: 16,
		left: !ownerState.isChecked ? 0 : 16,
		fontSize: '8px',
	} ),
	...( ownerState.size === 'lg' && {
		width: 24,
		height: 24,
		left: !ownerState.isChecked ? 0 : 24,
		fontSize: '12px',
	} ),
	...( ownerState.size === 'xl' && {
		width: 28,
		height: 28,
		top: 0,
		left: !ownerState.isChecked ? 0 : 28,
		fontSize: '14px',
	} ),
	'& > svg': {
		width: '1em',
		strokeWidth: 2,
		stroke: 'currentColor'
	}
} ) );

const Switch = forwardRef<HTMLInputElement, SwitchProps>( function Switch(
	{
		type = 'checkbox',
		color = 'primary',
		checked: checkedProp,
		onChange = noop,
		className,
		name,
		onFocus = noop,
		onBlur = noop,
		size = 'md',
		...other
	}: SwitchProps,
	ref
) {
	const [ isChecked, setIsChecked ] = useControlledState( checkedProp, false );
	const [ isFocused, setIsFocused ] = useState( false );

	const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		if ( event.nativeEvent.defaultPrevented ) {
			return;
		}

		const newChecked = event.target.checked;
		setIsChecked( newChecked );

		onChange( event, newChecked );
	};

	const handleFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( true );
		onFocus( e );
	};

	const handleBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( false );
		onBlur( e );
	};

	const ownerState: SwitchOwnerState = {
		isChecked,
		isFocused,
		color,
		size
	};

	const IconComponent = isChecked ? CheckIcon : XMarkIcon;

	return (
		<SwitchRoot
			className={ className }
			ownerState={ ownerState }
		>
			<SwitchField
				ref={ ref }
				type="checkbox"
				checked={ isChecked }
				{ ...other }
				onChange={ handleChange }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				readOnly
				role="switch"
				tabIndex={ 0 }
				aria-checked={ isChecked }
				name={ 'checkbox' === type ? name : '' }
			/>
			{ 'hidden' === type && <input type="hidden" value={ isChecked ? 'yes' : 'no' } name={ name }/> }
			<SwitchThumb ownerState={ ownerState }>
				<IconComponent/>
			</SwitchThumb>
			<ZeroWidthSpace/>
		</SwitchRoot>
	);
} );

export default Switch;