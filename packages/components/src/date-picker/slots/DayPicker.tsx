import { styled } from "@yith/styles";
import { formatDateSameTimezone, getWeekArray, isSameDay, isSameMonth, addDays, addMonths, addYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isAfter } from "@yith/date";
import { useDatePickerContext } from "../context";
import { useCallback, useMemo, useState } from "react";
import DayPickerDay from "./DayPickerDay";
import React from "react";

const DAY_SIZE = 36;
const DAY_MARGIN = 2;

const DayPickerRoot = styled( 'div', { name: 'DayPicker', slot: 'Root' } )( () => ( {
	fontSize: '.9em'
} ) );
const DayPickerHeader = styled( 'div', { name: 'DayPicker', slot: 'Header' } )( () => ( {
	display: 'flex',
	justifyContent: 'center',
} ) );
const DayPickerWeekdayLabel = styled( 'div', { name: 'DayPicker', slot: 'WeekdayLabel' } )( () => ( {
	width: DAY_SIZE,
	height: DAY_SIZE - ( DAY_MARGIN * 2 ),
	margin: DAY_MARGIN,
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontWeight: 600,
	opacity: .7
} ) );
const DayPickerWeekContainer = styled( 'div', { name: 'DayPicker', slot: 'WeekContainer' } )( () => ( {
	minHeight: 5 * ( DAY_SIZE + ( DAY_MARGIN * 2 ) )
} ) );
const DayPickerWeek = styled( 'div', { name: 'DayPicker', slot: 'Week' } )( () => ( {
	display: 'flex',
	justifyContent: 'center',
} ) );

const DayPicker = ( { className, autoFocus = false, gridLabelId = '' }: { className?: string, autoFocus?: boolean, gridLabelId?: string } ) => {
	const {
		internalDate,
		setInternalDate,
		focusedDate,
		setFocusedDate,
		selectedDate,
		setSelectedDate,
		isDateDisabled
	} = useDatePickerContext();
	const weeks = useMemo( () => getWeekArray( internalDate ), [ internalDate ] );
	const [ hasFocus, setHasFocus ] = useState( autoFocus );

	const focusableDay = useMemo( () => {
		const currentStartOfMonth = startOfMonth( internalDate );
		const currentEndOfMonth = endOfMonth( internalDate );

		if ( isBefore( focusedDate, currentStartOfMonth ) ||
			isAfter( focusedDate, currentEndOfMonth )
		) {
			return currentStartOfMonth;
		}

		return focusedDate;
	}, [ internalDate, focusedDate ] );

	const focusDay = useCallback( ( date: Date ) => {
		if ( [ 'minDate', 'maxDate' ].includes( isDateDisabled( date ) as string ) ) {
			return;
		}
		setInternalDate( date );
		setFocusedDate( date );
		setHasFocus( true );
	}, [ setInternalDate, setFocusedDate ] );

	const handleDayKeydown = useCallback( ( event: React.KeyboardEvent, date: Date ) => {
		let preventPropagation = true;
		switch ( event.key ) {
			case 'Right':
			case 'ArrowRight':
				focusDay( addDays( date, 1 ) )
				break;
			case 'Left':
			case 'ArrowLeft':
				focusDay( addDays( date, -1 ) )
				break;
			case 'Down':
			case 'ArrowDown':
				focusDay( addDays( date, 7 ) )
				break;
			case 'Up':
			case 'ArrowUp':
				focusDay( addDays( date, -7 ) )
				break;
			case 'PageUp':
				if ( event.shiftKey ) {
					focusDay( addYears( date, -1 ) )
				} else {
					focusDay( addMonths( date, -1 ) )
				}
				break;
			case 'PageDown':
				if ( event.shiftKey ) {
					focusDay( addYears( date, 1 ) )
				} else {
					focusDay( addMonths( date, 1 ) )
				}
				break;
			case 'Home':
				focusDay( startOfWeek( date ) )
				break;
			case 'End':
				focusDay( endOfWeek( date ) )
				break;
			case 'Enter':
				if ( !isDateDisabled( date ) ) {
					setSelectedDate( date, 'finish' );
				}
				break;
			case ' ':
				if ( !isDateDisabled( date ) ) {
					setSelectedDate( date );
				}
				break;
			default:
				preventPropagation = false;
		}

		if ( preventPropagation ) {
			event.stopPropagation();
			event.preventDefault();
		}
	}, [ focusedDate ] );

	const handleDayBlur = useCallback( ( _: React.FocusEvent, day: Date ) => {
		if ( hasFocus && isSameDay( day, internalDate ) ) {
			setHasFocus( false );
		}
	}, [] );

	const handleDayFocus = useCallback( ( _: React.FocusEvent, day: Date ) => {
		focusDay( day );
	}, [] );

	return <DayPickerRoot className={ className } role='grid' aria-labelledby={ gridLabelId }>
		<DayPickerHeader role='row'>
			{ weeks[ 0 ].map( ( date: Date ) => {
				const dayName = formatDateSameTimezone( 'l', date );
				return <DayPickerWeekdayLabel
					key={ date.getDay() }
					role="columnheader"
				>
					{ dayName.substring( 0, 1 ) }
				</DayPickerWeekdayLabel>
			} ) }
		</DayPickerHeader>
		<DayPickerWeekContainer role="rowgroup">
			{ weeks.map( ( week: Date[] ) => (
				<DayPickerWeek
					key={ `week-${ week[ 0 ] }` }
					role="row"
				>
					{ week.map( ( day: Date ) => {
						const isSelected = Boolean( selectedDate && isSameDay( day, selectedDate ) );
						const isFocusable = isSameDay( day, focusableDay );
						const isDisabled = isDateDisabled( day );
						const isOutsideCurrentMonth = !isSameMonth( day, internalDate );

						return <DayPickerDay
							key={ day.toString() }
							day={ day }
							role='gridcell'
							autoFocus={ hasFocus && isFocusable }
							isSelected={ isSelected }
							isDisabled={ !!isDisabled }
							isOutsideCurrentMonth={ isOutsideCurrentMonth }
							onDaySelect={ selectedDay => setSelectedDate( selectedDay, 'finish' ) }
							tabIndex={ isFocusable ? 0 : -1 }
							onKeyDown={ handleDayKeydown }
							onBlur={ handleDayBlur }
							onFocus={ handleDayFocus }
						/>
					} ) }
				</DayPickerWeek>
			) ) }
		</DayPickerWeekContainer>

	</DayPickerRoot>;
}

export default DayPicker;