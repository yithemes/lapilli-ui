import React, { useCallback, useEffect, useRef } from "react";

const container = document.body;
const mainViews = new Set();
let lastIndex = 0;

type MainViewOptions = {
	onEscapeKeyDown?: ( event: KeyboardEvent ) => void
	disableScrollLock?: boolean
}

type StylesToRestore = React.CSSProperties

function getBodyScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

function hasBodyScrollbar(): boolean {
	return getBodyScrollbarWidth() > 0;
}

function getBodyPaddingRight() {
	return parseInt( window.getComputedStyle( document.body ).paddingRight ?? 0, 10 );
}

export default function useMainView( enabled = true, options: MainViewOptions = {} ) {
	const indexRef = useRef( 0 );
	const { disableScrollLock = false } = options;

	useEffect( () => {
		const stylesToRestore: StylesToRestore = {};

		if ( enabled && !disableScrollLock && hasBodyScrollbar() ) {
			stylesToRestore.overflow = container.style.overflow;
			stylesToRestore.paddingRight = container.style.paddingRight;

			container.style.paddingRight = `${ getBodyPaddingRight() + getBodyScrollbarWidth() }px`;
			container.style.overflow = 'hidden';
		}

		return () => {
			Object.assign( container.style, stylesToRestore );
		};
	}, [ enabled, disableScrollLock ] );

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