import React from 'react';
import type { SelectOptionParams, SelectOwnProps } from "./types";

export type SelectProviderProps = {
	deselectOption: ( option: SelectOptionParams ) => void
	selectedOptions: SelectOptionParams[]
	children: React.ReactNode
} & Required<Pick<SelectOwnProps, 'multiple' | 'getOptionValue' | 'getOptionLabel' | 'isLoading' | 'size' | 'limitTags' | 'showTags' | 'variant'>>
	& Pick<SelectOwnProps, 'renderToggleContent'>

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