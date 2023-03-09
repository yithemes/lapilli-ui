import { styled, SxProps, Theme } from '@yith/styles';
import { noop } from 'lodash';
import React from 'react';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import Popover, { PopoverProps } from '../popover';
import { useMergedRefs } from "../utils";

type DropdownProps = {
	/**
	 * Callback triggered when the dropdown is opened.
	 */
	onOpen?: () => void;
	/**
	 * Callback triggered when the dropdown is closed.
	 */
	onClose?: () => void;
	/**
	 * Callback triggered to render the toggle element.
	 */
	renderToggle: ( args: DropdownCallbackArgs ) => React.ReactNode;
	/**
	 * Callback triggered to render the content.
	 */
	renderContent: ( args: DropdownCallbackArgs ) => React.ReactNode;
	/**
	 * Props to be passed to the Popover component.
	 */
	popoverProps?: PopoverProps & { sx?: SxProps };
};

type DropdownCallbackArgs = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onOpen: () => void;
	ref: Ref<HTMLElement>;
};

const DropdownContent = styled( 'div', { name: 'Dropdown', slot: 'Popover' } )`
	${ ( { theme }: { theme: Theme } ) => {
	return {
		borderRadius: theme.shape.borderRadius,
		background: theme.palette.background.dropdown,
		boxShadow: '0 2px 8px 0 rgba(135, 162, 164, .48)',
		overflow: 'hidden'
	};
} }
`;

const Dropdown = forwardRef<HTMLElement, DropdownProps>( function Dropdown(
	{
		onOpen = noop,
		onClose = noop,
		renderToggle,
		renderContent,
		popoverProps
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

	return (
		<>
			{ renderToggle( args ) }
			{ isOpen && (
				<Popover
					{ ...popoverProps }
					forceInView='horizontally'
					verticalMargin={ 10 }
					anchorRef={ localToggleRef.current }
					onClose={ close }
					role='dialog'
					aria-modal={ true }
				>
					<DropdownContent>{ renderContent( args ) }</DropdownContent>
				</Popover>
			) }
		</>
	);
} );

export default Dropdown;
