import type { DatePickerProps } from "../types";
import { useCallback } from "react";
import { useControlledState } from "../../utils";
import useIsDateDisabled from "./useIsDateDisabled";
import { useIsNextMonthDisabled, useIsPrevMonthDisabled } from "./date-helper-hooks";
import useDatePickerDefaultFocused from "./useDatePickerDefaultFocused";
import usePropState from "../../utils/usePropState";

const useDatePickerProps = ( props: DatePickerProps ) => {
	const {
		value: valueProp,
		defaultValue: defaultValueProp
	} = props;

	const defaultFocused = useDatePickerDefaultFocused( props );
	const defaultValue = typeof defaultValueProp !== 'undefined' ? ( typeof defaultValueProp === 'string' ? new Date( defaultValueProp ) : defaultValueProp ) : undefined;
	const value = typeof valueProp !== 'undefined' ? ( typeof valueProp === 'string' ? new Date( valueProp ) : valueProp ) : undefined;
	const [ focusedDate, setFocusedDate ] = usePropState( value ?? defaultValue ?? defaultFocused );
	const [ selectedDate, setSelectedDate ] = useControlledState( value, defaultValue ?? null );

	const isDateDisabled = useIsDateDisabled( props );
	const isPrevMonthDisabled = useIsPrevMonthDisabled( props );
	const isNextMonthDisabled = useIsNextMonthDisabled( props );

	return {
		datePickerProps: { selectedDate, setSelectedDate, focusedDate, setFocusedDate, isDateDisabled, isPrevMonthDisabled, isNextMonthDisabled },
		resetSelectedDate: useCallback( () => {
			setFocusedDate( selectedDate ?? value ?? defaultFocused );
		}, [ selectedDate, valueProp, defaultFocused ] )
	}
}

export default useDatePickerProps;