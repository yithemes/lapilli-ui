import React, { useMemo } from 'react';
import { noop } from "lodash";
import { useChangeEffect, usePropState } from "../utils";
import type { DatePickerProps } from "@lapilli-ui/components";
import { startOfMonth } from "@lapilli-ui/date";

type SelectDateAction = 'set' | 'finish' | 'clear'

type ProviderProps = {
	isDatePickerDisabled: boolean
	selectedDate: Date | null
	setSelectedDate: ( date: Date | null, action?: SelectDateAction ) => void
	focusedDate: Date
	setFocusedDate: React.Dispatch<React.SetStateAction<Date>>
	isDateDisabled: ( date: Date ) => string | boolean
	isPrevMonthDisabled: ( date: Date ) => boolean
	isNextMonthDisabled: ( date: Date ) => boolean
	children: React.ReactNode
	onMonthChange?: DatePickerProps['onMonthChange']
	isLoading: DatePickerProps['isLoading']
	slots?: DatePickerProps['slots']
};

type ContextValue = Omit<ProviderProps, 'onMonthChange' | 'children'> & {
	currentDate: number
	currentYear: number
	currentMonth: number
	currentDay: number
	internalDate: Date
	setInternalDate: React.Dispatch<React.SetStateAction<Date>>
	isDateDisabled: ( date: Date ) => string | boolean
	isPrevMonthDisabled: ( date: Date ) => boolean
	isNextMonthDisabled: ( date: Date ) => boolean
	isDatePickerDisabled: boolean
}

const DatePickerContext = React.createContext<ContextValue>( {} as ContextValue );

export const useDatePickerContext = (): ContextValue => React.useContext( DatePickerContext );

export function DatePickerProvider( { children, onMonthChange, ...props }: ProviderProps ) {
	const { focusedDate, isDatePickerDisabled } = props;
	const [ internalDate, setInternalDate ] = usePropState( focusedDate );

	useChangeEffect(
		internalDate,
		( prev, current ) => {
			if ( prev.getMonth() !== current.getMonth() || prev.getFullYear() !== current.getFullYear() ) {
				onMonthChange?.( startOfMonth( current ) )
			}
		}
	)

	const theContext: ContextValue = {
		...props,
		currentDate: useMemo( () => internalDate.getDate(), [ internalDate ] ),
		currentYear: useMemo( () => internalDate.getFullYear(), [ internalDate ] ),
		currentMonth: useMemo( () => internalDate.getMonth(), [ internalDate ] ),
		currentDay: useMemo( () => internalDate.getDay(), [ internalDate ] ),
		internalDate,
		setInternalDate: !isDatePickerDisabled ? setInternalDate : noop
	}
	return (
		<DatePickerContext.Provider value={ theContext }>
			{ children }
		</DatePickerContext.Provider>
	)
}