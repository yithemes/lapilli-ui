import { useCallback, useEffect, useRef } from "react";

const modals = new Set();
let lastIndex = 0;

type SingleModalOptions = {
	onEscapeKeyDown?: ( event: KeyboardEvent ) => void
}

export default function useSingleModal( isEnabled = true, options: SingleModalOptions = {} ) {
	const indexRef = useRef( 0 );

	useEffect( () => {
		if ( isEnabled ) {
			lastIndex += 1;

			indexRef.current = lastIndex;
			modals.add( indexRef.current );

		} else {
			modals.delete( indexRef.current );
		}
		return () => {
			if ( isEnabled ) {
				modals.delete( indexRef.current );
			}
		};

	}, [ isEnabled ] );

	const getTopModal = useCallback( () => modals.size > 0 ? [ ...modals ].at( -1 ) : -1, [ isEnabled, modals ] );
	const isTopModal = useCallback( () => getTopModal() === indexRef.current, [ getTopModal ] );

	const handleEscapeKeyDown = ( event: KeyboardEvent ) => {
		if ( isTopModal() && [ 'Esc', 'Escape' ].includes( event.key ) ) {
			options?.onEscapeKeyDown?.( event );
			event.stopPropagation();
		}
	}

	useEffect( () => {
		document.addEventListener( 'keydown', handleEscapeKeyDown );
		return () => {
			document.removeEventListener( 'keydown', handleEscapeKeyDown );
		}
	}, [] );

	return { isTopModal };
}
