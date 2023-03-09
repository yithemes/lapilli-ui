import type React from "react";

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
const glowOpacity = 0.12;

type ShadowType = 'umbra' | 'penumbra' | 'ambient';

function createShadow(
	baseRgb: number[] = [ 0, 0, 0 ],
	shadowsToUse: ShadowType[] = [ 'umbra', 'penumbra', 'ambient' ],
	...px: number[]
): React.CSSProperties[ 'boxShadow' ] {
	const theShadows = [];

	if ( shadowsToUse.includes( 'umbra' ) ) {
		theShadows.push( `${ px[ 0 ] }px ${ px[ 1 ] }px ${ px[ 2 ] }px ${ px[ 3 ] }px rgba(${ baseRgb[ 0 ] },${ baseRgb[ 1 ] },${ baseRgb[ 2 ] },${ shadowKeyUmbraOpacity })` );
	}

	if ( shadowsToUse.includes( 'penumbra' ) ) {
		theShadows.push( `${ px[ 4 ] }px ${ px[ 5 ] }px ${ px[ 6 ] }px ${ px[ 7 ] }px rgba(${ baseRgb[ 0 ] },${ baseRgb[ 1 ] },${ baseRgb[ 2 ] },${ shadowKeyPenumbraOpacity })` );
	}

	if ( shadowsToUse.includes( 'ambient' ) ) {
		theShadows.push( `${ px[ 8 ] }px ${ px[ 9 ] }px ${ px[ 10 ] }px ${ px[ 11 ] }px rgba(${ baseRgb[ 0 ] },${ baseRgb[ 1 ] },${ baseRgb[ 2 ] },${ shadowAmbientShadowOpacity })` );
	}

	return theShadows.join( ',' );
}

function createGlow( baseRgb: number[] = [ 0, 0, 0 ], ...px: number[] ): React.CSSProperties[ 'boxShadow' ] {
	return `${ px[ 0 ] }px ${ px[ 1 ] }px ${ px[ 2 ] }px ${ px[ 3 ] }px rgba(${ baseRgb[ 0 ] },${ baseRgb[ 1 ] },${ baseRgb[ 2 ] },${ glowOpacity })`
}

export function createShadows( baseRgb: number[], shadowsToUse?: ShadowType[] ) {
	return [
		'none',
		createShadow( baseRgb, shadowsToUse, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0 ),
		createShadow( baseRgb, shadowsToUse, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1 ),
		createShadow( baseRgb, shadowsToUse, 0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2 ),
		createShadow( baseRgb, shadowsToUse, 0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2 ),
		createShadow( baseRgb, shadowsToUse, 0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3 ),
		createShadow( baseRgb, shadowsToUse, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3 ),
		createShadow( baseRgb, shadowsToUse, 0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4 ),
		createShadow( baseRgb, shadowsToUse, 0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4 ),
		createShadow( baseRgb, shadowsToUse, 0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4 ),
		createShadow( baseRgb, shadowsToUse, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5 ),
		createShadow( baseRgb, shadowsToUse, 0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5 ),
		createShadow( baseRgb, shadowsToUse, 0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5 ),
		createShadow( baseRgb, shadowsToUse, 0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6 ),
		createShadow( baseRgb, shadowsToUse, 0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6 ),
		createShadow( baseRgb, shadowsToUse, 0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7 ),
		createShadow( baseRgb, shadowsToUse, 0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7 ),
		createShadow( baseRgb, shadowsToUse, 0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7 ),
		createShadow( baseRgb, shadowsToUse, 0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8 ),
		createShadow( baseRgb, shadowsToUse, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8 ),
	];
}

export function createGlows( baseRgb: number[] ) {
	return [
		'none',
		createGlow( baseRgb, 0, 1, 2, 1 ),
		createGlow( baseRgb, 0, 1, 2, 1 ),
		createGlow( baseRgb, 0, 1, 4, 2 ),
		createGlow( baseRgb, 0, 2, 5, 2 ),
		createGlow( baseRgb, 0, 2, 8, 3 ),
		createGlow( baseRgb, 0, 2, 10, 3 ),
		createGlow( baseRgb, 0, 3, 10, 4 ),
		createGlow( baseRgb, 0, 3, 10, 4 ),
		createGlow( baseRgb, 0, 3, 12, 5 ),
		createGlow( baseRgb, 0, 4, 14, 5 ),
		createGlow( baseRgb, 0, 4, 15, 5 ),
		createGlow( baseRgb, 0, 4, 17, 6 ),
		createGlow( baseRgb, 0, 5, 19, 6 ),
		createGlow( baseRgb, 0, 5, 21, 6 ),
		createGlow( baseRgb, 0, 5, 22, 7 ),
		createGlow( baseRgb, 0, 6, 24, 7 ),
		createGlow( baseRgb, 0, 6, 26, 7 ),
		createGlow( baseRgb, 0, 6, 28, 8 ),
		createGlow( baseRgb, 0, 6, 29, 8 ),
		createGlow( baseRgb, 0, 6, 31, 8 ),
		createGlow( baseRgb, 0, 7, 33, 9 ),
		createGlow( baseRgb, 0, 7, 35, 9 ),
		createGlow( baseRgb, 0, 7, 36, 9 ),
		createGlow( baseRgb, 0, 7, 38, 9 ),
	];
}