import React, { useCallback, useEffect, useRef } from "react";

import type { FocusTrapProps } from "./types";
import { getFocusable } from "./getFocusable";
import { useMergedRefs } from "../utils";

export default function FocusTrap(
	{
		open,
		children,
		disableAutoFocus = false,
		disableConstrainedFocus = false,
		disableRestoreFocus = false,
	}: FocusTrapProps ) {
	const mainRef = useRef<HTMLElement>( null );
	const sentinelStart = useRef<HTMLDivElement>( null );
	const sentinelEnd = useRef<HTMLDivElement>( null );
	// @ts-ignore
	const childrenRef = useMergedRefs( children?.ref, mainRef );
	const nodeToRestore = useRef<EventTarget | null>( null );

	const handleChildrenFocus = useCallback( ( event: React.FocusEvent ) => {
		if ( nodeToRestore.current === null ) {
			nodeToRestore.current = event.relatedTarget;
		}
		children.props.onFocus?.( event );
	}, [] );

	useEffect( () => {
		if ( !open || !mainRef.current ) {
			return;
		}

		if ( !disableAutoFocus ) {
			const elements = getFocusable( mainRef.current );
			elements.length && elements[ 0 ].focus();
		}

		return () => {
			if ( !disableRestoreFocus && nodeToRestore.current && ( nodeToRestore.current as HTMLElement )?.focus ) {
				( nodeToRestore.current as HTMLElement ).focus();
			}
			nodeToRestore.current = null;
		}

	}, [ open, mainRef, disableAutoFocus, disableRestoreFocus ] );

	const handleSentinelFocus = useCallback( ( event: React.FocusEvent<HTMLDivElement> ) => {
		if ( nodeToRestore.current === null ) {
			nodeToRestore.current = event.relatedTarget;
		}

		if ( !open || !mainRef.current || disableConstrainedFocus ) {
			return;
		}

		const sentinel = event.target as HTMLDivElement;
		const isSentinelStart = sentinel === sentinelStart.current;
		const elements = getFocusable( mainRef.current );

		if ( elements.length ) {
			const first = elements[ 0 ];
			const last = elements[ elements.length - 1 ];

			if ( isSentinelStart ) {
				last.focus();
			} else {
				first.focus();
			}
		}
	}, [ open ] );

	return <>
		{ !disableConstrainedFocus && <div ref={ sentinelStart } tabIndex={ open ? 0 : -1 } onFocus={ handleSentinelFocus }/> }
		{ React.cloneElement( children, { ref: childrenRef, onFocus: handleChildrenFocus } ) }
		{ !disableConstrainedFocus && <div ref={ sentinelEnd } tabIndex={ open ? 0 : -1 } onFocus={ handleSentinelFocus }/> }
	</>;
}