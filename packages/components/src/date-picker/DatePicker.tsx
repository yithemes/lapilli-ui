import React, { forwardRef, useRef, Ref, useCallback, useImperativeHandle } from "react";
import { styled, generateComponentClasses, Theme } from "@yith/styles";
import { formatDateSameTimezone } from "@yith/date";
import type { DatePickerProps, DatePickerRef } from "./types";
import classNames from "classnames";
import { DatePickerProvider } from "./context";
import Calendar from "./slots/Calendar";
import Dropdown from "../dropdown";
import Toggle from "./slots/Toggle";
import useDatePickerProps from "./utils/useDatePickerProps";

const useComponentClasses = () => {
	return generateComponentClasses(
		'DatePicker',
		{
			root: [ 'root' ],
			calendar: [ 'calendar' ]
		}
	)
}

const DatePickerRoot = styled( 'div', { name: 'DatePicker', slot: 'Root' } )( () => ( {
	display: 'inline-flex'
} ) );

const DatePickerStatic = styled( 'div', { name: 'DatePicker', slot: 'Static' } )( ( { theme }: { theme: Theme } ) => ( {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: theme.fields.borderColor,
	borderRadius: theme.fields.borderRadius,
	background: theme.fields.background,
	width: 'fit-content'
} ) );

type SelectDateAction = 'set' | 'finish' | 'clear'

type CalendarWrapperProps = {
	autoFocus?: boolean
	selectedDate: Date | null,
	setSelectedDate: ( date: Date | null, action?: SelectDateAction ) => void,
	focusedDate: Date,
	setFocusedDate: React.Dispatch<React.SetStateAction<Date>>,
	className: string,
	onChange?: DatePickerProps['onChange'],
	onFinishSelect?: ( date: Date | null ) => void,
	isDateDisabled: ( date: Date ) => string | boolean
	isPrevMonthDisabled: ( date: Date ) => boolean
	isNextMonthDisabled: ( date: Date ) => boolean
}

const CalendarWrapper = ( props: CalendarWrapperProps ) => {
	const {
		autoFocus = false,
		selectedDate,
		setSelectedDate,
		focusedDate,
		setFocusedDate,
		className,
		onChange,
		onFinishSelect,
		isDateDisabled,
		isPrevMonthDisabled,
		isNextMonthDisabled
	} = props;

	return <DatePickerProvider
		selectedDate={ selectedDate }
		setSelectedDate={ ( newDate, action = 'set' ) => {
			setSelectedDate( newDate );
			if ( newDate ) {
				setFocusedDate( newDate );
			}
			onChange?.( newDate );

			if ( action === 'finish' ) {
				onFinishSelect?.( newDate );
			}
		} }
		focusedDate={ focusedDate }
		setFocusedDate={ ( newDate ) => {
			setFocusedDate( newDate );
		} }
		isDateDisabled={ isDateDisabled }
		isPrevMonthDisabled={ isPrevMonthDisabled }
		isNextMonthDisabled={ isNextMonthDisabled }
	>
		<Calendar className={ className } autoFocus={ autoFocus }/>
	</DatePickerProvider>
};

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>( function DatePicker(
	props,
	ref
) {
	const {
		className,
		isStatic = false,
		placeholder,
		name,
		id,
		onChange,
		inputFormat = 'Y-m-d',
		displayFormat = 'M j, Y',
		size = 'md',
		allowClear = false,
		startAdornment
	} = props;
	const { datePickerProps, resetSelectedDate } = useDatePickerProps( props );
	const { selectedDate, setSelectedDate } = datePickerProps;
	const classes = useComponentClasses();
	const rootRef = useRef<HTMLDivElement>( null );
	const toggleRef = useRef<HTMLDivElement>( null );

	const handleClear = useCallback( () => {
		setSelectedDate( null );
		onChange?.( null );
	}, [] );

	useImperativeHandle( ref, () => {
		return {
			node: rootRef.current!,
			value: selectedDate,
			toggle: () => {
				toggleRef.current && toggleRef.current.click();
			},
			focus: () => {
				toggleRef.current && toggleRef.current.focus();
			}
		}
	}, [ rootRef, toggleRef, selectedDate ] );

	return <DatePickerRoot ref={ rootRef } className={ classNames( classes.root, className ) }>
		<input type='hidden' id={ id } name={ name } value={ !!selectedDate ? formatDateSameTimezone( inputFormat, selectedDate ) : '' }/>
		{
			isStatic ?
				<DatePickerStatic>
					<CalendarWrapper
						className={ classes.calendar }
						{ ...datePickerProps }
						onChange={ onChange }
					/>
				</DatePickerStatic> :
				<Dropdown
					ref={ toggleRef }
					renderToggle={
						( { onOpen, onToggle, isOpen, ref: currentToggleRef } ) => {
							return <Toggle
								ref={ currentToggleRef as Ref<HTMLDivElement> }
								onClick={ onToggle }
								onKeyDown={
									( event: React.KeyboardEvent ) => {
										if ( [ 'Down', 'ArrowDown', 'Enter', ' ' ].includes( event.key ) ) {
											onOpen();
											event.stopPropagation();
										}
									}
								}
								isOpen={ isOpen }
								text={ !!selectedDate ? formatDateSameTimezone( displayFormat, selectedDate ) : '' }
								placeholder={ placeholder }
								size={ size }
								allowClear={ allowClear }
								onClear={ handleClear }
								startAdornment={ startAdornment }
							/>
						}
					}
					renderContent={
						( { onClose } ) => {
							return <CalendarWrapper
								className={ classes.calendar }
								{ ...datePickerProps }
								onChange={ onChange }
								onFinishSelect={ () => onClose() }
								autoFocus
							/>
						}
					}
					onClose={ () => {
						toggleRef.current && toggleRef.current.focus();
						resetSelectedDate();
					} }
				/>
		}
	</DatePickerRoot>;
} );

export default DatePicker;