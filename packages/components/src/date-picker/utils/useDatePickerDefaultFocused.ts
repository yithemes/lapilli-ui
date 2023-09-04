import type { DatePickerProps } from "../types";
import { useMemo } from "react";
import { getDate, isAfter, isBefore, startOfDay } from "@maya-ui/date";

const useDatePickerDefaultFocused = ( props: DatePickerProps ) => {
	const {
		minDate,
		maxDate
	} = props;
	const today = useMemo( () => new Date(), [] );

	return useMemo( () => {

		const minimum = !!minDate && getDate( minDate );
		const maximum = !!maxDate && getDate( maxDate );
		if ( minimum && isBefore( today, startOfDay( minimum ) ) ) {
			return minimum;
		}

		if ( maximum && isAfter( today, startOfDay( maximum ) ) ) {
			return maximum;
		}

		return today;
	}, [ minDate, maxDate ] );
}

export default useDatePickerDefaultFocused;