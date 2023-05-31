import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { noop } from 'lodash';
import { generateComponentClasses, mergeComponentClasses, styled } from '@yith/styles';

import Dropdown from '../dropdown';
import { useControlledState, useId } from '../utils';

import type { SelectOptionParams, SelectOptionState, SelectOwnerState, SelectOwnProps, SelectProps, SelectStyled, SelectOptionProps, SelectClasses } from "./types";
import { SelectProvider } from "./context";
import SelectOption from "./slots/SelectOption";
import SelectToggle from "./slots/SelectToggle";
import { useSelectDefaultValue } from "./utils/useSelectDefaultValue";
import { selectClasses } from "./classes";
import SelectDropdownContent from "./slots/SelectDropdownContent";

const useComponentClasses = ( ownerState: SelectOwnerState ): SelectClasses => {
	const stateClasses = generateComponentClasses(
		'Select',
		{
			root: [ `--${ ownerState.variant }` ],
		}
	);

	return mergeComponentClasses(
		mergeComponentClasses( selectClasses, stateClasses ),
		ownerState.classes
	);
}

const SelectRoot = styled( 'div', { name: 'Select', slot: 'Root' } )<SelectStyled>`
	${ ( { ownerState } ) => {
		return {
			width: ownerState.width,
			display: 'inline-flex'
		};
	} }
`;

function defaultRenderOptionContent( _option: SelectOptionParams, state: SelectOptionState ) {
	return state.label;
}

function defaultRenderOption( props: SelectOptionProps ) {
	return (
		<SelectOption { ...props }>
			{ props.children }
		</SelectOption>
	);
}

const Select = forwardRef<HTMLDivElement, SelectProps>( function Select(
	{
		value: valueProp,
		id: idProp,
		classes: classesProp = {},
		name,
		multiple = false,
		options = [],
		placeholder = '',
		allowClear = false,
		allowSearch = false,
		closeOnSelect: closeOnSelectProp,
		hideSelectedOptions = false,
		isLoading = false,
		loadingText = __( 'Loading...', 'yith-plugin-fw' ),
		noOptionsText = __( 'No options', 'yith-plugin-fw' ),
		noResultsText = __( 'No results', 'yith-plugin-fw' ),
		onChange = noop,
		onClear = noop,
		onClose = noop,
		onSearch = noop,
		getOptionValue = option => option?.value ?? '',
		getOptionLabel = option => option?.label ?? '',
		renderOption = defaultRenderOption,
		renderOptionContent = defaultRenderOptionContent,
		renderToggleContent,
		filterSearch: filterSearchProp,
		showTags = false,
		limitTags = 0,
		width = 200,
		size = 'md',
		variant = 'outlined',
		hideToggleIcon = false,
		disabled = false,
		...other
	},
	ref
) {
	const filterSearch: SelectOwnProps[ 'filterSearch' ] =
		filterSearchProp ??
		( ( option, search ) => getOptionLabel( option ).toLowerCase().indexOf( search.toLowerCase() ) >= 0 );

	const id = useId( idProp );
	const defaultValue = useSelectDefaultValue( { multiple, allowClear, getOptionValue, options } );
	const closeOnSelect = typeof closeOnSelectProp === 'undefined' ? ( !multiple ) : closeOnSelectProp;
	const [ value, setValue ] = useControlledState( valueProp, defaultValue );
	const arrayValue = useMemo( () => ( Array.isArray( value ) ? value : [ value ] ).filter( Boolean ), [ value ] );
	const [ searchedTerm, setSearchedTerm ] = useState( '' );
	const toggleRef = useRef<HTMLDivElement>( null );

	useEffect( () => {
		if ( allowSearch ) {
			onSearch( searchedTerm );
		}
	}, [ searchedTerm ] );

	const deselectOption = useCallback( ( option: SelectOptionParams ) => {
			if ( disabled ) {
				return;
			}
			const optionValue = getOptionValue( option );
			if ( multiple ) {
				const idx = ( value as string[] ).findIndex( _ => _ === optionValue );
				if ( idx > -1 ) {
					const newValue = [ ...( value as string[] ) ];
					newValue.splice( idx, 1 );
					setValue( newValue );
					onChange( newValue );
				}
			}
		},
		[ getOptionValue, multiple, value, onChange, disabled ]
	);

	const handleChange = useCallback( ( option: SelectOptionParams ) => {
			if ( disabled ) {
				return;
			}
			const optionValue = getOptionValue( option );

			allowSearch && setSearchedTerm( '' );

			if ( multiple ) {
				const idx = ( value as string[] ).findIndex( _ => _ === optionValue );
				if ( idx > -1 ) {
					const newValue = [ ...( value as string[] ) ];
					newValue.splice( idx, 1 );
					setValue( newValue );
					onChange( newValue );
				} else {
					setValue( [ ...( value as string[] ), optionValue ] );
					onChange( [ ...( value as string[] ), optionValue ] );
				}
			} else {
				setValue( optionValue );
				onChange( optionValue );
			}
		},
		[ getOptionValue, allowSearch, multiple, onChange, value, closeOnSelect, disabled ]
	);

	const isOptionSelected = useCallback( ( option: SelectOptionParams ) => {
			return multiple ? ( value as string[] ).includes( getOptionValue( option ) ) : value === getOptionValue( option )
		},
		[ multiple, getOptionValue, value ]
	);

	const isEmpty = useMemo( () => ( multiple ? !( value as string[] ).length : !value ), [ value, multiple ] );
	const selectedOptions = useMemo( () => options.filter( _ => isOptionSelected( _ ) ), [ options, value, multiple ] );

	const filteredOptions = useMemo( () => {
		let filtered = options;

		if ( hideSelectedOptions ) {
			filtered = filtered.filter( option => !isOptionSelected( option ) );
		}

		if ( allowSearch && searchedTerm ) {
			filtered = filtered.filter( option => filterSearch( option, searchedTerm ) );
		}
		return filtered;
	}, [ searchedTerm, allowSearch, options, hideSelectedOptions, value ] );

	const getOptionId = useCallback( ( index: number ) => `${ id }__option__${ index }`, [ id ] );

	const defaultActiveDescendantIndex = useMemo( () => filteredOptions.findIndex( _ => isOptionSelected( _ ) ), [ filteredOptions, isOptionSelected ] );
	const [ activeDescendantIndex, setActiveDescendantIndex ] = useState( defaultActiveDescendantIndex );
	const minMaxActiveDescendant = useCallback( ( index: number ) => Math.max( 0, Math.min( filteredOptions.length - 1, index ) ), [ filteredOptions ] );
	const nextActiveDescendant = useCallback( ( increment = 1 ) => setActiveDescendantIndex( _ => minMaxActiveDescendant( _ + increment ) ), [ filteredOptions ] );
	const prevActiveDescendant = useCallback( ( increment = 1 ) => setActiveDescendantIndex( _ => minMaxActiveDescendant( _ - increment ) ), [ filteredOptions ] );
	const moveToFirstActiveDescendant = useCallback( () => setActiveDescendantIndex( filteredOptions.length ? 0 : -1 ), [ filteredOptions ] );
	const moveToLastActiveDescendant = useCallback( () => setActiveDescendantIndex( filteredOptions.length - 1 ), [ filteredOptions ] );
	const unsetActiveDescendant = useCallback( () => setActiveDescendantIndex( -1 ), [] );

	useEffect( () => {
		if ( activeDescendantIndex !== minMaxActiveDescendant( activeDescendantIndex ) ) {
			setActiveDescendantIndex( minMaxActiveDescendant( activeDescendantIndex ) );
		}
	}, [ activeDescendantIndex, minMaxActiveDescendant ] );

	const handleClose = () => {
		allowSearch && setSearchedTerm( '' );
		setActiveDescendantIndex( filteredOptions.findIndex( _ => isOptionSelected( _ ) ) );
		onClose();
	};

	const handleClear = () => {
		onClear();
		setValue( multiple ? [] : '' );
	};

	const [ typingTerm, setTypingTerm ] = useState( '' );
	const typingTimeout = useRef<ReturnType<typeof setTimeout>>();

	const handleTyping = useCallback(
		( event: React.KeyboardEvent<HTMLDivElement> ) => {
			if ( !allowSearch && !disabled ) {
				let stopPropagation = false;

				if ( event.key === 'Esc' ) {
					setTypingTerm( '' );
					stopPropagation = true;
				} else if ( event.key.length === 1 && event.key !== ' ' ) {
					setTypingTerm( _ => _ + event.key );
					stopPropagation = true;
				}

				stopPropagation && event.stopPropagation();
				return stopPropagation;
			}
			return false;
		}, [ disabled, allowSearch ] );

	useEffect( () => {
		const reset = () => setTypingTerm( '' );
		if ( typingTerm ) {
			typingTimeout.current && clearTimeout( typingTimeout.current );
			typingTimeout.current = setTimeout( reset, 500 );
		}

		return () => typingTimeout.current && clearTimeout( typingTimeout.current );
	}, [ typingTerm ] );

	useEffect( () => {
		if ( typingTerm ) {
			const orderedOptions = activeDescendantIndex > 0 ? [
				...filteredOptions.slice( activeDescendantIndex + 1 ),
				...filteredOptions.slice( 0, activeDescendantIndex + 1 ),
			] : [ ...filteredOptions ];
			const firstMatch = orderedOptions.find( _ => getOptionLabel( _ ).toLowerCase().startsWith( typingTerm.toLowerCase() ) );
			const letters = typingTerm.split( '' );
			const allSameLetter = letters.every( ( _ ) => _ === letters[ 0 ] );

			if ( firstMatch ) {
				setActiveDescendantIndex( filteredOptions.indexOf( firstMatch ) );
			} else if ( allSameLetter ) {
				const match = orderedOptions.find( _ => getOptionLabel( _ ).toLowerCase().startsWith( typingTerm[ 0 ].toLowerCase() ) );
				if ( match ) {
					setActiveDescendantIndex( filteredOptions.indexOf( match ) );
				}
			}
		}
	}, [ typingTerm ] )

	const ownerState: SelectOwnerState = { width, variant, classes: classesProp };
	const classes = useComponentClasses( ownerState );

	const componentIds: React.ComponentProps<typeof SelectProvider>['componentIds'] = {
		listbox: `${ id }__listbox`,
		options: `${ id }__options`,
	}

	const providerProps: Omit<React.ComponentProps<typeof SelectProvider>, 'children'> = {
		id,
		allowClear,
		allowSearch,
		placeholder,
		hideToggleIcon,
		multiple,
		showTags,
		limitTags,
		getOptionLabel,
		getOptionValue,
		isLoading,
		size,
		variant,
		renderToggleContent,
		value,
		options,
		renderOption,
		renderOptionContent,
		noOptionsText,
		noResultsText,
		loadingText,
		closeOnSelect,
		disabled,
		classes,
		getOptionId,
		searchedTerm,
		setSearchedTerm,
		deselectOption,
		handleChange,
		selectedOptions,
		filteredOptions,
		isOptionSelected,
		isEmpty,
		activeDescendantIndex,
		setActiveDescendantIndex,
		nextActiveDescendant,
		prevActiveDescendant,
		unsetActiveDescendant,
		moveToFirstActiveDescendant,
		moveToLastActiveDescendant,
		componentIds,
		handleTyping
	}

	return (
		<SelectProvider { ...providerProps }>
			<SelectRoot ownerState={ ownerState } { ...other } ref={ ref } id={ id } className={ classes.root }>
				{ arrayValue.map( _ => (
					<input key={ _ } type="hidden" name={ name } value={ _ }/>
				) ) }
				<Dropdown
					ref={ toggleRef }
					renderToggle={ () => <SelectToggle onClear={ handleClear }/> }
					renderContent={ () => <SelectDropdownContent/> }
					onClose={ handleClose }
					popoverProps={ {
						className: classes.popover,
						position: 'bottom left',
						forceMinWidth: true
					} }
				/>
			</SelectRoot>
		</SelectProvider>
	);
} );

export default Select;