import type { DependencyList, RefCallback } from 'react';
import { useCallback, useRef } from "react";

type CleanupCallback = ( () => void ) | void;

export default function useRefEffect<T = Node>(
	callback: ( node: T ) => CleanupCallback,
	dependencies: DependencyList
): RefCallback<T | null> {
	const cleanup = useRef<CleanupCallback>();
	return useCallback( ( node: T | null ) => {
		if ( node ) {
			cleanup.current = callback( node );
		} else if ( cleanup.current ) {
			cleanup.current();
		}
	}, dependencies );
}