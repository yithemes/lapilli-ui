import { alpha, styled } from "@lapilli-ui/styles";
import { format, getDateFormat } from "@lapilli-ui/date";
import type { PickerDayOwnerState, PickerDayProps } from "../types";
import React, { useEffect, useRef } from "react";
import { useDatePickerContext } from "../context";

const DAY_SIZE = 36;
const DAY_MARGIN = 2;

const DayPickerDayFiller = styled( 'div', { name: 'DayPicker', slot: 'DayFiller' } )( () => ( {
	width: DAY_SIZE,
	height: DAY_SIZE,
	margin: DAY_MARGIN,
	textAlign: 'center',
	display: 'flex',
} ) );
const DayPickerDayRoot = styled( 'div', { name: 'DayPicker', slot: 'Day' } )<{ ownerState: PickerDayOwnerState }>( ( { ownerState, theme } ) => {
	const backgroundColor = ( ownerState.isSelected && !ownerState.isDisabled ? theme.palette.primary.main : theme.palette.action.active ) ?? '#000';

	return {
		width: DAY_SIZE,
		height: DAY_SIZE,
		margin: DAY_MARGIN,
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		border: 0,
		cursor: 'pointer',
		lineHeight: '1em',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		userSelect: 'none',
		outline: 0,
		background: alpha( backgroundColor, 0 ),
		...( ownerState.isDisabled && {
			opacity: theme.palette.action.disabledOpacity,
			cursor: 'default',
			pointerEvents: 'none'
		} ),
		...( !ownerState.isDisabled && ownerState.isSelected && {
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			fontWeight: 600,
			...( !ownerState.isDatePickerDisabled && {
				'&:hover, &:focus': {
					background: theme.palette.primary.light,
				},
			} )
		} ),
		...( !ownerState.isDatePickerDisabled && ( ownerState.isDisabled || !ownerState.isSelected ) && {
			'&:hover': {
				background: alpha( backgroundColor, theme.palette.action.hoverOpacity ),
			},
			'&:focus': {
				background: alpha( backgroundColor, theme.palette.action.focusOpacity ),
				'&:hover': {
					background: alpha( backgroundColor, theme.palette.action.hoverOpacity + theme.palette.action.focusOpacity ),
				},
			},
		} ),
		...( ownerState.isDatePickerDisabled && {
			cursor: 'not-allowed'
		} )
	}
} );

const DayPickerDay = ( props: PickerDayProps ) => {
	const ref = useRef<HTMLDivElement>( null );
	const {
		className,
		autoFocus = false,
		day,
		isOutsideCurrentMonth,
		isSelected,
		isDisabled,
		onClick,
		onDaySelect,
		onKeyDown,
		onFocus,
		onBlur,
		...other
	} = props;

	const { isDatePickerDisabled } = useDatePickerContext();

	const ownerState: PickerDayOwnerState = { isDisabled, isSelected, isOutsideCurrentMonth, isDatePickerDisabled };

	useEffect( () => {
		// Use timeout to prevent issues with screen-readers when moving to next/prev month/year.
		setTimeout( () => {
			autoFocus && !isOutsideCurrentMonth && ref.current && ref.current.focus()
		}, 10 )
	}, [ autoFocus, isOutsideCurrentMonth ] )

	if ( isOutsideCurrentMonth ) {
		return <DayPickerDayFiller role="gridcell"/>
	}

	return <DayPickerDayRoot
		className={ className }
		ownerState={ ownerState }
		onClick={ ( e ) => {
			if ( isDatePickerDisabled ) {
				return;
			}
			!isDisabled && onDaySelect?.( day );
			onClick?.( e, day );
		} }
		onKeyDown={ ( e ) => !isDatePickerDisabled && onKeyDown?.( e, day ) }
		onFocus={ ( e ) => !isDatePickerDisabled && onFocus?.( e, day ) }
		onBlur={ ( e ) => !isDatePickerDisabled && onBlur?.( e, day ) }
		ref={ ref }
		aria-selected={ isSelected }
		// @ts-ignore
		autoFocus={ autoFocus }
		{ ...( ( isDisabled || isDatePickerDisabled ) && { 'aria-disabled': true, disabled: true } ) }
		{ ...other }
	>
		{ format( getDateFormat( 'dayOfMonth' ), day ) }
	</DayPickerDayRoot>

};

export default DayPickerDay;
