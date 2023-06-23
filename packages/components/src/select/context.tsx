import React from 'react';
import type { SelectOptionParams, SelectProps } from "./types";

export type SelectProviderProps = {
	handleTyping: ( event: React.KeyboardEvent<HTMLDivElement> ) => boolean
	deselectOption: ( option: SelectOptionParams ) => void
	handleChange: ( option: SelectOptionParams ) => void
	selectedOptions: SelectOptionParams[] // TO CHECK if needed
	searchedTerm: string // TO CHECK if needed
	setSearchedTerm: React.Dispatch<React.SetStateAction<string>> // TO CHECK if needed
	filteredOptions: SelectOptionParams[]
	isOptionSelected: ( option: SelectOptionParams ) => boolean
	getOptionId: ( index: number ) => string
	isEmpty: boolean
	activeDescendantIndex: number
	setActiveDescendantIndex: React.Dispatch<React.SetStateAction<number>>
	nextActiveDescendant: ( increment?: number ) => void
	prevActiveDescendant: ( increment?: number ) => void
	unsetActiveDescendant: () => void
	moveToFirstActiveDescendant: () => void
	moveToLastActiveDescendant: () => void
	componentIds: {
		listbox: string
		options: string
	}
	children: React.ReactNode
} & Required<Pick<SelectProps,
	'id'
	| 'allowClear'
	| 'placeholder'
	| 'hideToggleIcon'
	| 'multiple'
	| 'getOptionValue'
	| 'getOptionLabel'
	| 'isLoading'
	| 'size'
	| 'limitTags'
	| 'showTags'
	| 'variant'
	| 'value'
	| 'options'
	| 'allowSearch'
	| 'renderOptionContent'
	| 'renderOption'
	| 'noResultsText'
	| 'noOptionsText'
	| 'loadingText'
	| 'searchPlaceholder'
	| 'closeOnSelect'
	| 'disabled'
	| 'classes'
>
>
	& Pick<SelectProps, 'renderToggleContent'>

type ContextValue = Omit<SelectProviderProps, 'children'>

const SelectContext = React.createContext<ContextValue>( {} as ContextValue );

export const useSelectContext = (): ContextValue => React.useContext( SelectContext );

export function SelectProvider( { children, ...props }: SelectProviderProps ) {
	const theContext: ContextValue = props;

	return (
		<SelectContext.Provider value={ theContext }>
			{ children }
		</SelectContext.Provider>
	)
}