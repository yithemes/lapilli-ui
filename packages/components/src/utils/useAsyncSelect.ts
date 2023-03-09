import { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { noop } from "lodash";
import { __, sprintf } from "@wordpress/i18n";

export type SelectValue<IsMultiple extends boolean> = IsMultiple extends true ? string[] : string;

type AsyncSelectProps<IsMultiple extends boolean> = {
	multiple?: IsMultiple
	onChange?: ( value: SelectValue<IsMultiple> ) => void
	value?: SelectValue<IsMultiple>
	minChars?: number
	loadOptions: ( term: string, callback: ( options?: any[] ) => void ) => Promise<any[]> | void
	loadOptionsByKeys: ( keys: string[], callback: ( options?: any[] ) => void ) => Promise<any[]> | void
	minCharsText?: string,
	noResultsText?: string,
	loadingText?: string,
}

export default function useAsyncSelect<IsMultiple extends boolean = false>(
	{
		multiple,
		minChars = 3,
		onChange: onChangeProp = noop,
		value: valueProp,
		loadOptions: loadOptionsProp,
		loadOptionsByKeys: loadOptionsByKeysProp,
		minCharsText = __( 'Please, enter %d or more characters...', 'yith-plugin-fw' ),
		noResultsText = __( 'No results for "%s".', 'yith-plugin-fw' ),
		loadingText = __( 'Searching...', 'yith-plugin-fw' ),
	}: AsyncSelectProps<IsMultiple>,
	selectProps = {} ) {
	const defaultValue = ( multiple ? [] : '' ) as SelectValue<IsMultiple>;
	const value = typeof valueProp !== 'undefined' ? valueProp : defaultValue;

	const [ options, setOptions ] = useState<any[]>( [] );
	const [ selected, setSelected ] = useState<any[]>( [] );
	const [ selectedKeys, setSelectedKeys ] = useState<SelectValue<IsMultiple>>( value );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ searchedTerm, setSearchedTerm ] = useState( '' );
	const isMounted = useRef( false );
	const lastRequest = useRef<unknown>( undefined );
	const selectMessage = useMemo( () => {
		if ( minChars > 0 && searchedTerm.length < minChars && !isLoading ) {
			return sprintf( minCharsText, minChars );
		}

		if ( searchedTerm.length >= minChars && !isLoading ) {
			return sprintf( noResultsText, searchedTerm );
		}

		return '';
	}, [ searchedTerm, isLoading, options ] );

	const loadOptions = useCallback(
		( term: string, callback: ( options?: any[] ) => void ) => {
			if ( !loadOptionsProp ) return callback();
			const loader = loadOptionsProp( term, callback );
			if ( loader && typeof loader.then === 'function' ) {
				loader.then( callback, () => callback() );
			}
		},
		[ loadOptionsProp ]
	);
	const loadOptionsByKeys = useCallback(
		( keys: string[], callback: ( options?: any[] ) => void ) => {
			if ( !loadOptionsByKeysProp ) return callback();
			const loader = loadOptionsByKeysProp( keys, callback );
			if ( loader && typeof loader.then === 'function' ) {
				loader.then( callback, () => callback() );
			}
		},
		[ loadOptionsByKeysProp ]
	);

	const onSearch = useCallback( ( term: string ) => {
		setSearchedTerm( term );
		if ( term.length >= minChars ) {
			const request = ( lastRequest.current = {} );
			setIsLoading( true );
			loadOptions( term, ( loadedOptions: any ) => {
				if ( request !== lastRequest.current || !isMounted.current ) return;

				lastRequest.current = undefined;
				setOptions( [ ...selected, ...loadedOptions.filter( ( _: any ) => multiple ? !selectedKeys.includes( _.key ) : selectedKeys !== _.key ) ] );
				setIsLoading( false );
			} );
		} else {
			setOptions( [ ...selected ] );
			setIsLoading( false );
		}
	}, [ minChars, multiple, selected ] );

	const onChange = useCallback( ( newValue: SelectValue<IsMultiple> ) => {
		setSelectedKeys( newValue );
		setSelected( options.filter( ( option: any ) => multiple ? newValue.includes( option.key ) : newValue === option.key ) );
		onChangeProp( newValue );
	}, [ options, multiple ] );

	const onClose = useCallback( () => {
		setOptions( [ ...selected ] );
	}, [ selected ] );

	useEffect( () => {
		if ( selectedKeys.length ) {
			setIsLoading( true );

			loadOptionsByKeys(
				Array.isArray( selectedKeys ) ? selectedKeys : [ selectedKeys ],
				( _: any ) => {
					setOptions( _ );
					setSelected( _ );
					setSelectedKeys( _.map( ( option: any ) => option.key ) );
					setIsLoading( false );
				}
			);
		}
	}, [] );

	useEffect( () => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, [] );

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
			onClose,
			noOptionsText: selectMessage,
			noResultsText: selectMessage,
			loadingText,
			filterSearch: () => true,
			...selectProps
		}
	}
}
