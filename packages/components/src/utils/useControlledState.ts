import { useCallback, useRef, useState } from 'react';

type SetStateAction<T> = ( newValue: T | ( ( prevState: T ) => T ) ) => void;

export default function useControlledState<T extends any>(
	controlledValue: T | undefined,
	defaultValue: T
): [ T, SetStateAction<T> ] {
	const { current: isControlled } = useRef( typeof controlledValue !== 'undefined' );
	const [ stateValue, setStateValue ] = useState( defaultValue ); // Don't use usePropState here, since the defaultValue in controlled components CANNOT be changed after rendering.
	const value = isControlled ? controlledValue : stateValue;

	const setValue: SetStateAction<T> = useCallback( newValue => {
		if ( !isControlled ) {
			setStateValue( newValue );
		}
	}, [] );

	return [ value as T, setValue ];
}
