import { useCallback, useEffect, useRef } from "react";

function isWritingFlow( node: HTMLElement ) {
	return node.classList.contains( 'block-editor-writing-flow' );
}

function isContentEditable( node: HTMLElement ) {
	return node.getAttribute( 'contenteditable' );
}

/**
 * Fix Gutenberg BlockEditor issue when finishing text selection outside the writing-flow container,
 * by returning focus on 'mouseup' event to the last active element (e.g. a 'paragraph block').
 *
 * To replicate the issue:
 * - start selecting a text from the right side
 * - select the entire row, moving the mouse outside the block editor wrapper
 * - release the mouse button
 * - press Delete (to delete the text) or type something to replace the text
 * Without the fix, the last point should fail.
 */
export function useLosingFocusFix() {
	const rootRef = useRef<HTMLDivElement>( null );

	const isInRoot = useCallback( ( node: HTMLElement ) => {
		return rootRef.current && rootRef.current.contains( node );
	}, [] );

	useEffect( () => {
		let activeElement: HTMLElement | null;
		const onMouseLeave = ( event: MouseEvent ) => {
			const target = event.target as HTMLElement;

			if ( !target || !isInRoot( target ) ) {
				return;
			}

			if ( event.buttons !== 1 ) {
				return;
			}

			if ( !isContentEditable( target ) || isWritingFlow( target ) ) {
				return;
			}

			activeElement = target as HTMLElement;
			window.addEventListener( 'mouseup', onMouseUp );
		}

		const onMouseUp = ( event: MouseEvent ) => {
			window.removeEventListener( 'mouseup', onMouseUp );
			if ( !activeElement ) {
				return;
			}

			const target = event.target as HTMLElement;

			if ( target && isInRoot( target ) && !isWritingFlow( target ) ) {
				return;
			}

			setTimeout( () => {
				if ( activeElement ) {
					activeElement.focus();
					activeElement = null;
				}
			}, 10 )
		}

		document.addEventListener( 'mouseout', onMouseLeave );

		return () => {
			document.removeEventListener( 'mouseout', onMouseLeave );
		}
	}, [] );

	return rootRef;
}