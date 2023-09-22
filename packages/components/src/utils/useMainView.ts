import React, { useCallback, useEffect, useRef } from "react";
import { useDocument } from "../document-provider";

const mainViews = new Set();
let lastIndex = 0;

type MainViewOptions = {
	onEscapeKeyDown?: ( event: KeyboardEvent ) => void
	disableScrollLock?: boolean
}

type StylesToRestore = React.CSSProperties

const getWindow = ( document: Document ) => document.defaultView || window;

function getBodyScrollbarWidth( document: Document ) {
	return getWindow( document ).innerWidth - document.documentElement.clientWidth;
}

function hasBodyScrollbar( document: Document ): boolean {
	return getBodyScrollbarWidth( document ) > 0;
}

function getBodyPaddingRight( document: Document ) {
	return parseInt( getWindow( document ).getComputedStyle( document.body ).paddingRight ?? 0, 10 );
}

export default function useMainView( enabled = true, options: MainViewOptions = {} ) {
	const document = useDocument();
	const indexRef = useRef( 0 );
	const { disableScrollLock = false } = options;

	useEffect( () => {
		const stylesToRestore: StylesToRestore = {};
		if ( !document )
			return;

		const container = document.body;

		if ( enabled && !disableScrollLock && hasBodyScrollbar( document ) ) {
			stylesToRestore.overflow = container.style.overflow;
			stylesToRestore.paddingRight = container.style.paddingRight;

			container.style.paddingRight = `${ getBodyPaddingRight( document ) + getBodyScrollbarWidth( document ) }px`;
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
		document?.addEventListener( 'keydown', handleEscapeKeyDown );
		return () => {
			document?.removeEventListener( 'keydown', handleEscapeKeyDown );
		}
	}, [] );
}
