import { useLayoutEffect, useRef } from "react";

/**
 * Check for value change before rendering.
 * It can be used instead of useEffect on a single property,
 * to execute the effect on rendering, instead of waiting for re-rendering.
 * Please note: it uses useLayoutEffect under the wood, so when possible prefer using
 * useEffect for better performance.
 *
 * @param value
 * @param effect
 */
export default function useChangeLayoutEffect<T>(
	value: T,
	effect: ( prev: T, current: T ) => void
) {
	const prevRef = useRef<T>( value );

	useLayoutEffect( () => {
		const { current: prevValue } = prevRef;

		if ( prevValue !== value ) {
			effect( prevValue, value );
		}

		prevRef.current = value;
	}, [ value ] )
}
