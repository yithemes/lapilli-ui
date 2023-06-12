import React, { useRef } from "react";
import { useRefEffect } from "./index";

export default function useRelatedLabelFocus<T extends HTMLElement>( id?: string ): React.RefCallback<T> {
	const labelId = useRef( '' );

	return useRefEffect<T>( ( node ) => {
		const nodeId: string = id ?? node.getAttribute( 'id' ) ?? '';
		let relatedLabel = nodeId && document.querySelector( `label[for="${ nodeId }"]` );
		let useLabelledBy = true;
		if ( !relatedLabel ) {
			relatedLabel = node.closest( 'label' );
			useLabelledBy = false; // If the component is wrapped in a label, we don't want to use labelled-by to prevent repetitions of the texts contained in the component.
		}
		if ( !relatedLabel ) {
			return;
		}
		const onLabelClick = () => node && node?.focus();
		const maybeSetLabelledBy = ( labelledBy: string ) => node && !node.getAttribute( 'aria-labelledby' ) && node.setAttribute( 'aria-labelledby', labelledBy );
		const generatedLabelId = nodeId + '__label';

		relatedLabel.addEventListener( 'click', onLabelClick );

		if ( useLabelledBy ) {
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

				if ( useLabelledBy && labelId.current && relatedLabel.getAttribute( 'id' ) === generatedLabelId ) {
					relatedLabel.removeAttribute( 'id' );
				}
			}
			labelId.current = '';
		}
	}, [ id ] );
}