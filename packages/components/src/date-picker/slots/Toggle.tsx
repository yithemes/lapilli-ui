import { styled } from "@yith/styles";
import React, { forwardRef } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import type { PickerToggleOwnerState, PickerToggleProps, PickerToggleStyledProps } from "../types";
import { useMergedRefs, useRelatedLabelFocus, ZeroWidthSpace } from "../../utils";
import IconButton from "../../icon-button";
import { XMarkIcon } from "@heroicons/react/20/solid";

const DatePickerToggleRoot = styled( 'div', { name: 'DatePicker', slot: 'Toggle' } )<PickerToggleStyledProps>( ( { ownerState, theme } ) => (
	{
		display: 'inline-flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		position: 'relative',
		cursor: 'pointer',
		userSelect: 'none',
		outline: 'none',
		borderRadius: theme.fields.borderRadius,
		padding: theme.fields.padding[ ownerState.size ],
		fontSize: theme.fields.fontSize,
		fontFamily: theme.fields.fontFamily,
		lineHeight: 1.5,
		background: theme.fields.background,
		color: theme.fields.color,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		...( !ownerState.disabled && {
			'&:focus': {
				borderColor: theme.fields.focusedBorderColor,
				boxShadow: theme.fields.focusedBoxShadow,
			}
		} ),
		...( ownerState.isOpen && {
			borderColor: theme.fields.focusedBorderColor,
			boxShadow: theme.fields.focusedBoxShadow,
		} ),
		...( ownerState.disabled && {
			opacity: theme.palette.action.disabledOpacity,
			cursor: 'not-allowed'
		} )
	}
) );

const DatePickerToggleStartAdornment = styled( 'div', { name: 'DatePicker', slot: 'ToggleStartAdornment' } )( () => ( {
	display: 'flex',
	alignItems: 'center',
	height: 0.01,
	whiteSpace: 'nowrap',
	marginRight: '8px',
} ) );

const DatePickerToggleLabel = styled( 'div', { name: 'DatePicker', slot: 'ToggleLabel' } )<PickerToggleStyledProps>( (
	{ ownerState, theme }
) => (
	{
		flex: 1,
		minWidth: 120,
		...( !ownerState.text && {
			color: theme.fields.placeholderColor
		} )
	}
) );

const DatePickerToggleClear = styled( IconButton, { name: 'DatePicker', slot: 'ToggleClear' } )<PickerToggleStyledProps>( (
	{ ownerState }
) => ( {
	margin: -4,
	'& > svg': {
		width: '1em'
	},
	...( !ownerState.text && {
		opacity: 0,
		visibility: 'hidden'
	} )
} ) );

const DatePickerToggleIcon = styled( 'div', { name: 'DatePicker', slot: 'ToggleIcon' } )<PickerToggleStyledProps>( (
	{ ownerState, theme }
) => (
	{
		pointerEvents: 'none',
		display: 'flex',
		color: theme.fields.borderColor,
		fontSize: '20px',
		marginLeft: 6,
		...( ownerState.isOpen && {
			opacity: 1,
			color: theme.fields.focusedBorderColor,
		} ),
		'& > svg': {
			width: '1em',
		}
	}
) );

const Toggle = forwardRef<HTMLDivElement, PickerToggleProps>( function DatePickerToggle(
	{
		isOpen,
		text,
		placeholder = '',
		size,
		allowClear,
		onClear,
		startAdornment,
		onClick,
		disabled = false,
		...other
	},
	ref
) {
	const relatedLabelFocusRef = useRelatedLabelFocus();
	const mergedRef = useMergedRefs( ref, relatedLabelFocusRef );

	const ownerState: PickerToggleOwnerState = {
		isOpen,
		text,
		placeholder,
		size,
		disabled
	}

	const handleClick = ( event: React.MouseEvent<HTMLDivElement> ) => {
		if ( !disabled ) {
			onClick?.( event );
		}
	}

	return <DatePickerToggleRoot
		ownerState={ ownerState }
		ref={ mergedRef }
		aria-expanded={ isOpen ? 'true' : 'false' }
		aria-haspopup="dialog"
		aria-disabled={ disabled }
		role="combobox"
		tabIndex={ 0 }
		onClick={ handleClick }
		{ ...other }
	>

		{ !!startAdornment && <DatePickerToggleStartAdornment>{ startAdornment }</DatePickerToggleStartAdornment> }

		<DatePickerToggleLabel ownerState={ ownerState }>{ text || placeholder || <ZeroWidthSpace/> }</DatePickerToggleLabel>

		{ allowClear &&
			<DatePickerToggleClear
				ownerState={ ownerState }
				onClick={ ( e: React.MouseEvent ) => {
					e.stopPropagation();
					if ( !disabled ) {
						onClear();
					}
				} }
				adaptiveSizing
				padding={ 4 }
				fontSize={ 15 }
			>
				<XMarkIcon/>
			</DatePickerToggleClear>
		}
		<DatePickerToggleIcon ownerState={ ownerState }>
			<CalendarDaysIcon/>
		</DatePickerToggleIcon>
	</DatePickerToggleRoot>;
} );

export default Toggle;