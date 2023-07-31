import { useEffect, useRef, useState } from "react";

/**
 * Enhance the useState hook with the strong dependency by the defaultValue, so
 * when the default value changes, the state changes too.
 *
 * @param defaultValue
 */
export default function usePropState<T>( defaultValue: T ): [ T, React.Dispatch<React.SetStateAction<T>> ] {
	const [ value, setValue ] = useState( defaultValue );
	const prevValueRef = useRef( defaultValue );

	useEffect( () => {
		if ( defaultValue !== prevValueRef.current ) {
			setValue( defaultValue );
			prevValueRef.current = defaultValue;
		}
	}, [ defaultValue ] );

	return [ value, setValue ];
}
