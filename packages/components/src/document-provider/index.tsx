import React from 'react';

type DocumentProviderProps = {
	document?: Document
	children: React.ReactNode
}

const Context = React.createContext<Document>( document );

export const useDocument = (): Document => React.useContext( Context );

export default function DocumentProvider( { children, document: documentProp }: DocumentProviderProps ) {
	return <Context.Provider value={ documentProp ? documentProp : document }>
		{ children }
	</Context.Provider>
}