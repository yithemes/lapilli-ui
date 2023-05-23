import React, { forwardRef, Fragment, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { noop } from 'lodash';
import { styled, Theme } from '@yith/styles';
import Dropdown from '../dropdown';
import Input from '../input';
import { useControlledState, useId } from '../utils';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { SelectOwnerState, SelectOwnProps, SelectProps, SelectRenderOptionArgs, SelectStyled } from "./types";
import SelectOption from "./slots/SelectOption";
import { SelectProvider } from "./context";
import SelectToggle from "./slots/SelectToggle";
import { useSelectDefaultValue } from "./utils/useSelectDefaultValue";

const LIST_SPACING = '8px'; // spacing (padding, margin) for the list elements.

const SelectRoot = styled( 'div', { name: 'Select', slot: 'Root' } )<SelectStyled>`
	${ ( { ownerState } ) => {
		return {
			width: ownerState.width,
			display: 'inline-flex'
		};
	} }
`;

const SelectOptions = styled( 'div', { name: 'Select', slot: 'Options' } )( ( { theme }: { theme: Theme } ) => ( {
	maxHeight: '200px',
	overflowY: 'auto',
	fontSize: theme.fields.fontSize,
} ) );

const SelectOptionsNoResults = styled( 'div', { name: 'Select', slot: 'OptionsNoResults' } )(
	( { theme } ) => ( {
		fontSize: theme.fields.fontSize,
		padding: theme.fields.padding.md,
		margin: `${ LIST_SPACING }
0`,
		opacity: 0.7,
	} )
);
const SelectLoadingText = styled( 'div', { name: 'Select', slot: 'LoadingText' } )(
	( { theme } ) => ( {
		fontSize: theme.fields.fontSize,
		padding: theme.fields.padding.md,
		margin: `${ LIST_SPACING }
0`,
		opacity: 0.7,
	} ) );

function defaultRenderOptionContent( args: SelectRenderOptionArgs ) {
	return args.label;
}

function defaultRenderOption( args: SelectRenderOptionArgs ) {
	const { id, isSelected, isDisabled, onSelect } = args;
	const handleSelect = !isDisabled ? onSelect : noop;

	return (
		<SelectOption onClick={ handleSelect } isSelected={ isSelected } isDisabled={ isDisabled } id={ id }>
			{ defaultRenderOptionContent( args ) }
		</SelectOption>
	);
}

const Select = forwardRef<HTMLDivElement, SelectProps>( function Select(
	{
		value: valueProp,
		id: idProp,
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
		onClose: onCloseProp = noop,
		onSearch = noop,
		getOptionValue = option => option?.value ?? '',
		getOptionLabel = option => option?.label ?? '',
		renderOption = defaultRenderOption,
		renderOptionContent = defaultRenderOptionContent,
		filterSearch: filterSearchProp,
		showTags = false,
		limitTags = 0,
		width = 200,
		size = 'md',
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
	const arrayValue = ( Array.isArray( value ) ? value : [ value ] ).filter( Boolean );
	const [ searchedTerm, setSearchedTerm ] = useState( '' );
	const searchRef = useRef<HTMLInputElement>();

	useEffect( () => {
		if ( allowSearch ) {
			onSearch( searchedTerm );
		}
	}, [ searchedTerm ] );

	const deselectOption = ( option: any ) => {
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
	};

	const handleChange = ( option: any, args: { close: () => void } ) => {
		const { close } = args;
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

		if ( closeOnSelect ) {
			close();
		}
	};

	const isOptionSelected = ( option: any ) =>
		multiple ? ( value as string[] ).includes( getOptionValue( option ) ) : value === getOptionValue( option );

	const isEmpty = useMemo( () => ( multiple ? !( value as string[] ).length : !value ), [ value, multiple ] );

	const selectedOptions = useMemo( () => options.filter( _ => isOptionSelected( _ ) ), [ options, value, multiple ] );
	const toggleLabel = useMemo( () => selectedOptions.map( getOptionLabel ).join( ', ' ), [ selectedOptions ] );

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

	const defaultFocusedOptionIndex = useMemo( () => filteredOptions.findIndex( _ => isOptionSelected( _ ) ), [ filteredOptions, value, multiple ] );
	const [ focusedOptionIndex, setFocusedOptionIndex ] = useState( defaultFocusedOptionIndex );

	const selectIds = {
		root: id,
		options: `${ id }__options`,
		focusedOption: focusedOptionIndex > -1 ? getOptionId( focusedOptionIndex ) : undefined
	};

	useEffect( () => {
		setFocusedOptionIndex( filteredOptions.findIndex( _ => isOptionSelected( _ ) ) );
	}, [ value, filteredOptions, multiple ] );

	const focusOnSearch = () => {
		if ( searchRef.current ) {
			searchRef.current.focus();
		}
	};

	const onOpenHandler = () => {
		focusOnSearch();
	};

	const onCloseHandler = () => {
		allowSearch && setSearchedTerm( '' );
		onCloseProp();
	};

	const ownerState: SelectOwnerState = { width };

	return (
		<SelectProvider
			deselectOption={ deselectOption }
			selectedOptions={ selectedOptions }
			multiple={ multiple }
			showTags={ showTags }
			limitTags={ limitTags }
			getOptionLabel={ getOptionLabel }
			getOptionValue={ getOptionValue }
			isLoading={ isLoading }
			size={ size }
		>
			<SelectRoot ownerState={ ownerState } { ...other } ref={ ref } id={ selectIds.root }>
				{ arrayValue.map( _ => (
					<input key={ _ } type="hidden" name={ name } value={ _ }/>
				) ) }
				<Dropdown
					renderToggle={ ( { isOpen, toggle, close } ) => {
						return (
							<SelectToggle
								label={ toggleLabel }
								placeholder={ placeholder }
								onToggle={ toggle }
								isEmpty={ isEmpty }
								allowClear={ allowClear }
								onClear={ () => {
									onClear();
									setValue( multiple ? [] : '' );
									close();
								} }
								isOpen={ isOpen }
							/>
						);
					} }
					renderContent={ ( { close } ) => {
						return (
							<>
								{ allowSearch && (
									<Input
										ref={ searchRef as MutableRefObject<HTMLInputElement> }
										type="text"
										variant="ghost"
										value={ searchedTerm }
										onChange={ ( _, newValue ) => setSearchedTerm( newValue ) }
										placeholder={ __( 'Search', 'yith-plugin-fw' ) }
										startAdornment={ <MagnifyingGlassIcon width="1.25em"/> }
									/>
								) }

								{ !isLoading && !!filteredOptions.length &&
									<SelectOptions id={ selectIds.options }>
										{ filteredOptions.map( ( option, index ) => {
											return (
												<Fragment key={ getOptionValue( option ) }>
													{ renderOption( {
														id: getOptionId( index ),
														option,
														isDisabled: option?.disabled ?? false,
														isSelected: isOptionSelected( option ),
														label: getOptionLabel( option ),
														onSelect: () => handleChange( option, { close } ),
													} ) }
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
							</>
						);
					} }
					onOpen={ onOpenHandler }
					onClose={ onCloseHandler }
					popoverProps={ {
						position: 'bottom left',
						forceMinWidth: true,
						role: 'listbox',
						tabIndex: -1,
						'aria-multiselectable': multiple,
						'aria-activedescendant': selectIds.focusedOption
					} }
					disableConstrainedFocus
					disableAutoFocus
				/>
			</SelectRoot>
		</SelectProvider>
	);
} );

export default Select;