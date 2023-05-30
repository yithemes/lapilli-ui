import React, { useRef } from "react";
import { useRefEffect } from "./index";

export default function useRelatedLabelFocus<T extends HTMLElement>( id?: string ): React.RefCallback<T> {
	const labelId = useRef( '' );

	return useRefEffect<T>( ( node ) => {
		if ( !id ) {
			return;
		}
		const onLabelClick = () => node && node?.focus();
		const maybeSetLabelledBy = ( labelledBy: string ) => node && !node.getAttribute( 'aria-labelledby' ) && node.setAttribute( 'aria-labelledby', labelledBy );
		const generatedLabelId = id + '__label';

		const relatedLabel = document.querySelector( `label[for="${ id }"]` );
		relatedLabel && relatedLabel.addEventListener( 'click', onLabelClick );

		if ( relatedLabel ) {
			const relatedLabelId = relatedLabel.getAttribute( 'id' );
			if ( !relatedLabelId ) {
				labelId.current = generatedLabelId;
				relatedLabel.setAttribute( 'id', generatedLabelId );
				maybeSetLabelledBy( generatedLabelId );
			} else {
				maybeSetLabelledBy( relatedLabelId );
			}
		}

		return () => {
			if ( relatedLabel ) {
				relatedLabel.removeEventListener( 'click', onLabelClick );

				if ( labelId.current && relatedLabel.getAttribute( 'id' ) === generatedLabelId ) {
					relatedLabel.removeAttribute( 'id' );
				}
			}
			labelId.current = '';
		}
	}, [ id ] );
}