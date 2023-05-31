import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDropdown } from "../../dropdown";
import { useSelectContext } from "../context";
import { styled, Theme } from "@yith/styles";
import Input from "../../input";
import { __ } from "@wordpress/i18n";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { SelectOptionParams, SelectOptionProps, SelectOptionState } from "../types";
import { noop } from "lodash";

const LIST_SPACING = '8px'; // spacing (padding, margin) for the list elements.

const SelectListbox = styled( 'div', { name: 'Select', slot: 'Listbox' } )( () => ( {
	'&:focus, &:focus-visible': {
		outline: 'none'
	}
} ) );

const SelectOptions = styled( 'div', { name: 'Select', slot: 'Options' } )( ( { theme }: { theme: Theme } ) => ( {
	position: 'relative',
	maxHeight: '200px',
	overflowY: 'auto',
	fontSize: theme.fields.fontSize,
} ) );

const SelectOptionsNoResults = styled( 'div', { name: 'Select', slot: 'OptionsNoResults' } )(
	( { theme } ) => ( {
		fontSize: theme.fields.fontSize,
		padding: theme.fields.padding.md,
		margin: `${ LIST_SPACING } 0`,
		opacity: 0.7,
	} )
);
const SelectLoadingText = styled( 'div', { name: 'Select', slot: 'LoadingText' } )(
	( { theme } ) => ( {
		fontSize: theme.fields.fontSize,
		padding: theme.fields.padding.md,
		margin: `${ LIST_SPACING } 0`,
		opacity: 0.7,
	} ) );

const SelectDropdownContent = () => {
	const { close } = useDropdown();
	const {
		allowSearch,
		searchedTerm,
		setSearchedTerm,
		filteredOptions,
		isOptionSelected,
		activeDescendantIndex,
		setActiveDescendantIndex,
		nextActiveDescendant,
		prevActiveDescendant,
		moveToFirstActiveDescendant,
		moveToLastActiveDescendant,
		multiple,
		classes,
		getOptionLabel,
		getOptionValue,
		isLoading,
		handleChange,
		getOptionId,
		renderOption,
		renderOptionContent,
		noOptionsText,
		noResultsText,
		loadingText,
		closeOnSelect,
		componentIds,
		handleTyping
	} = useSelectContext();
	const listboxRef = useRef<HTMLDivElement>( null );
	const optionsRef = useRef<HTMLDivElement>( null );
	const searchRef = useRef<HTMLInputElement>( null );
	const activeDescendantRef = useRef<HTMLDivElement>( null );
	const [ autoScrollEnabled, setAutoScrollEnabled ] = useState( true );

	useEffect( () => {
		if ( autoScrollEnabled && activeDescendantRef.current && optionsRef.current ) {
			const { current: activeEl } = activeDescendantRef;
			const { current: optionsEl } = optionsRef;

			const { offsetHeight, offsetTop } = activeEl;
			const { offsetHeight: parentOffsetHeight, scrollTop } = optionsEl;

			const isAbove = offsetTop < scrollTop;
			const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

			if ( isAbove ) {
				optionsEl.scrollTo( 0, offsetTop );
			} else if ( isBelow ) {
				optionsEl.scrollTo( 0, offsetTop - parentOffsetHeight + offsetHeight );
			}
		}
	}, [ activeDescendantRef.current, activeDescendantIndex, filteredOptions, autoScrollEnabled ] );

	const handleChangeCustom = ( option: SelectOptionParams, index?: number ) => {
		if ( option?.disabled ) {
			return;
		}

		handleChange( option );
		setAutoScrollEnabled( false );
		listboxFocus();
		if ( index ) {
			setActiveDescendantIndex( index );
		}

		if ( closeOnSelect ) {
			close();
		}
	}

	const listboxFocus = () => listboxRef.current?.focus();

	const handleGenericKeys = ( key: string, focusOnListbox: boolean = false ): boolean => {
		switch ( key ) {
			case 'Down':
			case 'ArrowDown':
			case 'PageDown':
				focusOnListbox && listboxFocus();
				nextActiveDescendant( 'PageDown' === key ? 10 : 1 );
				setAutoScrollEnabled( true );
				return true;
			case 'Up':
			case 'ArrowUp':
			case 'PageUp':
				focusOnListbox && listboxFocus();
				prevActiveDescendant( 'PageUp' === key ? 10 : 1 );
				setAutoScrollEnabled( true );
				return true;
			case 'Home':
				focusOnListbox && listboxFocus();
				moveToFirstActiveDescendant();
				setAutoScrollEnabled( true );
				return true;
			case 'End':
				focusOnListbox && listboxFocus();
				moveToLastActiveDescendant();
				setAutoScrollEnabled( true );
				return true;
		}

		return false;
	}

	const handleSearchInputKeydown = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
		handleGenericKeys( event.key, true ) && event.stopPropagation();
	};

	const handleListboxKeydown = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
		if ( event.target !== listboxRef.current ) {
			return;
		}

		handleGenericKeys( event.key ) && event.stopPropagation();

		switch ( event.key ) {
			case 'Enter':
			case ' ': {
				const selectedOption = filteredOptions[ activeDescendantIndex ] ?? undefined;
				if ( selectedOption ) {
					handleChangeCustom( selectedOption );
				}
				event.stopPropagation();
			}
				break;
			default:
				handleTyping( event );
		}
	};

	return <>
		{ allowSearch && (
			<Input
				ref={ searchRef }
				className={ classes.search }
				type="text"
				variant="ghost"
				value={ searchedTerm }
				onChange={ ( _, newValue ) => setSearchedTerm( newValue ) }
				placeholder={ __( 'Search', 'yith-plugin-fw' ) }
				startAdornment={ <MagnifyingGlassIcon width="1.25em"/> }
				fullWidth
				onKeyDown={ handleSearchInputKeydown }
			/>
		) }

		<SelectListbox
			id={ componentIds.listbox }
			ref={ listboxRef }
			role='listbox'
			tabIndex={ 0 }
			aria-multiselectable={ multiple }
			aria-activedescendant={ activeDescendantIndex > -1 ? getOptionId( activeDescendantIndex ) : undefined }
			onKeyDown={ handleListboxKeydown }
		>
			{ !isLoading && !!filteredOptions.length &&
				<SelectOptions id={ componentIds.options } className={ classes.options } ref={ optionsRef }>
					{ filteredOptions.map( ( option, index ) => {
						const isDisabled = option?.disabled ?? false;
						const onSelect = () => {
							handleChangeCustom( option, index );
						};
						const optionState: SelectOptionState = {
							isDisabled: option?.disabled ?? false,
							isSelected: isOptionSelected( option ),
							isActiveDescendant: index === activeDescendantIndex,
							label: getOptionLabel( option ),
							value: getOptionValue( option )
						};

						const optionProps: SelectOptionProps = {
							id: getOptionId( index ),
							className: option.className,
							isDisabled: optionState.isDisabled,
							isSelected: optionState.isSelected,
							isActiveDescendant: optionState.isActiveDescendant,
							onClick: !isDisabled ? onSelect : noop,
							children: renderOptionContent( option, optionState ),
							role: "option",
							"aria-selected": optionState.isSelected,
							"aria-disabled": optionState.isDisabled ? 'true' : undefined
						};

						return (
							<Fragment key={ getOptionValue( option ) }>
								{ React.cloneElement( renderOption( optionProps, option, optionState ), { ref: optionState.isActiveDescendant ? activeDescendantRef : undefined } ) }
							</Fragment>
						);
					} ) }
				</SelectOptions>
			}

			{ !isLoading && !filteredOptions.length &&
				( allowSearch && searchedTerm ?
						( !!noResultsText && <SelectOptionsNoResults>{ noResultsText }</SelectOptionsNoResults> ) :
						( !!noOptionsText && <SelectOptionsNoResults>{ noOptionsText }</SelectOptionsNoResults> )
				)
			}

			{ isLoading && !!loadingText && !filteredOptions.length && (
				<SelectLoadingText>{ loadingText }</SelectLoadingText>
			) }
		</SelectListbox>
	</>
};

export default SelectDropdownContent;