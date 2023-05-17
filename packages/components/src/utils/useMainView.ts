import { useCallback, useEffect, useRef } from "react";

const mainViews = new Set();
let lastIndex = 0;

type SingleModalOptions = {
	onEscapeKeyDown?: ( event: KeyboardEvent ) => void
}

export default function useMainView( enabled = true, options: SingleModalOptions = {} ) {
	const indexRef = useRef( 0 );

	useEffect( () => {
		if ( enabled ) {
			lastIndex += 1;

			indexRef.current = lastIndex;
			mainViews.add( indexRef.current );

		} else {
			mainViews.delete( indexRef.current );
		}

		return () => {
			if ( enabled ) {
				mainViews.delete( indexRef.current );
			}
		};

	}, [ enabled ] );

	const getMainView = useCallback( () => mainViews.size > 0 ? [ ...mainViews ].at( -1 ) : -1, [ enabled, mainViews ] );
	const isMainView = useCallback( () => getMainView() === indexRef.current, [ getMainView ] );

	const handleEscapeKeyDown = ( event: KeyboardEvent ) => {
		if ( options?.onEscapeKeyDown && isMainView() && [ 'Esc', 'Escape' ].includes( event.key ) ) {
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
}
