import type { DatePickerProps } from "../types";
import { useCallback, useState } from "react";
import { useControlledState } from "../../utils";
import useIsDateDisabled from "./useIsDateDisabled";
import { useIsNextMonthDisabled, useIsPrevMonthDisabled } from "./date-helper-hooks";
import useDatePickerDefaultValue from "./useDatePickerDefaultValue";

const useDatePickerProps = ( props: DatePickerProps ) => {
	const {
		value: valueProp
	} = props;

	const defaultValue = useDatePickerDefaultValue( props );
	const value = typeof valueProp !== 'undefined' ? ( typeof valueProp === 'string' ? new Date( valueProp ) : valueProp ) : undefined;
	const [ focusedDate, setFocusedDate ] = useState( value ?? defaultValue );
	const [ selectedDate, setSelectedDate ] = useControlledState( value, null );

	const isDateDisabled = useIsDateDisabled( props );
	const isPrevMonthDisabled = useIsPrevMonthDisabled( props );
	const isNextMonthDisabled = useIsNextMonthDisabled( props );

	return {
		datePickerProps: { selectedDate, setSelectedDate, focusedDate, setFocusedDate, isDateDisabled, isPrevMonthDisabled, isNextMonthDisabled },
		resetSelectedDate: useCallback( () => {
			setFocusedDate( selectedDate ?? value ?? defaultValue );
		}, [ selectedDate, valueProp, defaultValue ] )
	}
}

export default useDatePickerProps;