import React from 'react';

type DocumentProviderProps = {
	document?: Document
	children: React.ReactNode
}

const Context = React.createContext<Document | undefined>( typeof document !== 'undefined' ? document : undefined );

export const useDocument = () => React.useContext( Context );

export default function DocumentProvider( { children, document: documentProp }: DocumentProviderProps ) {
	return <Context.Provider value={ documentProp ? documentProp : document }>
		{ children }
	</Context.Provider>
}