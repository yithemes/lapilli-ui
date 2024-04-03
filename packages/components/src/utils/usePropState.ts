import { useState } from "react";
import isEqual from "./internals/isEqual";

/**
 * Enhance the useState hook with the strong dependency by the defaultValue, so
 * when the default value changes, the state changes too.
 *
 * @param defaultValue
 */
export default function usePropState<T>( defaultValue: T ): [ T, React.Dispatch<React.SetStateAction<T>> ] {
	const [ value, setValue ] = useState( defaultValue );
	const [ prevValue, setPrevValue ] = useState( defaultValue );

	if ( !isEqual( defaultValue, prevValue ) ) {
		setPrevValue( defaultValue )
		setValue( defaultValue )
	}

	return [ value, setValue ];
}
