import { capitalize, noop } from 'lodash';
import React, { forwardRef, useState } from 'react';
import { CheckIcon } from "@heroicons/react/20/solid";

import { FieldSize, generateComponentClasses, styled } from '@yith/styles';

import { useControlledState, ZeroWidthSpace } from "../utils";
import type { CheckboxOwnerState, CheckboxProps, CheckboxStyled } from "./types";
import classNames from "classnames";

const sizes: Record<FieldSize, number> = {
	sm: 16,
	md: 20,
	lg: 24,
	xl: 28
};

const getPadding = ( ownerState: CheckboxOwnerState ) => ownerState.noPadding ? 0 : 10;

const useComponentClasses = ( ownerState: CheckboxOwnerState ) => {
	return generateComponentClasses(
		'Checkbox',
		{
			root: [
				'root',
				`--size${ capitalize( ownerState.size ) }`,
				ownerState.checked && 'checked'
			],
			field: [ 'field' ],
			shape: [ 'shape' ],
			icon: [ 'icon' ],
			outline: [ 'outline' ],
			ripple: [ 'ripple' ],
		}
	)
}

const CheckboxRoot = styled( 'span', { name: 'Checkbox', slot: 'Root' } )<CheckboxStyled>( ( { ownerState, theme } ) => ( {
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	boxSizing: 'content-box',
	userSelect: 'none',
	color: theme.palette[ ownerState.color ].main,
	width: '1em',
	height: '1em',
	fontSize: `${ sizes[ ownerState.size ] }px`,
	padding: getPadding( ownerState ),
	lineHeight: 1,
	...( ownerState.useIcons && {
		color: ownerState.checked ? theme.palette[ ownerState.color ].main : theme.palette.grey[ 400 ],
	} ),
} ) );
const CheckboxField = styled( 'input', { name: 'Checkbox', slot: 'Field' } )`
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
const CheckboxShape = styled( 'span', { name: 'Checkbox', slot: 'Shape' } )<CheckboxStyled>( ( { ownerState, theme } ) => ( {
	position: 'absolute',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: theme.fields.borderColor,
	background: theme.fields.background,
	borderRadius: '3px',
	transitionProperty: 'background, borderColor',
	transitionDuration: '0.2s',
	transitionTimingFunction: 'ease-in-out',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: `calc(100% - ${ getPadding( ownerState ) * 2 }px)`,
	height: `calc(100% - ${ getPadding( ownerState ) * 2 }px)`,
	fontSize: '.5em',
	...( ownerState.checked && {
		background: 'currentColor',
		borderColor: 'currentColor',
	} ),
	'& > svg': {
		position: 'absolute',
		width: '1em',
		strokeWidth: 2,
		color: theme.palette[ ownerState.color ].contrastText,
		stroke: 'currentColor',
		...( ( ownerState.size === 'lg' || ownerState.size === 'xl' ) && {
			strokeWidth: 1.5,
		} ),
	},
} ) );

const CheckboxIcon = styled( 'span', { name: 'Checkbox', slot: 'Icon' } )<CheckboxStyled>( () => ( {
	position: 'absolute',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	transition: 'all 0.2s ease-in-out',
} ) );

const CheckboxOutline = styled( 'span', { name: 'Checkbox', slot: 'Outline' } )<CheckboxStyled>( ( { ownerState } ) => ( {
	position: 'absolute',
	borderRadius: '4px',
	pointerEvents: 'none',
	transform: 'scale(.4)',
	boxShadow: `0 0 0 0 currentColor`,
	fontSize: '.5em',
	width: `calc(100% - ${ getPadding( ownerState ) * 2 }px + 4px)`,
	height: `calc(100% - ${ getPadding( ownerState ) * 2 }px + 4px)`,
	transition: 'all 0.2s ease-in-out',
	...( ownerState.isFocused && {
		boxShadow: `0 0 0px 2px currentColor`,
		transform: 'scale(1)',
	} )
} ) );

const CheckboxRipple = styled( 'span', { name: 'Checkbox', slot: 'Ripple' } )<CheckboxStyled>( ( { ownerState, theme } ) => ( {
	position: 'absolute',
	borderRadius: '50%',
	width: '100%',
	height: '100%',
	pointerEvents: 'none',
	top: 0,
	left: 0,
	transform: 'scale(0)',
	background: 'currentColor',
	opacity: 0,
	transition: 'transform 0.2s ease-in-out',
	...( ownerState.noPadding && {
		width: `calc(100% + 20px)`,
		height: `calc(100% + 20px)`,
		top: -10,
		left: -10,
	} ),
	...( ownerState.isFocused && {
		transform: 'scale(1)',
		opacity: theme.palette.action.focusOpacity
	} )
} ) );

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>( function Checkbox(
	{
		color = 'primary',
		checked: checkedProp,
		disabled = false,
		onChange = noop,
		className,
		name,
		onFocus = noop,
		onBlur = noop,
		size = 'md',
		icon,
		checkedIcon,
		noPadding = false,
		sx,
		...other
	}: CheckboxProps,
	ref
) {
	const [ isChecked, setIsChecked ] = useControlledState( checkedProp, false );
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

	const theIcon = isChecked && icon ? checkedIcon ?? icon : icon;

	const ownerState: CheckboxOwnerState = {
		checked: isChecked,
		isFocused,
		useIcons: !!theIcon,
		disabled,
		color,
		size,
		noPadding
	};
	const classes = useComponentClasses( ownerState );

	return (
		<CheckboxRoot
			className={ classNames( className, classes.root ) }
			ownerState={ ownerState }
			sx={ sx }
		>
			<CheckboxField
				{ ...other }
				className={ classes.field }
				ref={ ref }
				type="checkbox"
				checked={ isChecked }
				onChange={ handleChange }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				readOnly
				aria-checked={ isChecked }
				name={ name }
				disabled={ disabled }
			/>
			{ !theIcon ? <>
				<CheckboxOutline ownerState={ ownerState } className={ classes.outline }/>
				<CheckboxShape ownerState={ ownerState } className={ classes.shape }>
					{ isChecked && <CheckIcon/> }
				</CheckboxShape>
			</> : <>
				<CheckboxRipple ownerState={ ownerState } className={ classes.ripple }/>
				<CheckboxIcon ownerState={ ownerState } className={ classes.icon }>
					{ theIcon }
				</CheckboxIcon>
			</> }
			<ZeroWidthSpace/>
		</CheckboxRoot>
	);
} );

export default Checkbox;
