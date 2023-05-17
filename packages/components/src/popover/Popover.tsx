import { createPortal } from 'react-dom';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { styled } from '@yith/styles';
import type { PopoverComputedPosition, PopoverComputePositionProps } from "./types.internal";
import type { PopoverProps } from "./types";

const PopoverRoot = styled( 'div', { name: 'Popover', slot: 'Root' } )`
	position: fixed;
	z-index: 9999999;
	display: flex;
	flex-direction: column;
	height: fit-content;
`;

const getAnchorRect = ( anchorRef: HTMLElement ) => {
	return typeof anchorRef?.getBoundingClientRect === 'function' ? anchorRef.getBoundingClientRect() : null;
};

const computePopoverPosition = ( {
									 anchorRect,
									 container,
									 position,
									 verticalMargin = 0,
									 forceMinWidth,
									 forceInView = true
								 }: PopoverComputePositionProps ) => {
	let [ yPos, xPos ] = position.split( ' ' );
	const computed: PopoverComputedPosition = {} as PopoverComputedPosition;
	const containerRect = container.getBoundingClientRect();

	const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;

	let minWidth = 0;

	if ( true === forceMinWidth ) {
		minWidth = anchorRect.width;
	} else if ( false !== forceMinWidth ) {
		minWidth = forceMinWidth;
	}

	const positions = {
		left: anchorRect.left,
		right: viewportWidth - anchorRect.right,
		top: anchorRect.top + anchorRect.height + verticalMargin,
		bottom: viewportHeight - anchorRect.top + verticalMargin,
	};

	const allowedXPos = [];
	if ( positions.left + containerRect.width <= viewportWidth ) {
		allowedXPos.push( 'left' );
	}
	if ( positions.right + containerRect.width <= viewportWidth ) {
		allowedXPos.push( 'right' );
	}

	if ( !allowedXPos.length ) {
		// Choose the best one.
		if ( positions.left < positions.right ) {
			allowedXPos.push( 'left' );
		} else {
			allowedXPos.push( 'right' );
		}
	}

	const allowedYPos = [];
	if ( positions.top + containerRect.height <= viewportHeight ) {
		allowedYPos.push( 'bottom' );
	}
	if ( positions.bottom + containerRect.height <= viewportHeight ) {
		allowedYPos.push( 'top' );
	}

	if ( !allowedYPos.length ) {
		// Choose the best one.
		if ( positions.top < positions.bottom ) {
			allowedYPos.push( 'bottom' );
		} else {
			allowedYPos.push( 'top' );
		}
	}

	xPos = !allowedXPos.includes( xPos ) ? allowedXPos[ 0 ] : xPos;
	yPos = !allowedYPos.includes( yPos ) ? allowedYPos[ 0 ] : yPos;

	if ( 'left' === xPos ) {
		computed.left = positions.left;
	} else {
		computed.right = positions.right;
	}

	if ( 'bottom' === yPos ) {
		computed.top = positions.top;
	} else {
		computed.bottom = positions.bottom;
	}

	if ( [ true, 'horizontally' ].includes( forceInView ) ) {
		computed?.left && ( computed.left = Math.max( 0, computed.left ) );
		computed?.right && ( computed.right = Math.max( 0, computed.right ) );

		computed.maxWidth = viewportWidth - ( computed?.left ?? computed?.right );
	}

	if ( [ true, 'vertically' ].includes( forceInView ) ) {
		computed?.top && ( computed.top = Math.max( 0, computed.top ) );
		computed?.bottom && ( computed.bottom = Math.max( 0, computed.bottom ) );

		computed.maxHeight = viewportHeight - ( computed?.top ?? computed?.bottom );
	}

	if ( minWidth ) {
		computed.minWidth = minWidth;

		if ( typeof computed.maxWidth !== 'undefined' ) {
			computed.minWidth = Math.min( computed.minWidth, computed.maxWidth );
		}
	}

	computed.xPos = 'left' in computed ? 'left' : 'right';
	computed.yPos = 'top' in computed ? 'bottom' : 'top';

	const { offsetParent } = container;

	/**
	 * If there is a positioned ancestor element that is not the body,
	 * subtract the position from the anchor rect.
	 * Useful in case of disabling the Portal.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
	 */
	if ( offsetParent && offsetParent !== document.body ) {
		const offsetParentRect = offsetParent.getBoundingClientRect();
		typeof computed.left !== 'undefined' && ( computed.left -= offsetParentRect.left );
		typeof computed.right !== 'undefined' && ( computed.right -= viewportWidth - offsetParentRect.right );
		typeof computed.top !== 'undefined' && ( computed.top -= offsetParentRect.top );
		typeof computed.bottom !== 'undefined' && ( computed.bottom -= viewportHeight - offsetParentRect.bottom );
	}

	return computed;
};

const cssSize = ( size?: number | string ) => {
	if ( size === undefined ) {
		return '';
	}
	return typeof size === 'string' ? size : `${ size }px`;
};

const setStyles = ( element: HTMLElement, styles: React.CSSProperties ) => {
	Object.assign( element.style, styles );
};

function setAttribute( element: HTMLElement, prop: string, value: string ) {
	if ( !value ) {
		if ( element.hasAttribute( prop ) ) {
			element.removeAttribute( prop );
		}
	} else if ( element.getAttribute( prop ) !== value ) {
		element.setAttribute( prop, value );
	}
}

function Popover(
	{
		anchorRef,
		position = 'bottom left',
		children,
		verticalMargin = 0,
		onClickOutside,
		forceMinWidth = false,
		disablePortal = false,
		forceInView = true,
		...other
	}: PopoverProps
) {
	const containerRef = useRef<HTMLDivElement>( null );
	const syntheticEventRef = useRef( false );

	// Keep track of click events that bubbled up through the portal.
	const handleSynthetic = () => {
		syntheticEventRef.current = true;
	};

	useLayoutEffect( () => {
		if ( !containerRef.current || !anchorRef ) {
			return;
		}

		const refresh = () => {
			const container = containerRef.current;
			const anchorRect = getAnchorRect( anchorRef );

			if ( container && anchorRect ) {
				const popoverPosition = computePopoverPosition( {
					anchorRect,
					container,
					position,
					verticalMargin,
					forceMinWidth,
					forceInView
				} );

				setStyles(
					container,
					{
						left: cssSize( popoverPosition.left ),
						right: cssSize( popoverPosition.right ),
						top: cssSize( popoverPosition.top ),
						bottom: cssSize( popoverPosition.bottom ),
						maxWidth: cssSize( popoverPosition.maxWidth ),
						maxHeight: cssSize( popoverPosition.maxHeight ),
						minWidth: cssSize( popoverPosition.minWidth ),
					}
				);

				setAttribute( container, 'data-x-pos', popoverPosition.xPos );
				setAttribute( container, 'data-y-pos', popoverPosition.yPos );
			}
		};

		refresh();

		/**
		 * It's useful refreshing position with some interval,
		 * since there are something that can skip at resize/scroll events.
		 * So, we can refresh position each 0.5 seconds.
		 */
		const refreshInterval = setInterval( refresh, 500 );

		window.addEventListener( 'resize', refresh );
		window.addEventListener( 'scroll', refresh, true );

		return () => {
			!!refreshInterval && clearInterval( refreshInterval );

			window.removeEventListener( 'resize', refresh );
			window.removeEventListener( 'scroll', refresh );
		};
	}, [ anchorRef ] );

	const handleClickOutside = ( event: MouseEvent ) => {
		if ( containerRef?.current && event?.target ) {
			// The container MUST exist.
			const theTarget = event.target as HTMLElement;
			const isContainerClick = containerRef.current.contains( theTarget );
			const isAnchorClick = anchorRef && anchorRef.contains( theTarget );
			const isInsideReactTree = syntheticEventRef.current;
			syntheticEventRef.current = false;

			if ( !isContainerClick && !isAnchorClick && !isInsideReactTree ) {
				onClickOutside?.( event );
			}
		}
	};

	useEffect( () => {
		document.addEventListener( 'mousedown', handleClickOutside );
		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
			syntheticEventRef.current = false;
		};
	} );

	const popover = (
		<PopoverRoot role="presentation" { ...other } ref={ containerRef } onMouseDown={ handleSynthetic }>
			{ children }
		</PopoverRoot>
	);

	return disablePortal ? popover : createPortal( popover, document.body );
}

export default Popover;
