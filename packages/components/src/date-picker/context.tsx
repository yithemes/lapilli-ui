import React, { useMemo } from 'react';
import { noop } from "lodash";
import { usePropState } from "../utils";

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
};

type ContextValue = Omit<ProviderProps, 'children'> & {
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

export function DatePickerProvider( { children, ...props }: ProviderProps ) {
	const { focusedDate, isDatePickerDisabled } = props;
	const [ internalDate, setInternalDate ] = usePropState( focusedDate );
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