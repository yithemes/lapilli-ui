import React, { forwardRef, useRef, useCallback, useImperativeHandle } from "react";
import { styled, generateComponentClasses } from "@lapilli-ui/styles";
import { format, getDateFormat } from "@lapilli-ui/date";
import classNames from "classnames";

import type { DatePickerProps, DatePickerRef } from "./types";
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

const DatePickerStatic = styled( 'div', { name: 'DatePicker', slot: 'Static' } )<{ ownerState: { isDatePickerDisabled: boolean, variant: Required<DatePickerProps['variant']> } }>( ( { theme, ownerState } ) => ( {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: 'transparent',
	borderRadius: theme.fields.borderRadius,
	background: theme.fields.background,
	width: 'fit-content',
	...( ownerState.variant === 'outlined' && {
		borderColor: theme.fields.borderColor,
	} ),
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
	isLoading: DatePickerProps['isLoading']
	slots?: DatePickerProps['slots']
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
		isNextMonthDisabled,
		slots,
		isLoading
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
		slots={ slots }
		isLoading={ isLoading }
	>
		<Calendar className={ className } autoFocus={ autoFocus }/>
	</DatePickerProvider>
};

/**
 * The DatePicker component lets the user select a date.
 */
const DatePicker = forwardRef<DatePickerRef, DatePickerProps>( function DatePicker(
	props,
	ref
) {
	const {
		className,
		variant = 'outlined',
		isStatic = false,
		isLoading = false,
		placeholder,
		name,
		id,
		onChange,
		inputFormat: inputFormatProp,
		displayFormat: displayFormatProp,
		size = 'md',
		allowClear = false,
		startAdornment,
		disabled = false,
		slots
	} = props;
	const inputFormat = inputFormatProp ? inputFormatProp : getDateFormat( 'inputDate' );
	const displayFormat = displayFormatProp ? displayFormatProp : getDateFormat( 'fullDate' );
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
	}, [ disabled ] );

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
		<input
			type='hidden'
			name={ name }
			value={ !!selectedDate ? format( inputFormat, selectedDate ) : '' }
			disabled={ disabled }
		/>
		{
			isStatic ?
				<DatePickerStatic ownerState={ { isDatePickerDisabled: disabled, variant } }>
					<CalendarWrapper
						disabled={ disabled }
						className={ classes.calendar }
						{ ...datePickerProps }
						onChange={ handleChange }
						slots={ slots }
						isLoading={ isLoading }
					/>
				</DatePickerStatic> :
				<Dropdown
					ref={ toggleRef }
					renderToggle={
						( { open, toggle, isOpen } ) => {
							return <Toggle
								id={ id }
								onClick={ toggle }
								onKeyDown={
									( event: React.KeyboardEvent ) => {
										if ( [ 'Down', 'ArrowDown', 'Enter', ' ' ].includes( event.key ) ) {
											open();
											event.stopPropagation();
										}
									}
								}
								isOpen={ isOpen }
								text={ !!selectedDate ? format( displayFormat, selectedDate ) : '' }
								placeholder={ placeholder }
								size={ size }
								allowClear={ allowClear }
								onClear={ handleClear }
								startAdornment={ startAdornment }
								disabled={ disabled }
								variant={ variant }
							/>
						}
					}
					renderContent={
						( { close } ) => {
							return <CalendarWrapper
								disabled={ disabled }
								className={ classes.calendar }
								{ ...datePickerProps }
								onChange={ onChange }
								onFinishSelect={ () => close() }
								autoFocus
								slots={ slots }
								isLoading={ isLoading }
							/>
						}
					}
					onClose={ () => {
						resetSelectedDate();
					} }
				/>
		}
	</DatePickerRoot>;
} );

export default DatePicker;