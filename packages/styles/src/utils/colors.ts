type Color = {
	red: number;
	green: number;
	blue: number;
	alpha: number;
};

/**
 * Returns a number whose value is limited to the given range.
 */
function clamp( value: number, min: number = 0, max: number = 1 ): number {
	return Math.min( Math.max( min, value ), max );
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 */
export function hexToRgb( color: string ): string {
	color = color.slice( 1 );

	const re = new RegExp( `.{1,${ color.length >= 6 ? 2 : 1 }}`, 'g' );
	let colors: string[] | null = color.match( re );

	if ( colors && colors[ 0 ].length === 1 ) {
		colors = colors.map( n => n + n );
	}

	return colors
		? `rgb${ colors.length === 4 ? 'a' : '' }(${ colors
			.map( ( n, index ) => {
				return index < 3 ? parseInt( n, 16 ) : Math.round( ( parseInt( n, 16 ) / 255 ) * 1000 ) / 1000;
			} )
			.join( ', ' ) })`
		: '';
}

/**
 * Returns an object with the type and values of a color.
 */
export function decomposeColor( color: Color | string ): Color {
	if ( typeof color === 'object' ) {
		return color;
	}

	if ( color.charAt( 0 ) === '#' ) {
		return decomposeColor( hexToRgb( color ) );
	}

	const marker = color.indexOf( '(' );
	const type = color.substring( 0, marker );

	if ( [ 'rgb', 'rgba' ].indexOf( type ) === -1 ) {
		throw `Unsupported ${ color } color.\nThe following formats are supported: #nnn, #nnnnnn, rgb(), rgba().`;
	}

	const stringValues = color.substring( marker + 1, color.length - 1 );
	const values = stringValues.split( ',' ).map( value => parseFloat( value ) );

	return {
		red: values[ 0 ] ?? 0,
		green: values[ 1 ] ?? 0,
		blue: values[ 2 ] ?? 0,
		alpha: clamp( 'rgba' === type ? values[ 3 ] ?? 1 : 1 ),
	};
}

/**
 * Converts a color object with type and values to a string.
 */
export function recomposeColor( color: Color ): string {
	const { red, green, blue, alpha } = color;

	if ( alpha < 1 ) {
		return `rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`;
	} else {
		return `rgb(${ red }, ${ green }, ${ blue })`;
	}
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 */
export function alpha( color: string, value: number ): string {
	const theColor = decomposeColor( color );

	theColor.alpha = clamp( value );

	return recomposeColor( theColor );
}
