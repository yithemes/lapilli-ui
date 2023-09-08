import React, { CSSProperties, forwardRef, useRef } from 'react';
import { Transition } from "react-transition-group";
import { styled } from '@lapilli-ui/styles';

import type { CollapseStyled, CollapseProps } from "./types";
import { useMergedRefs } from "../utils";

const TIMEOUT = 300;

const createTransition = ( prop: CSSProperties["transitionProperty"] ): CSSProperties['transition'] => `${ prop } ${ TIMEOUT }ms ease-in-out`

const CollapseRoot = styled( 'div', { name: 'Collapse', slot: 'Root' } )<CollapseStyled>( ( { ownerState } ) => ( {
	transition: createTransition( 'height' ),
	overflow: 'hidden',
	height: 0,
	...( ownerState.orientation === 'horizontal' && {
		height: 'auto',
		width: 0,
		transition: createTransition( 'width' ),
	} ),
	...( ownerState.state === 'entered' && {
		height: 'auto',
		overflow: 'visible',
		...( ownerState.orientation === 'horizontal' && {
			width: 'auto',
		} ),
	} ),
	...( ownerState.state === 'exited' &&
		!ownerState.open &&
		ownerState.collapsedSize === '0px' && {
			visibility: 'hidden',
		} ),
} ) );

const CollapseWrapper = styled( 'div', { name: 'Collapse', slot: 'Wrapper' } )( () => ( {} ) );

/**
 * The Collapse component allows you to create a collapsible box, that can be easily opened and collapsed through the `open` prop.
 */
const Collapse = forwardRef<HTMLDivElement, CollapseProps>( function Collapse(
	{
		children,
		open = false,
		orientation = 'vertical',
		collapsedSize = 0,
		...props
	},
	ref
) {
	const rootRef = useRef<HTMLDivElement>( null );
	const wrapperRef = useRef<HTMLDivElement>( null );
	const mergedRef = useMergedRefs( rootRef, ref );
	const isHorizontal = orientation === 'horizontal';
	const size = isHorizontal ? 'width' : 'height';
	const collapsedSizeCss = typeof collapsedSize === "number" ? ( collapsedSize + 'px' ) : collapsedSize;

	const getWrapperSize = () => wrapperRef.current ? ( isHorizontal ? wrapperRef.current.clientWidth : wrapperRef.current.clientHeight ) : 0;
	const setWrapperPosition = ( position: string ) => wrapperRef.current && ( wrapperRef.current.style.position = position );

	const handleEnter = ( node: HTMLElement ) => {
		// Use absolute position to correctly get the size of the content.
		isHorizontal && setWrapperPosition( 'absolute' );

		node.style[ size ] = collapsedSizeCss;
	};

	const handleEntering = ( node: HTMLElement ) => {
		node.style[ size ] = `${ getWrapperSize() }px`;

		// Reset the position, since we've already retrieved the needed size.
		isHorizontal && setWrapperPosition( '' );
	}

	const handleEntered = ( node: HTMLElement ) => {
		node.style[ size ] = 'auto';
	}

	const handleExit = ( node: HTMLElement ) => {
		node.style[ size ] = `${ getWrapperSize() }px`;
	}

	const handleExiting = ( node: HTMLElement ) => {
		getWrapperSize(); // Trigger to get the size, so the browser will wait for the sizing.
		node.style[ size ] = collapsedSizeCss;
	}

	return <Transition
		in={ open }
		onEnter={ handleEnter }
		onEntering={ handleEntering }
		onEntered={ handleEntered }
		onExit={ handleExit }
		onExiting={ handleExiting }
		timeout={ TIMEOUT }
	>
		{ ( state ) => (
			<CollapseRoot
				{ ...props }
				ref={ mergedRef }
				style={ {
					[ 'vertical' === orientation ? 'minHeight' : 'minWidth' ]: collapsedSize,
					padding: state,
					...props?.style
				} }
				ownerState={ {
					open,
					orientation,
					collapsedSize,
					state
				} }
			>
				<CollapseWrapper ref={ wrapperRef }>
					{ children }
				</CollapseWrapper>
			</CollapseRoot>
		) }
	</Transition>
} );

export default Collapse;
