import { capitalize } from 'lodash';
import { forwardRef, useState } from 'react';

import { generateComponentClasses, styled } from '@yith/styles';
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { useControlledState, ZeroWidthSpace } from "../utils";
import React from 'react';
import type { SwitchOwnerState, SwitchProps, SwitchStyled } from "./types";
import classNames from "classnames";

const useComponentClasses = ( ownerState: SwitchOwnerState ) => {
	return generateComponentClasses(
		'Switch',
		{
			root: [
				'root',
				`--size${ capitalize( ownerState.size ) }`,
				ownerState.checked && 'checked'
			],
			field: [ 'field' ],
			track: [ 'track' ],
			thumb: [ 'thumb' ],
		}
	)
}

const getPadding = ( ownerState: SwitchOwnerState ) => ownerState.noPadding ? 0 : 4

const getSizing = ( ownerState: SwitchOwnerState ) => {
	return {
		sm: { width: 36, height: 20 },
		md: { width: 44, height: 24 },
		lg: { width: 52, height: 28 },
		xl: { width: 60, height: 32 },
	}[ ownerState.size ];
}

const getSizingStyle = ( ownerState: SwitchOwnerState ) => {
	const sizing = getSizing( ownerState );

	return {
		width: sizing.width,
		minWidth: sizing.width,
		height: sizing.height,
		borderRadius: sizing.height,
		lineHeight: sizing.height + 'px',
	}
}

const SwitchRoot = styled( 'span', { name: 'Switch', slot: 'Root' } )<SwitchStyled>( ( { ownerState, theme } ) => ( {
	display: 'inline-block',
	cursor: 'pointer',
	position: 'relative',
	color: 'light' === theme.mode ? theme.palette.grey[ 500 ] : theme.palette.grey[ 600 ],
	padding: getPadding( ownerState ),
	boxSizing: 'content-box',
	...getSizingStyle( ownerState ),
	...( ownerState.checked && {
		color: theme.palette[ ownerState.color ].main,
	} ),
} ) );
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
const SwitchTrack = styled( 'span', { name: 'Switch', slot: 'Track' } )<SwitchStyled>( ( { ownerState, theme } ) => ( {
	display: 'block',
	cursor: 'pointer',
	position: 'absolute',
	transitionProperty: 'background, box-shadow',
	transitionDuration: '0.2s',
	transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
	boxSizing: 'border-box',
	userSelect: 'none',
	background: 'light' === theme.mode ? theme.palette.grey[ 200 ] : theme.palette.grey[ 800 ],
	border: '2px solid #0000',
	width: `calc(100% - ${ getPadding( ownerState ) * 2 }px)`,
	height: `calc(100% - ${ getPadding( ownerState ) * 2 }px)`,
	borderRadius: 'inherit',
	boxShadow: `0 0 0 0 ${ theme.palette[ ownerState.color ].main }`,
	...( ownerState.checked && {
		background: theme.palette[ ownerState.color ].main
	} ),
	...( ownerState.isFocused && {
		boxShadow: `0 0 0px 2px ${ theme.palette.background.default }, 0 0 0px 4px ${ theme.palette[ ownerState.color ].main }`
	} ),
	...( ownerState.disabled && {
		opacity: theme.palette.action.disabledOpacity,
		cursor: 'not-allowed'
	} )
} ) );
const SwitchThumb = styled( 'span', { name: 'Switch', slot: 'Thumb' } )<SwitchStyled>( ( { ownerState } ) => ( {
	background: '#fff',
	borderRadius: '50%',
	position: 'absolute',
	transition: 'transform .2s cubic-bezier(.4,0,.2,1)',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: `${ getSizing( ownerState ).height / 2 - 2 }px`,
	width: '2em',
	height: '2em',
	top: getPadding( ownerState ) + 2,
	left: getPadding( ownerState ) + 2,
	boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
	...( ownerState.checked && {
		transform: 'translateX(2em)',
	} ),
	'& > svg': {
		width: '1em',
		strokeWidth: 2,
		stroke: 'currentColor'
	}
} ) );

/**
 * The Switch component is used to toggle the state of a single setting (on or off).
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>( function Switch(
	{
		type = 'checkbox',
		color = 'primary',
		checked: checkedProp,
		disabled = false,
		onChange,
		className,
		name,
		onFocus,
		onBlur,
		size = 'md',
		noPadding = false,
		defaultChecked = false,
		sx,
		...other
	}: SwitchProps,
	ref
) {
	const [ isChecked, setIsChecked ] = useControlledState( checkedProp, defaultChecked );
	const [ isFocused, setIsFocused ] = useState( false );

	const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		if ( disabled ) {
			event.preventDefault();
			return;
		}

		if ( event.nativeEvent.defaultPrevented ) {
			return;
		}

		const newChecked = event.target.checked;
		setIsChecked( newChecked );

		onChange?.( event, newChecked );
	};

	const handleFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( true );
		onFocus?.( e );
	};

	const handleBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( false );
		onBlur?.( e );
	};

	const ownerState: SwitchOwnerState = {
		checked: isChecked,
		disabled,
		isFocused,
		color,
		size,
		noPadding
	};

	const classes = useComponentClasses( ownerState );

	return (
		<SwitchRoot
			className={ classNames( className, classes.root ) }
			ownerState={ ownerState }
			sx={ sx }
		>
			<SwitchField
				{ ...other }
				className={ classes.field }
				ref={ ref }
				type="checkbox"
				checked={ isChecked }
				onChange={ handleChange }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				readOnly
				role="switch"
				tabIndex={ 0 }
				aria-checked={ isChecked }
				name={ 'checkbox' === type ? name : undefined }
				disabled={ disabled }
			/>
			{ 'hidden' === type && <input type="hidden" value={ isChecked ? 'yes' : 'no' } name={ name }/> }

			<SwitchTrack className={ classes.track } ownerState={ ownerState }/>
			<SwitchThumb className={ classes.thumb } ownerState={ ownerState }>
				{ isChecked ? <CheckIcon/> : <XMarkIcon/> }
			</SwitchThumb>
			<ZeroWidthSpace/>
		</SwitchRoot>
	);
} );

export default Switch;
