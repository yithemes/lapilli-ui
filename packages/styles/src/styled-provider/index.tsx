import React from 'react';
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import weakMemoize from "@emotion/weak-memoize";
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

type Direction = 'rtl' | 'ltr'

type StyledProviderProps = {
	document?: Document
	direction?: Direction
	children: React.ReactNode
};

type MemoizedCacheArgs = {
	container: Node,
	direction: Direction
}

const memoizedCreateCache = weakMemoize(
	( { container, direction }: MemoizedCacheArgs ) => {
		const isRTL = direction === 'rtl';
		return createCache( {
			key: 'lapilli-ui' + ( isRTL ? '-rtl' : '' ),
			container,
			stylisPlugins: isRTL ? [ prefixer, rtlPlugin ] : undefined
		} )
	}
);

export default function StyledProvider(
	{
		document: currentDocument,
		direction,
		children
	}: StyledProviderProps ) {
	const theDocument = currentDocument ?? document;
	const cache = memoizedCreateCache( {
		container: theDocument.head,
		direction: direction ?? ( theDocument.dir === 'rtl' ? 'rtl' : 'ltr' )
	} );

	return <CacheProvider value={ cache }>
		{ children }
	</CacheProvider>
}
