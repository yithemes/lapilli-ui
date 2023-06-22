import { __ } from "@wordpress/i18n";
import { styled } from "@yith/styles";
import { format, getDateFormat, addMonths } from "@yith/date";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useDatePickerContext } from "../context";
import Stack from "../../stack";
import IconButton from "../../icon-button";
import DayPicker from "./DayPicker";
import { useId } from "../../utils";
import React from "react";

const DatePickerCalendarRoot = styled( 'div', { name: 'DatePicker', slot: 'Calendar' } )( ( { theme } ) => (
	{
		padding: 12,
		fontSize: theme.fields.fontSize,
		fontFamily: theme.fields.fontFamily,
	}
) );
const DatePickerCalendarHeader = styled( Stack, { name: 'DatePicker', slot: 'CalendarHeader' } )( () => (
	{}
) );
const DatePickerCalendarHeaderLabel = styled( 'div', { name: 'DatePicker', slot: 'CalendarHeaderLabel' } )`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	font-weight: 600;
	font-size: 1.1em;
`;

const Calendar = ( { className, autoFocus = false }: { className: string, autoFocus?: boolean } ) => {
	const { internalDate, setInternalDate, isPrevMonthDisabled, isNextMonthDisabled } = useDatePickerContext();
	const id = useId();
	const gridLabelId = `${ id }:grid-label`;

	return <DatePickerCalendarRoot className={ className }>
		<DatePickerCalendarHeader spacing={ 2 } direction='row'>
			<IconButton
				onClick={ () => setInternalDate( _ => addMonths( _, -1 ) ) }
				aria-label={ __( 'Previous month', 'yith-plugin-fw' ) }
				disabled={ isPrevMonthDisabled( internalDate ) }
			><ChevronLeftIcon width="1em"/></IconButton>
			<DatePickerCalendarHeaderLabel aria-live="polite" id={ gridLabelId }>{ format( getDateFormat( 'monthAndYear' ), internalDate ) }</DatePickerCalendarHeaderLabel>
			<IconButton
				onClick={ () => setInternalDate( _ => addMonths( _, 1 ) ) }
				aria-label={ __( 'Next month', 'yith-plugin-fw' ) }
				disabled={ isNextMonthDisabled( internalDate ) }
			><ChevronRightIcon width="1em"/></IconButton>
		</DatePickerCalendarHeader>
		<DayPicker autoFocus={ autoFocus } gridLabelId={ gridLabelId }/>
	</DatePickerCalendarRoot>;
}

export default Calendar;