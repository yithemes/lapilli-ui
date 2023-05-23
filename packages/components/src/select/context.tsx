import React from 'react';
import type { SelectOption, SelectOwnProps } from "./types";

type ProviderProps = {
	deselectOption: ( option: SelectOption ) => void
	selectedOptions: SelectOption[]
	children: React.ReactNode
} & Required<Pick<SelectOwnProps, 'multiple' | 'getOptionValue' | 'getOptionLabel' | 'isLoading' | 'size' | 'limitTags' | 'showTags'>>

type ContextValue = Omit<ProviderProps, 'children'>

const SelectContext = React.createContext<ContextValue>( {} as ContextValue );

export const useSelectContext = (): ContextValue => React.useContext( SelectContext );

export function SelectProvider( { children, ...props }: ProviderProps ) {
	const theContext: ContextValue = props;
	return (
		<SelectContext.Provider value={ theContext }>
			{ children }
		</SelectContext.Provider>
	)
}