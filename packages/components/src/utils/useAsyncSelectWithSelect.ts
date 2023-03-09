import { useCallback, useMemo, useState } from 'react';
import { noop } from "lodash";
import { __, sprintf } from "@wordpress/i18n";
import { useSelect } from '@wordpress/data';
import { debounce } from 'lodash';

export type SelectValue<IsMultiple extends boolean> = IsMultiple extends true ? string[] : string;

type AsyncSelectProps<IsMultiple extends boolean> = {
	multiple?: IsMultiple
	onChange?: ( value: SelectValue<IsMultiple> ) => void
	value?: SelectValue<IsMultiple>
	minChars?: number
	mapSelect: ( select: any, term: string ) => { options: any[], isLoading: boolean, selected: any[] }
	minCharsText?: string,
	noResultsText?: string,
	loadingText?: string,
	selectProps?: any
}

export default function useAsyncSelectWithSelect<IsMultiple extends boolean = false>(
	{
		multiple,
		minChars = 3,
		onChange: onChangeProp = noop,
		value: valueProp,
		mapSelect,
		minCharsText = __( 'Please, enter %d or more characters...', 'yith-plugin-fw' ),
		noResultsText = __( 'No results for "%s".', 'yith-plugin-fw' ),
		loadingText = __( 'Searching...', 'yith-plugin-fw' ),
		selectProps = {}
	}: AsyncSelectProps<IsMultiple>,
	deps: any[] = [] ) {
	const defaultValue = ( multiple ? [] : '' ) as SelectValue<IsMultiple>;
	const value = typeof valueProp !== 'undefined' ? valueProp : defaultValue;
	const [ selectedKeys, setSelectedKeys ] = useState<SelectValue<IsMultiple>>( value );
	const [ searchedTerm, setSearchedTerm ] = useState( '' );
	const [ selectedLoadedOptions, setSelectedLoadedOptions ] = useState<null | any[]>( null );

	const mapSelectCb = useCallback( mapSelect, deps );
	const isOptionSelected = useCallback( ( _: any ) => multiple ? selectedKeys.includes( _.key ) : selectedKeys === _.key, [ selectedKeys, multiple ] );

	const { options, isLoading } = useSelect( ( select: any ) => {
			const { options, selected, isLoading } = mapSelectCb( select, searchedTerm );
			const initialSelected = selectedLoadedOptions === null ? selected.filter( isOptionSelected ) : [];
			const reallySelected = selectedLoadedOptions !== null ? selectedLoadedOptions.filter( isOptionSelected ) : [];
			const nonSelectedOptions = options.filter( ( _: any ) => !isOptionSelected( _ ) );

			return {
				options: [ ...initialSelected, ...reallySelected, ...nonSelectedOptions ],
				isLoading
			}
		},
		[ searchedTerm, mapSelectCb, selectedKeys, selectedLoadedOptions ]
	);

	const selectMessage = useMemo( () => {
		if ( minChars > 0 && searchedTerm.length < minChars && !isLoading ) {
			return sprintf( minCharsText, minChars );
		}

		if ( searchedTerm.length >= minChars && !isLoading ) {
			return sprintf( noResultsText, searchedTerm );
		}

		return '';
	}, [ searchedTerm, isLoading, options ] );

	const onSearch = useMemo( () => {
		return debounce( ( term: string ) => {
			setSearchedTerm( term );
		}, 200 );
	}, [] );

	const onChange = useCallback( ( newValue: SelectValue<IsMultiple> ) => {
		setSelectedKeys( newValue );
		setSelectedLoadedOptions( options.filter( ( _: any ) => multiple ? newValue.includes( _.key ) : newValue === _.key ) );
		onChangeProp( newValue );
	}, [ options, multiple ] );

	return {
		selectProps: {
			options,
			value: selectedKeys,
			multiple,
			showTags: true,
			allowSearch: true,
			hideSelectedOptions: true,
			closeOnSelect: true,
			isLoading,
			onSearch,
			onChange,
			noOptionsText: selectMessage,
			noResultsText: selectMessage,
			loadingText,
			filterSearch: () => true,
			...selectProps
		}
	}
}
