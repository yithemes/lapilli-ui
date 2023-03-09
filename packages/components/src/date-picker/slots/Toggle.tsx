import { styled } from "@yith/styles";
import type { PickerToggleOwnerState, PickerToggleProps, PickerToggleStyledProps } from "../types";
import React, { forwardRef } from "react";
import FwIcon from "../../fw-icon";
import { ZeroWidthSpace } from "../../utils";
import IconButton from "../../icon-button";

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
		lineHeight: 1.5,
		background: theme.fields.background,
		color: theme.fields.color,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		'&:focus': {
			borderColor: theme.fields.focusedBorderColor,
			boxShadow: theme.fields.focusedBoxShadow,
		},

		...( ownerState.isOpen && {
			borderColor: theme.fields.focusedBorderColor,
			boxShadow: theme.fields.focusedBoxShadow,
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
	fontSize: 11,
	padding: 6,
	margin: -3,
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
		fontSize: '1.25em',
		marginLeft: 6,
		...( ownerState.isOpen && {
			opacity: 1,
			color: theme.fields.focusedBorderColor,
		} ),
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
		...other
	},
	ref
) {
	const ownerState: PickerToggleOwnerState = {
		isOpen,
		text,
		placeholder,
		size
	}

	return <DatePickerToggleRoot
		ownerState={ ownerState }
		ref={ ref }
		aria-expanded={ isOpen ? 'true' : 'false' }
		aria-haspopup="dialog"
		role="combobox"
		tabIndex={ 0 }
		{ ...other }
	>

		{ !!startAdornment && <DatePickerToggleStartAdornment>{ startAdornment }</DatePickerToggleStartAdornment> }

		<DatePickerToggleLabel ownerState={ ownerState }>{ text || placeholder || <ZeroWidthSpace/> }</DatePickerToggleLabel>

		{ allowClear &&
			<DatePickerToggleClear
				ownerState={ ownerState }
				onClick={ ( e: React.MouseEvent ) => {
					e.stopPropagation();
					onClear();
				} }
			>
				<FwIcon icon="close-alt"/>
			</DatePickerToggleClear>
		}
		<DatePickerToggleIcon ownerState={ ownerState }>
			<FwIcon icon='calendar'/>
		</DatePickerToggleIcon>
	</DatePickerToggleRoot>;
} );

export default Toggle;