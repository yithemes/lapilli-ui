import { styled } from '@yith/styles';
import { noop } from 'lodash';
import React from 'react';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import Popover, { PopoverProps } from '../popover';
import { useMergedRefs } from "../utils";
import useMainView from "../utils/useMainView";

type DropdownProps = {
	/**
	 * Callback triggered when the dropdown is opened.
	 */
	onOpen?: () => void
	/**
	 * Callback triggered when the dropdown is closed.
	 */
	onClose?: () => void
	/**
	 * Callback triggered to render the toggle element.
	 */
	renderToggle: ( args: DropdownCallbackArgs ) => React.ReactElement
	/**
	 * Callback triggered to render the content.
	 */
	renderContent: ( args: DropdownCallbackArgs ) => React.ReactElement
	/**
	 * Props to be passed to the Popover component.
	 */
	popoverProps?: PopoverProps
	/**
	 * If `true`, hitting the escape key will not close the dropdown.
	 */
	disableEscapeKeyDown?: boolean
};

type DropdownCallbackArgs = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onOpen: () => void;
	ref: Ref<HTMLElement>;
};

const DropdownContent = styled( 'div', { name: 'Dropdown', slot: 'Content' } )( ( { theme } ) => ( {
	borderRadius: theme.shape.borderRadius,
	background: theme.palette.background.dropdown,
	boxShadow: '0 2px 8px 0 rgba(135, 162, 164, .48)',
	overflow: 'hidden'
} ) );

const Dropdown = forwardRef<HTMLElement, DropdownProps>( function Dropdown(
	{
		onOpen = noop,
		onClose = noop,
		renderToggle,
		renderContent,
		popoverProps,
		disableEscapeKeyDown = false,
	},
	forwardedRef
) {
	const localToggleRef = useRef<HTMLElement>();
	const [ isOpen, setIsOpen ] = useState( false );
	const wasFirstOpened = useRef( false );

	useEffect( () => {
		if ( !wasFirstOpened.current && isOpen ) {
			wasFirstOpened.current = true;
		}

		if ( wasFirstOpened.current ) {
			if ( isOpen ) {
				onOpen();
			} else {
				onClose();
			}
		}
	}, [ isOpen ] );

	const toggleRef = useMergedRefs( forwardedRef, localToggleRef );

	const toggle = () => {
		setIsOpen( _ => !_ );
	};

	const close = () => setIsOpen( false );
	const open = () => setIsOpen( true );

	const args: DropdownCallbackArgs = { isOpen, onToggle: toggle, onClose: close, onOpen: open, ref: toggleRef };

	const handleKeyDown = ( event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent ) => {
		if ( !disableEscapeKeyDown && [ 'Esc', 'Escape' ].includes( event.key ) ) {
			event.stopPropagation();
			close();
		}
	};

	useMainView( isOpen, { onEscapeKeyDown: handleKeyDown } );

	return (
		<>
			{ React.cloneElement( renderToggle( args ), { ref: toggleRef } ) }
			{ isOpen && (
				<Popover
					{ ...popoverProps }
					forceInView='horizontally'
					verticalMargin={ 8 }
					anchorRef={ localToggleRef.current }
					onClickOutside={ close }
					role='dialog'
					aria-modal={ true }
					onKeyDown={ handleKeyDown }
				>
					<DropdownContent>{ renderContent( args ) }</DropdownContent>
				</Popover>
			) }
		</>
	);
} );

export default Dropdown;
