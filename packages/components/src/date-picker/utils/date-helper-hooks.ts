import type { DatePickerProps } from "../types";
import { useCallback } from "react";
import { addMonths, endOfMonth, isAfter, isBefore, startOfDay, startOfMonth } from "@maya-ui/date";

export const useIsPrevMonthDisabled = ( props: DatePickerProps ) => {
	const { minDate } = props;
	return useCallback( ( date: Date ) => {
		const monthDate = endOfMonth( addMonths( date, -1 ) );
		return !!( minDate && isBefore( monthDate, startOfDay( new Date( minDate ) ) ) );
	}, [ minDate ] );
}

export const useIsNextMonthDisabled = ( props: DatePickerProps ) => {
	const { maxDate } = props;
	return useCallback( ( date: Date ) => {
		const monthDate = startOfMonth( addMonths( date, 1 ) );
		return !!( maxDate && isAfter( monthDate, startOfDay( new Date( maxDate ) ) ) );
	}, [ maxDate ] );
}