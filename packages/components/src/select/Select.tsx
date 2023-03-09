import React, { forwardRef, Fragment, MutableRefObject, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { noop } from 'lodash';
import { alpha, FieldSize, styled, Theme } from '@yith/styles';
import FwIcon from '../fw-icon';
import Dropdown from '../dropdown';
import Input from '../input';
import IconButton from '../icon-button';
import { useControlledState, useId, ZeroWidthSpace } from '../utils';
import Spinner from '../spinner';
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Option {
	value: string
	label: string
	disabled?: boolean
}

type SingleSelectProps = Omit<React.ComponentProps<'div'>, 'onChange' | 'name' | 'width' | 'placeholder'> & {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: false;
	/**
	 * The value.
	 */
	value?: string;
	/**
	 * The field name.
	 */
	name?: string;
	/**
	 * Callback triggered when the field changes its own value.
	 */
	onChange?: ( ( value: string ) => void );
	/**
	 * Callback triggered when the field is cleared.
	 */
	onClear?: () => void;
	/**
	 * Callback triggered when the dropdown is closed.
	 */
	onClose?: () => void;
	/**
	 * Callback triggered when searching.
	 */
	onSearch?: ( ( term: string ) => void );
	/**
	 * List of options to be shown.
	 */
	options: Option[];
	/**
	 * The placeholder.
	 */
	placeholder?: string;
	/**
	 * Function to retrieve the option value.
	 */
	getOptionValue?: ( option: Option ) => string;
	/**
	 * Function to retrieve the option label.
	 */
	getOptionLabel?: ( option: Option ) => string;
	/**
	 * Function to render the option.
	 */
	renderOption?: ( args: RenderOptionArgs ) => string;
	/**
	 * Function to filter options when searching.
	 */
	filterSearch?: ( option: any, search: string ) => boolean;
	/**
	 * Do you want to allow searching?
	 */
	allowSearch?: boolean;
	/**
	 * Do you want to allow clear?
	 */
	allowClear?: boolean;
	/**
	 * Do you want to close the dropdown after selecting an option?
	 */
	closeOnSelect?: boolean;
	/**
	 * Do you want to hide selected options in suggestions' list?
	 */
	hideSelectedOptions?: boolean;
	/**
	 * Is the select loading?
	 */
	isLoading?: boolean;
	/**
	 * The text shown in popover when loading.
	 */
	loadingText?: string;
	/**
	 * The text shown in popover when the select has no option.
	 */
	noOptionsText?: string;
	/**
	 * The text shown in popover when there are no results for the searched term.
	 */
	noResultsText?: string;
	/**
	 * You can set a specific width.
	 */
	width?: React.CSSProperties[ 'width' ];
	/**
	 * Do you want to show tags in the select toggle?
	 */
	showTags?: never;
	/**
	 * Limit the number of tags shown in select toggle.
	 */
	limitTags?: never;
	/**
	 * The field size.
	 */
	size?: FieldSize;
};

type MultipleSelectProps = Omit<SingleSelectProps, 'onChange' | 'value' | 'multiple' | 'showTags' | 'limitTags'> & {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: true;
	/**
	 * The value.
	 */
	value?: string[];
	/**
	 * Callback triggered when the field changes its own value.
	 */
	onChange?: ( ( value: string[] ) => void );
	/**
	 * Do you want to show tags in the select toggle?
	 */
	showTags?: boolean;
	/**
	 * Limit the number of tags shown in select toggle.
	 */
	limitTags?: number;
};

type SelectOwnPropsWithRef = SingleSelectProps | MultipleSelectProps;
type SelectOwnProps = Omit<SelectOwnPropsWithRef, 'ref'>

type ToggleSelectProps = Required<Pick<SelectOwnProps, 'multiple' | 'getOptionValue' | 'getOptionLabel' | 'isLoading' | 'size'>> & {
	limitTags: number;
	showTags: boolean;
	unselectOption: ( option: Option ) => void;
	selectedOptions: Option[];
};

type ToggleArgs = {
	isEmpty: boolean;
	allowClear: boolean;
	isOpen: boolean;
	label: string;
	placeholder: string;
	onToggle: () => void;
	onClear: () => void;
	selectProps: ToggleSelectProps;
};

type RenderOptionArgs = {
	id: string,
	option: Option;
	isSelected: boolean;
	isDisabled: boolean;
	label: string;
	onSelect: () => void;
};

type SelectOwnerState = {
	width: React.CSSProperties[ 'width' ];
};

type StyledSelectProps = {
	ownerState: SelectOwnerState;
};

type ToggleOwnerState = {
	isOpen: boolean;
	isEmpty: boolean;
	isFocused: boolean;
	size: FieldSize
};

type StyledToggleProps = {
	ownerState: ToggleOwnerState;
};

type OptionOwnerState = {
	isSelected: boolean;
	isDisabled: boolean;
};

type StyledOptionProps = {
	ownerState: OptionOwnerState;
};

const LIST_SPACING = '8px'; // spacing (padding, margin) for the list elements.
const ACTION_SPACING = '6px'; // spacing between actions.

const SelectRoot = styled( 'div', { name: 'Select', slot: 'Root' } )<StyledSelectProps>`
	${ ( { ownerState } ) => {
	return {
		width: ownerState.width,
		display: 'inline-flex'
	};
} }
`;
const SelectToggle = styled( 'div', { name: 'Select', slot: 'Toggle' } )<StyledToggleProps>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	user-select: none;
	width: 100%;

	& > :not( style ) + :not( style ) {
		margin-left: 4px;
		margin-right: -2px;
	}

	${ ( { theme, ownerState } ) => {
	const { isOpen } = ownerState;
	const style: any = {
		borderRadius: theme.fields.borderRadius,
		padding: theme.fields.padding[ ownerState.size ],
		fontSize: theme.fields.fontSize,
		lineHeight: 1.5,
		background: theme.fields.background,
		color: theme.fields.color,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		'&:focus, &:focus-visible': {
			borderColor: theme.fields.focusedBorderColor,
			boxShadow: theme.fields.focusedBoxShadow,
			outline: 'none'
		},
	};

	if ( isOpen ) {
		style.borderColor = theme.fields.focusedBorderColor;
		style.boxShadow = theme.fields.focusedBoxShadow;
	}

	return style;
} };
`;
const SelectToggleLabel = styled( 'span', { name: 'Select', slot: 'ToggleLabel' } )`
	flex: 1;
	min-width: 0;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const SelectTogglePlaceholder = styled( 'span', { name: 'Select', slot: 'TogglePlaceholder' } )( ( { theme }: { theme: Theme } ) => ( {
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

const SelectToggleTag = styled( 'div', { name: 'Select', slot: 'ToggleTag' } )( ( { theme }: { theme: Theme } ) => ( {
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

const SelectToggleTagRemove = styled( FwIcon, { name: 'Select', slot: 'ToggleTagRemove' } )(
	( { theme }: { theme: Theme } ) => ( {
		fontSize: '10px',
		borderRadius: '50%',
		padding: '3px',
		marginRight: '6px',
		background: theme.palette.action.selected,
		boxSizing: 'content-box',
		'&:hover': {
			background: alpha(
				theme.palette.action.selected!,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		},
	} )
);

const SelectToggleActions = styled( 'div', { name: 'Select', slot: 'Toggle' } )`
	display: flex;
	align-items: center;
	box-sizing: border-box;
`;

const SelectToggleSpinner = styled( 'span', { name: 'Select', slot: 'ToggleSpinner' } )`
	display: inline-flex;
	margin-right: ${ ACTION_SPACING };
`;

const SelectToggleClear = styled( IconButton, { name: 'Select', slot: 'ToggleClear' } )`
	font-size: 15px;
	padding: 4px;
	margin: -4px;
	& > svg {
		width: 1em;
	}
`;

const SelectToggleExpand = styled( 'span', { name: 'Select', slot: 'ToggleExpand' } )<StyledToggleProps>(
	( { theme, ownerState } ) => ( {
		display: 'inline-flex',
		fontSize: '20px',
		opacity: 0.4,
		marginLeft: ACTION_SPACING,
		marginRight: -4,
		...( ownerState.isOpen && {
			opacity: 1,
			color: theme.fields.focusedBorderColor,
		} ),
		'& > svg': {
			width: '1em',
		}
	} )
);

const SelectOptions = styled( 'div', { name: 'Select', slot: 'Options' } )( ( { theme }: { theme: Theme } ) => ( {
	maxHeight: '200px',
	overflowY: 'auto',
	padding: `${ LIST_SPACING } 0`,
	fontSize: theme.fields.fontSize,
} ) );

const SelectOption = styled( 'div', { name: 'Select', slot: 'Option' } )<StyledOptionProps>( ( { theme, ownerState } ) => ( {
	padding: theme.fields.padding.md,
	background: theme.fields.background,
	lineHeight: 1.5,
	cursor: 'pointer',
	userSelect: 'none',
	...( !ownerState.isDisabled && {
		'&:hover': {
			background: alpha( theme.palette.primary.main ?? '', theme.palette.action.hoverOpacity ),
			color: theme.palette.primary.main,
		},
	} ),
	...( ownerState.isSelected && !ownerState.isDisabled && {
		background: alpha( theme.palette.primary.main ?? '', theme.palette.action.selectedOpacity ),
		color: theme.palette.primary.main,

		'&:hover': {
			background: alpha(
				theme.palette.primary.main ?? '',
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		},
	} ),
	...( ownerState.isDisabled && {
		opacity: theme.palette.action.disabledOpacity,
		color: alpha( theme.palette.action.disabled!, 1 ),
		cursor: 'default',
	} ),
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

const DefaultSelectOption = ( props: React.ComponentProps<'div'> & { ownerState: OptionOwnerState } ) => {
	const { children, ownerState, ...other } = props;
	const { isSelected, isDisabled } = ownerState;
	const optionRef = useRef<HTMLDivElement>( null );

	useEffect( () => {
		if ( isSelected && !isDisabled && optionRef.current ) {
			// TODO: do not focus the option! Instead, use 'aria-activedescendant' and scroll the list down to the first selected option.
			optionRef.current.focus();
		}
	}, [] );

	return (
		<SelectOption { ...other } ownerState={ ownerState } ref={ optionRef } role="option" tabIndex={ -1 } aria-selected={ isSelected }>
			{ children }
		</SelectOption>
	);
};

function defaultRenderOption( args: RenderOptionArgs ) {
	const { id, isSelected, isDisabled, onSelect, label } = args;

	const ownerState: OptionOwnerState = {
		isSelected,
		isDisabled,
	};

	const handleSelect = !isDisabled ? onSelect : noop;

	return (
		<DefaultSelectOption onClick={ handleSelect } ownerState={ ownerState } id={ id }>
			{ label }
		</DefaultSelectOption>
	);
}

const Toggle = forwardRef<HTMLDivElement, ToggleArgs>(
	(
		{ label, placeholder, onToggle, isEmpty, allowClear, onClear, isOpen, selectProps }: ToggleArgs, ref ) => {
		const [ isFocused, setIsFocused ] = useState( false );
		const { size, showTags, limitTags, getOptionValue, getOptionLabel, selectedOptions, unselectOption, isLoading } = selectProps;
		const ownerState: ToggleOwnerState = {
			isOpen,
			isEmpty,
			isFocused,
			size
		};

		let display = <SelectToggleLabel>{ label }</SelectToggleLabel>;
		if ( isEmpty ) {
			display = <SelectTogglePlaceholder>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>;
		}
		if ( showTags ) {
			const tagsToShow = !isFocused && !isOpen && limitTags > 0 ? selectedOptions.slice( 0, limitTags ) : selectedOptions;
			const hiddenTags = selectedOptions.length - tagsToShow.length;
			display = (
				<>
					{ !!selectedOptions.length ? (
						<SelectToggleTags>
							{ tagsToShow.map( ( option ) => {
								const tagKey = getOptionValue( option );
								const tagLabel = getOptionLabel( option );
								return (
									<SelectToggleTag key={ tagKey }>
										<SelectToggleTagLabel>{ tagLabel }</SelectToggleTagLabel>
										<SelectToggleTagRemove
											icon="close-alt"
											onClick={ ( e: React.MouseEvent ) => {
												e.stopPropagation();
												unselectOption( option );
											} }
										/>
									</SelectToggleTag>
								);
							} ) }
							{ !!hiddenTags && <SelectToggleHiddenTagsCount>{ ` +${ hiddenTags }` }</SelectToggleHiddenTagsCount> }
							<SelectTogglePlaceholder>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>
						</SelectToggleTags>
					) : (
						<SelectTogglePlaceholder>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>
					) }
				</>
			);
		}

		return (
			<SelectToggle
				ref={ ref }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ () => setIsFocused( false ) }
				onClick={ onToggle }
				ownerState={ ownerState }
				aria-expanded={ isOpen ? 'true' : 'false' }
				aria-haspopup="listbox"
				role="combobox"
				tabIndex={ 0 }
			>
				{ !!display ? display : <ZeroWidthSpace/> }

				<SelectToggleActions>
					{ isLoading && (
						<SelectToggleSpinner>
							<Spinner size={ 16 }/>
						</SelectToggleSpinner>
					) }

					{ allowClear && !isEmpty && !showTags && (
						<SelectToggleClear
							onClick={ ( e: React.MouseEvent ) => {
								e.stopPropagation();
								onClear();
							} }
						>
							<XMarkIcon/>
						</SelectToggleClear>
					) }

					<SelectToggleExpand ownerState={ ownerState }>
						<ChevronUpDownIcon/>
					</SelectToggleExpand>
				</SelectToggleActions>
			</SelectToggle>
		);
	}
);

const useDefaultValue = ( props: Required<Pick<SelectOwnProps, 'multiple' | 'allowClear' | 'getOptionValue' | 'options'>> ) => {
	const {
		multiple,
		allowClear,
		getOptionValue,
		options
	} = props;

	const enabledOptions = useMemo( () => options.filter( option => !( option?.disabled ?? false ) ), [ options ] );

	if ( multiple ) {
		return [];
	}

	if ( allowClear ) {
		return '';
	}

	if ( enabledOptions.length ) {
		return getOptionValue( enabledOptions[ 0 ] );
	}
	return '';
}

const Select = forwardRef<HTMLDivElement, SelectOwnProps>( function Select(
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
	const defaultValue = useDefaultValue( { multiple, allowClear, getOptionValue, options } );
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

	const unselectOption = ( option: any ) => {
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

	const handleChange = ( option: any, args: { onClose: () => void } ) => {
		const { onClose } = args;
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
			onClose();
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

	const ownerState: SelectOwnerState = {
		width,
	};

	const toggleSelectProps: ToggleSelectProps = {
		multiple,
		showTags,
		limitTags,
		getOptionValue,
		getOptionLabel,
		selectedOptions,
		unselectOption,
		isLoading,
		size
	};

	return (
		<SelectRoot ownerState={ ownerState } { ...other } ref={ ref } id={ selectIds.root }>
			{ arrayValue.map( _ => (
				<input key={ _ } type="hidden" name={ name } value={ _ }/>
			) ) }
			<Dropdown
				renderToggle={ ( { isOpen, onToggle, onClose, ref: toggleRef } ) => {
					return (
						<Toggle
							ref={ toggleRef as Ref<HTMLDivElement> }
							label={ toggleLabel }
							placeholder={ placeholder }
							onToggle={ onToggle }
							isEmpty={ isEmpty }
							allowClear={ allowClear }
							onClear={ () => {
								onClear();
								setValue( multiple ? [] : '' );
								onClose();
							} }
							isOpen={ isOpen }
							selectProps={ toggleSelectProps }
						/>
					);
				} }
				renderContent={ ( { onClose } ) => {
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
									startAdornment={ <FwIcon icon="magnifier"/> }
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
													onSelect: () => handleChange( option, { onClose } ),
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
			/>
		</SelectRoot>
	);
} );

export default Select;