import React from "react";

function setRef<T>(
	ref: React.MutableRefObject<T | null> | ( ( instance: T | null ) => void ) | null | undefined,
	value: T | null,
): void {
	if ( typeof ref === 'function' ) {
		ref( value );
	} else if ( ref ) {
		ref.current = value;
	}
}

export default function useMergedRefs<T>(
	...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> | null {
	return React.useMemo( () => {
		if ( refs.every( ( ref ) => ref == null ) ) {
			return null;
		}

		return ( instance ) => {
			refs.forEach( ( ref ) => {
				setRef( ref, instance );
			} );
		};

	}, refs );
}