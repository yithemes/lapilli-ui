import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache( {
	key: 'yith-ui-rtl',
	stylisPlugins: [ prefixer, rtlPlugin ],
} );

/**
 * Wrapper for handling RTL styles.
 * @param children
 * @constructor
 */
export const RTL = ( { children }: { children: React.ReactNode } ) => {
	return <CacheProvider value={ cacheRtl }>{ children }</CacheProvider>;
}