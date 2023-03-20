import React, { forwardRef, useRef, Ref, useCallback, useImperativeHandle } from "react";
import { styled, generateComponentClasses } from "@yith/styles";
import { formatDateSameTimezone } from "@yith/date";
import type { DatePickerProps, DatePickerRef } from "./types";
import classNames from "classnames";
import { DatePickerProvider } from "./context";
import Calendar from "./slots/Calendar";
import Dropdown from "../dropdown";
import Toggle from "./slots/Toggle";
import useDatePickerProps from "./utils/useDatePickerProps";

const useComponentClasses = ( props: DatePickerProps ) => {
	return generateComponentClasses(
		'DatePicker',
		{
			root: [
				'root',
				props?.disabled && 'disabled'
			],
			calendar: [ 'calendar' ]
		}
	)
}

const DatePickerRoot = styled( 'div', { name: 'DatePicker', slot: 'Root' } )( () => ( {
	display: 'inline-flex'
} ) );

const DatePickerStatic = styled( 'div', { name: 'DatePicker', slot: 'Static' } )<{ ownerState: { isDatePickerDisabled: boolean } }>( ( { theme, ownerState } ) => ( {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: theme.fields.borderColor,
	borderRadius: theme.fields.borderRadius,
	background: theme.fields.background,
	width: 'fit-content',
	...( ownerState.isDatePickerDisabled && {
		opacity: theme.palette.action.disabledOpacity
	} )
} ) );

type SelectDateAction = 'set' | 'finish' | 'clear'

type CalendarWrapperProps = {
	disabled: boolean
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
		disabled,
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
		isDatePickerDisabled={ disabled }
		selectedDate={ selectedDate }
		setSelectedDate={ ( newDate, action = 'set' ) => {
			if ( disabled ) {
				return;
			}
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
			if ( disabled ) {
				return;
			}
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
		startAdornment,
		disabled = false
	} = props;
	const { datePickerProps, resetSelectedDate } = useDatePickerProps( props );
	const { selectedDate, setSelectedDate } = datePickerProps;
	const classes = useComponentClasses( props );
	const rootRef = useRef<HTMLDivElement>( null );
	const toggleRef = useRef<HTMLDivElement>( null );

	const handleChange: DatePickerProps['onChange'] = ( date ) => {
		if ( !disabled ) {
			onChange?.( date );
		}
	}

	const handleClear = useCallback( () => {
		if ( disabled ) {
			return;
		}
		setSelectedDate( null );
		handleChange?.( null );
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
		<input type='hidden' id={ id } name={ name } value={ !!selectedDate ? formatDateSameTimezone( inputFormat, selectedDate ) : '' } disabled={ disabled }/>
		{
			isStatic ?
				<DatePickerStatic ownerState={ { isDatePickerDisabled: disabled } }>
					<CalendarWrapper
						disabled={ disabled }
						className={ classes.calendar }
						{ ...datePickerProps }
						onChange={ handleChange }
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
								disabled={ disabled }
							/>
						}
					}
					renderContent={
						( { onClose } ) => {
							return <CalendarWrapper
								disabled={ disabled }
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