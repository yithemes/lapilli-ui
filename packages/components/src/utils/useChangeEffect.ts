import { useEffect, useRef } from "react";
import isEqual from "./internals/isEqual";

/**
 * Check for value change and trigger an "effect" when the value changes.
 *
 * @param value
 * @param effect
 */
export default function useChangeEffect<T>(
	value: T,
	effect: ( prev: T, current: T ) => void
) {
	const prevRef = useRef<T>( value )
	const { current: prevValue } = prevRef

	useEffect( () => {
		if ( !isEqual( value, prevValue ) ) {
			prevRef.current = value
			effect( prevValue, value )
		}
	}, [ value ] );
}
