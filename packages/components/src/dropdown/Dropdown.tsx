import { generateComponentClasses, styled } from '@yith/styles';
import { noop } from 'lodash';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import Popover from '../popover';
import { useMergedRefs, useMainView } from "../utils";
import Paper from "../paper";

import type { DropdownCallbackArgs, DropdownProps } from "./types";
import classNames from "classnames";
import { FocusTrap } from "../focus-trap";
import { DropdownProvider } from "./context";

const useComponentClasses = () => {
	return generateComponentClasses(
		'Dropdown',
		{
			popover: [ 'popover' ],
			content: [ 'content' ],
		}
	)
}

const DropdownPopover = styled( Popover, { name: 'Dropdown', slot: 'Popover' } )``;

const DropdownContent = styled( Paper, { name: 'Dropdown', slot: 'Content' } )( ( { theme } ) => ( {
	background: theme.palette.background.dropdown,
	overflow: 'hidden'
} ) );

/**
 * The Dropdown component allows you to easily create a custom dropdown, by customizing the "toggle" and the "content" to be shown.
 */
const Dropdown = forwardRef<HTMLElement, DropdownProps>( function Dropdown(
	{
		onOpen = noop,
		onClose = noop,
		renderToggle,
		renderContent,
		popoverProps,
		disableEscapeKeyDown = false,
		disableRestoreFocus = false,
		disableAutoFocus = false,
		disableConstrainedFocus = false,
	},
	forwardedRef
) {
	const localToggleRef = useRef<HTMLElement>();
	const [ isOpen, setIsOpen ] = useState( false );
	const wasFirstOpened = useRef( false );
	const classes = useComponentClasses();

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

	const args: DropdownCallbackArgs = { isOpen, toggle, close, open, ref: toggleRef };
	const providerProps: Omit<React.ComponentProps<typeof DropdownProvider>, 'children'> = { isOpen, toggle, close, open };

	const handleKeyDown = ( event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent ) => {
		if ( !disableEscapeKeyDown && [ 'Esc', 'Escape' ].includes( event.key ) ) {
			event.stopPropagation();
			close();
		}
	};

	useMainView( isOpen, { onEscapeKeyDown: handleKeyDown, disableScrollLock: true } );

	return (
		<DropdownProvider { ...providerProps }>
			{ React.cloneElement( renderToggle( args ), { ref: toggleRef } ) }
			{ isOpen && (
				<DropdownPopover
					role='dialog'
					aria-modal={ true }
					forceInView='horizontally'
					verticalMargin={ 8 }
					{ ...popoverProps }
					className={ classNames( classes.popover, popoverProps?.className ) }
					anchorRef={ localToggleRef.current }
					onClickOutside={ close }
					onKeyDown={ handleKeyDown }
				>
					<FocusTrap open disableRestoreFocus={ disableRestoreFocus } disableAutoFocus={ disableAutoFocus } disableConstrainedFocus={ disableConstrainedFocus }>
						<DropdownContent
							className={ classes.content }
							elevation={ 5 }
							shadowColor='primaryGlow'
						>
							{ renderContent( args ) }
						</DropdownContent>
					</FocusTrap>
				</DropdownPopover>
			) }
		</DropdownProvider>
	);
} );

export default Dropdown;
