import React from 'react';

type DropdownProviderProps = {
	isOpen: boolean
	toggle: () => void
	close: () => void
	open: () => void
	children: React.ReactNode
}

type ContextValue = Omit<DropdownProviderProps, 'children'>

const Context = React.createContext<ContextValue>( {} as ContextValue );

export const useDropdown = (): ContextValue => React.useContext( Context );

export function DropdownProvider( { children, ...props }: DropdownProviderProps ) {
	const theContext: ContextValue = props;
	return (
		<Context.Provider value={ theContext }>
			{ children }
		</Context.Provider>
	)
}