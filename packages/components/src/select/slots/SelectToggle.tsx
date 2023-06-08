import { alpha, generateComponentClasses, mergeComponentClasses, styled } from "@yith/styles";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { forwardRef, useMemo, useRef, useState } from "react";

import IconButton from "../../icon-button";
import { useMergedRefs, useRelatedLabelFocus, ZeroWidthSpace } from "../../utils";
import Spinner from "../../spinner";
import type { SelectToggleOwnerState, SelectToggleProps, SelectToggleStyled } from "../types";
import { useSelectContext } from "../context";
import { selectClasses } from "../classes";
import { useDropdown } from "../../dropdown";

const ACTION_SPACING = '6px'; // spacing between actions.

const useComponentClasses = ( ownerState: SelectToggleOwnerState ) => {
	const { classes } = useSelectContext();
	const stateClasses = generateComponentClasses(
		'Select',
		{
			toggle: [ ownerState.isOpen && 'expanded', ownerState.isFocused && 'focused' ],
		}
	);

	return mergeComponentClasses( classes, stateClasses );
}

const SelectToggleRoot = styled( 'div', { name: 'Select', slot: 'Toggle' } )<SelectToggleStyled>( ( { theme, ownerState } ) => ( {
	boxSizing: 'border-box',
	position: 'relative',
	cursor: 'pointer',
	userSelect: 'none',
	width: '100%',
	borderRadius: theme.fields.borderRadius,
	padding: theme.fields.padding[ ownerState.size ],
	fontSize: theme.fields.fontSize,
	lineHeight: 1.5,
	color: theme.fields.color,
	'&:focus, &:focus-visible': {
		outline: 'none'
	},
	...( ownerState.variant === 'outlined' && {
		background: theme.fields.background,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		...( !ownerState.disabled && {
			'&:focus, &:focus-visible': {
				borderColor: theme.fields.focusedBorderColor,
				boxShadow: theme.fields.focusedBoxShadow,
				outline: 'none'
			}
		} )
	} ),
	...( ownerState.variant === 'reveal' && !ownerState.disabled && {
		'&:hover, &:focus, &:focus-visible': {
			background: alpha( theme.palette.primary.main ?? '', theme.palette.action.hoverOpacity ),
			outline: 'none'
		},
		...( ownerState.isOpen && ( {
			background: alpha( theme.palette.primary.main ?? '', theme.palette.action.hoverOpacity ),
			outline: 'none'
		} ) ),
	} ),
	...( ownerState.isOpen && ( {
		borderColor: theme.fields.focusedBorderColor,
		boxShadow: theme.fields.focusedBoxShadow
	} ) ),
	...( ownerState.disabled && {
		cursor: 'not-allowed'
	} )
} ) );

const SelectToggleWrap = styled( 'div', { name: 'Select', slot: 'ToggleWrap' } )<SelectToggleStyled>( ( { theme, ownerState } ) => ( {
	display: 'flex',
	alignItems: 'center',
	gap: '2px',
	...( ownerState.disabled && {
		opacity: theme.palette.action.disabledOpacity
	} )
} ) );

const SelectToggleLabel = styled( 'span', { name: 'Select', slot: 'ToggleLabel' } )`
	flex: 1;
	min-width: 0;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const SelectTogglePlaceholder = styled( 'span', { name: 'Select', slot: 'TogglePlaceholder' } )( ( { theme } ) => ( {
	flex: 1,
	minWidth: 0,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	color: theme.fields.placeholderColor
} ) );

const SelectToggleTags = styled( 'div', { name: 'Select', slot: 'ToggleTags' } )`
	flex: 1;
	display: inline-flex;
	flex-wrap: wrap;
	align-items: center;
	margin: -5px 0 -5px -9px;
`;

const SelectToggleTag = styled( 'div', { name: 'Select', slot: 'ToggleTag' } )( ( { theme } ) => ( {
	display: 'inline-flex',
	alignItems: 'center',
	borderRadius: '50px',
	background: theme.palette.action.selected,
	margin: '4px',
	height: '23px',
} ) );

const SelectToggleHiddenTagsCount = styled( 'div', { name: 'Select', slot: 'ToggleHiddenTagsCount' } )( () => ( {
	margin: '4px',
} ) );

const SelectToggleTagLabel = styled( 'span', { name: 'Select', slot: 'ToggleTagLabel' } )`
	padding: 0 8px 0 12px;
	font-size: 0.9em;
`;

const SelectToggleTagRemove = styled( XMarkIcon, { name: 'Select', slot: 'ToggleTagRemove' } )(
	( { theme } ) => ( {
		width: '1em',
		fontSize: '17px',
		borderRadius: '50%',
		padding: '2px',
		marginRight: '5px',
		background: theme.palette.action.selected,
		boxSizing: 'border-box',
		'&:hover': {
			background: alpha(
				theme.palette.action.selected!,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		},
	} )
);

const SelectToggleActions = styled( 'div', { name: 'Select', slot: 'ToggleActions' } )`
	display: flex;
	align-items: center;
	box-sizing: border-box;
`;

const SelectToggleSpinner = styled( 'span', { name: 'Select', slot: 'ToggleSpinner' } )`
	display: inline-flex;
	margin-right: ${ ACTION_SPACING };
`;

const SelectToggleClear = styled( IconButton, { name: 'Select', slot: 'ToggleClear' } )`
	margin: -4px;

	& > svg {
		width: 1em;
	}
`;

const SelectToggleExpand = styled( 'span', { name: 'Select', slot: 'ToggleExpand' } )<SelectToggleStyled>(
	( { theme, ownerState } ) => ( {
		display: 'inline-flex',
		fontSize: '20px',
		opacity: 0.4,
		marginLeft: ACTION_SPACING,
		marginRight: -4,
		...( ownerState.variant === 'reveal' && {
			opacity: 0,
			[ `.${ selectClasses.toggle }:hover &, .${ selectClasses.toggle }:focus &, .${ selectClasses.toggle }:focus-visible &` ]: {
				opacity: 1,
			},
		} ),
		...( ownerState.isOpen && {
			opacity: 1,
			color: theme.fields.focusedBorderColor,
		} ),
		'& > svg': {
			width: '1em',
		}
	} )
);

const SelectToggle = forwardRef<HTMLDivElement, SelectToggleProps>(
	(
		{ onClear, ...other }, ref ) => {
		const {
			id,
			placeholder,
			hideToggleIcon,
			size,
			showTags,
			isEmpty,
			allowClear,
			limitTags,
			getOptionValue,
			getOptionLabel,
			selectedOptions,
			deselectOption,
			isLoading,
			variant,
			renderToggleContent,
			moveToFirstActiveDescendant,
			moveToLastActiveDescendant,
			componentIds,
			disabled,
			handleTyping
		} = useSelectContext();
		const { toggle, open, isOpen } = useDropdown();
		const label = useMemo( () => selectedOptions.map( getOptionLabel ).join( ', ' ), [ selectedOptions ] );
		const rootRef = useRef<HTMLDivElement>( null );
		const relatedLabelFocusRef = useRelatedLabelFocus( id );
		const mergedRef = useMergedRefs( ref, rootRef, relatedLabelFocusRef );

		const [ isFocused, setIsFocused ] = useState( false );
		const ownerState: SelectToggleOwnerState = {
			isOpen,
			isEmpty,
			isFocused,
			disabled,
			size,
			variant
		};

		const handleKeydown = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
			if ( event.target !== rootRef.current || disabled ) {
				return;
			}
			switch ( event.key ) {
				case 'Down':
				case 'ArrowDown':
				case 'Up':
				case 'ArrowUp':
				case 'Enter':
				case ' ':
					open();
					event.stopPropagation();
					break;
				case 'Home':
					open();
					moveToFirstActiveDescendant();
					event.stopPropagation();
					break;
				case 'End':
					open();
					moveToLastActiveDescendant();
					event.stopPropagation();
					break;
				default:
					handleTyping( event ) && open();
			}
		};

		const handleClear = ( e: React.MouseEvent ) => {
			e.stopPropagation();
			onClear();
			close();
		}

		const classes = useComponentClasses( ownerState );

		let display;

		if ( renderToggleContent ) {
			display = renderToggleContent( { isOpen, selectedOptions, deselectOption } );
		} else {
			display = <SelectToggleLabel className={ classes.toggleLabel }>{ label }</SelectToggleLabel>;
			if ( isEmpty ) {
				display = <SelectTogglePlaceholder className={ classes.togglePlaceholder }>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>;
			}
			if ( showTags ) {
				const tagsToShow = !isFocused && !isOpen && limitTags > 0 ? selectedOptions.slice( 0, limitTags ) : selectedOptions;
				const hiddenTags = selectedOptions.length - tagsToShow.length;
				display = (
					<>
						{ !!selectedOptions.length ? (
							<SelectToggleTags className={ classes.toggleTags }>
								{ tagsToShow.map( ( option ) => {
									const tagKey = getOptionValue( option );
									const tagLabel = getOptionLabel( option );
									return (
										<SelectToggleTag key={ tagKey } className={ classes.toggleTag }>
											<SelectToggleTagLabel className={ classes.toggleTagLabel }>{ tagLabel }</SelectToggleTagLabel>
											<SelectToggleTagRemove
												className={ classes.toggleTagRemove }
												onClick={ ( e: React.MouseEvent ) => {
													e.stopPropagation();
													deselectOption( option );
												} }
											/>
										</SelectToggleTag>
									);
								} ) }
								{ !!hiddenTags && <SelectToggleHiddenTagsCount className={ classes.toggleHiddenTagsCount }>{ ` +${ hiddenTags }` }</SelectToggleHiddenTagsCount> }
							</SelectToggleTags>
						) : (
							<SelectTogglePlaceholder className={ classes.togglePlaceholder }>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>
						) }
					</>
				);
			}
		}

		return (
			<SelectToggleRoot
				{ ...other }
				className={ classes.toggle }
				ref={ mergedRef }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ () => setIsFocused( false ) }
				onKeyDown={ handleKeydown }
				onClick={ !disabled ? toggle : undefined }
				ownerState={ ownerState }
				aria-controls={ componentIds.listbox }
				aria-expanded={ isOpen }
				aria-haspopup="listbox"
				aria-disabled={ disabled }
				role="combobox"
				tabIndex={ 0 }
			>
				<SelectToggleWrap ownerState={ ownerState }>
					{ !!display ? display : <ZeroWidthSpace/> }

					<SelectToggleActions className={ classes.toggleActions }>
						{ isLoading && (
							<SelectToggleSpinner className={ classes.toggleSpinner }>
								<Spinner size={ 16 }/>
							</SelectToggleSpinner>
						) }

						{ allowClear && !isEmpty && !showTags && (
							<SelectToggleClear
								className={ classes.toggleClear }
								onClick={ handleClear }
								adaptiveSizing
								padding={ 4 }
								fontSize={ 15 }
							>
								<XMarkIcon/>
							</SelectToggleClear>
						) }

						{ !hideToggleIcon && <SelectToggleExpand className={ classes.toggleExpand } ownerState={ ownerState }>
							<ChevronUpDownIcon/>
						</SelectToggleExpand> }
					</SelectToggleActions>
				</SelectToggleWrap>
			</SelectToggleRoot>
		);
	}
);

export default SelectToggle;