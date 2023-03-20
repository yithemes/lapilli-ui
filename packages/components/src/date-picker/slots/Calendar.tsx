import { __ } from "@wordpress/i18n";
import { styled } from "@yith/styles";
import { formatDateSameTimezone, addMonths } from "@yith/date";
import { useDatePickerContext } from "../context";
import Stack from "../../stack";
import IconButton from "../../icon-button";
import FwIcon from "../../fw-icon";
import DayPicker from "./DayPicker";
import { useId } from "../../utils";
import React from "react";

const ARROWS_FONT_SIZE = 12;

const DatePickerCalendarRoot = styled( 'div', { name: 'DatePicker', slot: 'Calendar' } )( ( { theme } ) => (
	{
		padding: 12,
		fontSize: theme.fields.fontSize,
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
			><FwIcon icon='arrow-left-alt' fontSize={ ARROWS_FONT_SIZE }/></IconButton>
			<DatePickerCalendarHeaderLabel aria-live="polite" id={ gridLabelId }>{ formatDateSameTimezone( 'F Y', internalDate ) }</DatePickerCalendarHeaderLabel>
			<IconButton
				onClick={ () => setInternalDate( _ => addMonths( _, 1 ) ) }
				aria-label={ __( 'Next month', 'yith-plugin-fw' ) }
				disabled={ isNextMonthDisabled( internalDate ) }
			><FwIcon icon='arrow-right-alt' fontSize={ ARROWS_FONT_SIZE }/></IconButton>
		</DatePickerCalendarHeader>
		<DayPicker autoFocus={ autoFocus } gridLabelId={ gridLabelId }/>
	</DatePickerCalendarRoot>;
}

export default Calendar;