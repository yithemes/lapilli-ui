import React, { forwardRef, Fragment, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { noop } from 'lodash';
import { generateComponentClasses, mergeComponentClasses, styled, Theme } from '@yith/styles';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Dropdown from '../dropdown';
import Input from '../input';
import { useControlledState, useId } from '../utils';

import type { SelectOptionParams, SelectOptionState, SelectOwnerState, SelectOwnProps, SelectProps, SelectStyled, SelectOptionProps } from "./types";
import { SelectProvider } from "./context";
import SelectOption from "./slots/SelectOption";
import SelectToggle from "./slots/SelectToggle";
import { useSelectDefaultValue } from "./utils/useSelectDefaultValue";
import { selectClasses } from "./classes";

const LIST_SPACING = '8px'; // spacing (padding, margin) for the list elements.

const useComponentClasses = ( ownerState: SelectOwnerState ) => {
	const stateClasses = generateComponentClasses(
		'Select',
		{
			root: [ `--${ ownerState.variant }` ],
		}
	);

	return mergeComponentClasses( selectClasses, stateClasses );
}

const SelectRoot = styled( 'div', { name: 'Select', slot: 'Root' } )<SelectStyled>`
	${ ( { ownerState } ) => {
		return {
			width: ownerState.width,
			display: 'inline-flex'
		};
	} }
`;

const SelectListbox = styled( 'div', { name: 'Select', slot: 'Listbox' } )( () => ( {
	'&:focus, &:focus-visible': {
		outline: 'none'
	}
} ) );

const SelectOptions = styled( 'div', { name: 'Select', slot: 'Options' } )( ( { theme }: { theme: Theme } ) => ( {
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
	const searchRef = useRef<HTMLInputElement>();
	const listboxRef = useRef<HTMLDivElement>( null );

	useEffect( () => {
		if ( allowSearch ) {
			onSearch( searchedTerm );
		}
	}, [ searchedTerm ] );

	const deselectOption = useCallback( ( option: any ) => {
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
		[ getOptionValue, multiple, value, onChange ]
	);

	const handleChange = useCallback( ( option: any, args: { close: () => void } ) => {
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
		},
		[ getOptionValue, allowSearch, multiple, onChange, value, closeOnSelect ]
	);

	const isOptionSelected = useCallback( ( option: any ) => {
			return multiple ? ( value as string[] ).includes( getOptionValue( option ) ) : value === getOptionValue( option )
		},
		[ multiple, getOptionValue ]
	);

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

	const defaultActiveDescendantIndex = useMemo( () => filteredOptions.findIndex( _ => isOptionSelected( _ ) ), [ filteredOptions, value, multiple ] );
	const [ activeDescendantIndex, setActiveDescendantIndex ] = useState( defaultActiveDescendantIndex );

	useEffect( () => {
		setActiveDescendantIndex( filteredOptions.findIndex( _ => isOptionSelected( _ ) ) );
	}, [ value, filteredOptions, multiple ] );

	const selectIds = useMemo( () => ( {
		root: id,
		options: `${ id }__options`,
		activeDescendant: activeDescendantIndex > -1 ? getOptionId( activeDescendantIndex ) : undefined
	} ), [ id, activeDescendantIndex, getOptionId ] );

	const handleOpen = () => {
		if ( allowSearch && searchRef.current ) {
			searchRef.current.focus();
		} else if ( listboxRef.current ) {
			listboxRef.current.focus();
		}
	};

	const handleClose = () => {
		allowSearch && setSearchedTerm( '' );
		onClose();
	};

	const handleListboxKeydown = ( event: React.KeyboardEvent<HTMLDivElement>, args: { close: () => void } ) => {
		switch ( event.key ) {
			case 'Down':
			case 'ArrowDown':
				setActiveDescendantIndex( _ => _ < ( filteredOptions.length - 1 ) && typeof filteredOptions[ _ + 1 ] !== undefined ? _ + 1 : _ )
				break;
			case 'Up':
			case 'ArrowUp':
				setActiveDescendantIndex( _ => _ !== 0 && typeof filteredOptions[ _ - 1 ] !== undefined ? _ - 1 : _ )
				break;
			case 'Enter':
			case ' ': {
				const selectedOption = filteredOptions[ activeDescendantIndex ] ?? undefined;
				if ( selectedOption ) {
					handleChange( selectedOption, args );
				}
			}
				break;
		}
	};

	const handleToggleKeydown = ( event: React.KeyboardEvent<HTMLDivElement>, args: { toggle: () => void } ) => {
		switch ( event.key ) {
			case 'Enter':
			case ' ': {
				args.toggle();
			}
				break;
		}
	};

	const ownerState: SelectOwnerState = { width, variant };
	const classes = useComponentClasses( ownerState );

	const providerProps: Omit<React.ComponentProps<typeof SelectProvider>, 'children'> = {
		deselectOption,
		selectedOptions,
		multiple,
		showTags,
		limitTags,
		getOptionLabel,
		getOptionValue,
		isLoading,
		size,
		variant,
		renderToggleContent
	}

	return (
		<SelectProvider { ...providerProps }>
			<SelectRoot ownerState={ ownerState } { ...other } ref={ ref } id={ selectIds.root } className={ classes.root }>
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
								hideToggleIcon={ hideToggleIcon }
								onKeyDown={ e => handleToggleKeydown( e, { toggle } ) }
							/>
						);
					} }
					renderContent={ ( { close } ) => {
						return (
							<>
								{ allowSearch && (
									<Input
										ref={ searchRef as MutableRefObject<HTMLInputElement> }
										className={ classes.search }
										type="text"
										variant="ghost"
										value={ searchedTerm }
										onChange={ ( _, newValue ) => setSearchedTerm( newValue ) }
										placeholder={ __( 'Search', 'yith-plugin-fw' ) }
										startAdornment={ <MagnifyingGlassIcon width="1.25em"/> }
										fullWidth
									/>
								) }

								<SelectListbox
									ref={ listboxRef }
									role='listbox'
									tabIndex={ 0 }
									aria-multiselectable={ multiple }
									aria-activedescendant={ selectIds.activeDescendant }
									onKeyDown={ e => handleListboxKeydown( e, { close } ) }
								>
									{ !isLoading && !!filteredOptions.length &&
										<SelectOptions id={ selectIds.options } className={ classes.options }>
											{ filteredOptions.map( ( option, index ) => {
												const isDisabled = option?.disabled ?? false;
												const onSelect = () => handleChange( option, { close } );
												const optionState: SelectOptionState = {
													isDisabled: option?.disabled ?? false,
													isSelected: isOptionSelected( option ),
													isActiveDescendant: index === activeDescendantIndex,
													label: getOptionLabel( option ),
													value: getOptionValue( option )
												};

												const optionProps: SelectOptionProps = {
													id: getOptionId( index ),
													isDisabled: optionState.isDisabled,
													isSelected: optionState.isSelected,
													isActiveDescendant: optionState.isActiveDescendant,
													onClick: !isDisabled ? onSelect : noop,
													children: renderOptionContent( option, optionState )
												};

												return (
													<Fragment key={ getOptionValue( option ) }>
														{ renderOption( optionProps, option, optionState ) }
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
						);
					} }
					onOpen={ handleOpen }
					onClose={ handleClose }
					popoverProps={ {
						className: classes.popover,
						position: 'bottom left',
						forceMinWidth: true,
					} }
					disableConstrainedFocus
					disableAutoFocus
				/>
			</SelectRoot>
		</SelectProvider>
	);
} );

export default Select;