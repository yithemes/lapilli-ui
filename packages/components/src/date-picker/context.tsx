import React, { useMemo, useState } from 'react';

type SelectDateAction = 'set' | 'finish' | 'clear'

type ProviderProps = {
	selectedDate: Date | null,
	setSelectedDate: ( date: Date | null, action?: SelectDateAction ) => void,
	focusedDate: Date,
	setFocusedDate: React.Dispatch<React.SetStateAction<Date>>,
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
}

const DatePickerContext = React.createContext<ContextValue>( {} as ContextValue );

export const useDatePickerContext = (): ContextValue => React.useContext( DatePickerContext );

export function DatePickerProvider( { children, ...props }: ProviderProps ) {
	const { focusedDate } = props;
	const [ internalDate, setInternalDate ] = useState( focusedDate );
	const theContext: ContextValue = {
		...props,
		currentDate: useMemo( () => internalDate.getDate(), [ internalDate ] ),
		currentYear: useMemo( () => internalDate.getFullYear(), [ internalDate ] ),
		currentMonth: useMemo( () => internalDate.getMonth(), [ internalDate ] ),
		currentDay: useMemo( () => internalDate.getDay(), [ internalDate ] ),
		internalDate,
		setInternalDate
	}
	return (
		<DatePickerContext.Provider value={ theContext }>
			{ children }
		</DatePickerContext.Provider>
	)
}