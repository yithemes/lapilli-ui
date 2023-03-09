import type { DatePickerProps } from "../types";
import { useCallback } from "react";
import { isAfter, isBefore, startOfDay } from "@yith/date";

const useIsDateDisabled = ( props: DatePickerProps ) => {
	const {
		minDate,
		maxDate,
		shouldDisableDate
	} = props;
	return useCallback( ( date: Date ) => {
		if ( minDate && isBefore( date, startOfDay( new Date( minDate ) ) ) ) {
			return 'minDate';
		}

		if ( maxDate && isAfter( date, startOfDay( new Date( maxDate ) ) ) ) {
			return 'maxDate';
		}

		if ( shouldDisableDate && shouldDisableDate( date ) ) {
			return 'shouldDisableDate';
		}

		return false;
	}, [ minDate, maxDate, shouldDisableDate ] );
}

export default useIsDateDisabled;