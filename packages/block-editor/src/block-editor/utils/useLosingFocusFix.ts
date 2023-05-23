import { useEffect, useRef } from "react";

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

	useEffect( () => {
		let activeElement: HTMLElement | null;
		const onMouseLeave = ( event: MouseEvent ) => {
			const target = event.target as HTMLElement;

			if ( !target || !rootRef.current || !rootRef.current.contains( target ) ) {
				return;
			}

			if ( event.buttons !== 1 ) {
				return;
			}

			if ( !target.getAttribute( 'contenteditable' ) || target.classList.contains( 'block-editor-writing-flow' ) ) {
				return;
			}

			activeElement = target as HTMLElement;
			window.addEventListener( 'mouseup', onMouseUp );
		}

		const onMouseUp = () => {
			window.removeEventListener( 'mouseup', onMouseUp );
			if ( !activeElement ) {
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