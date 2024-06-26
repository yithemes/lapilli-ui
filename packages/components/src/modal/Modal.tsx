import React, { forwardRef } from "react";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { Breakpoint, generateComponentClasses, keyframes, styled } from "@lapilli-ui/styles";

import type { ModalOwnerState, ModalProps, ModalStyled } from "./types";
import Portal from "../portal";
import Backdrop from "../backdrop";
import IconButton from "../icon-button";
import Paper from "../paper";
import { useMainView } from "../utils";
import { FocusTrap } from "../focus-trap";

const appearFromBottomAnimation = keyframes`
	from {
		opacity: 0;
		transform: translateY(30%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const ModalRoot = styled( 'div', { name: 'Modal', slot: 'Root' } )(
	( { theme } ) => ( {
		position: 'fixed',
		zIndex: theme.zIndex.modal,
		inset: '0px'
	} ) );

const ModalBackdrop = styled( Backdrop, { name: 'Modal', slot: 'Backdrop' } )( () => ( {
	zIndex: -1
} ) );

const ModalClose = styled( IconButton, { name: 'Modal', slot: 'Close' } )( () => ( {
	position: 'absolute',
	top: 4,
	right: 4,
	'& > svg': {
		width: '1em'
	}
} ) );

const ModalContainer = styled( 'div', { name: 'Modal', slot: 'Container' } )( () => ( {
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
} ) );

const ModalPaper = styled( Paper, { name: 'Modal', slot: 'Paper' } )<ModalStyled>( ( { ownerState, theme } ) => ( {
	margin: 32,
	overflowX: 'auto',
	display: 'flex',
	flexDirection: 'column',
	maxHeight: 'calc(100% - 64px)',
	animation: `${ appearFromBottomAnimation } .3s forwards`,
	...( ownerState.maxWidth === 'xs' && {
		maxWidth: theme.breakpoints.unit === 'px' ? Math.max( theme.breakpoints.values.xs, 400 ) : `max( ${ theme.breakpoints.values.xs }${ theme.breakpoints.unit }, 400px )`
	} ),
	...( ownerState.maxWidth && ownerState.maxWidth !== 'xs' && {
		maxWidth: theme.breakpoints.values[ ownerState.maxWidth as Breakpoint ] ?? ownerState.maxWidth
	} ),
	...( ownerState.fullWidth && {
		width: '100%'
	} )
} ) );

const useComponentClasses = () => {
	return generateComponentClasses(
		'Modal',
		{
			root: [ 'root' ],
			backdrop: [ 'backdrop' ],
			container: [ 'container' ],
			paper: [ 'paper' ],
			close: [ 'close' ],
		}
	)
}

/**
 * The Modal is used for showing dialogs containing specific contents.
 *
 * You can use the subcomponents to display the different sections of the modal: `ModalTitle`, `ModalContent` and `ModalActions`.
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>( function Modal(
	{
		className,
		open = false,
		disablePortal = false,
		maxWidth = 'sm',
		fullWidth = true,
		onClose,
		children,
		disableRestoreFocus = false,
		disableAutoFocus = false,
		disableConstrainedFocus = false,
		hideCloseIcon = false,
		...other
	},
	ref
) {

	useMainView(
		open,
		{
			onEscapeKeyDown: ( event ) => onClose?.( event, 'escapeKeyDown' )
		}
	);

	const ownerState: ModalOwnerState = {
		maxWidth,
		fullWidth
	};

	const isBackdropClick = React.useRef( false );
	const handleMouseDown = ( event: React.MouseEvent ) => {
		isBackdropClick.current = event.target === event.currentTarget;
	};

	const handleBackdropClick = ( event: React.MouseEvent ) => {
		if ( !isBackdropClick.current ) {
			return;
		}

		isBackdropClick.current = false;

		onClose?.( event, 'backdropClick' );
	}

	const handleCloseIconClick = ( event: React.MouseEvent ) => {
		onClose?.( event, 'closeIconClick' );
	}

	const classes = useComponentClasses();

	if ( !open ) {
		return null;
	}

	return <Portal disablePortal={ disablePortal }>
		<ModalRoot role="presentation" { ...other } ref={ ref } onClick={ handleBackdropClick } className={ classNames( classes.root, className ) }>
			<ModalBackdrop className={ classes.backdrop }/>
			<ModalContainer onMouseDown={ handleMouseDown } className={ classes.container }>
				<FocusTrap open disableRestoreFocus={ disableRestoreFocus } disableAutoFocus={ disableAutoFocus } disableConstrainedFocus={ disableConstrainedFocus }>
					<ModalPaper className={ classes.paper } ownerState={ ownerState } elevation={ 24 }>
						{ children }
						{ !hideCloseIcon && <ModalClose className={ classes.close } onClick={ handleCloseIconClick } size="sm" fontSize="md"><XMarkIcon/></ModalClose> }
					</ModalPaper>
				</FocusTrap>
			</ModalContainer>
		</ModalRoot>
	</Portal>
} );

export default Modal;