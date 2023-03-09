export function scaleDimension( dimension: string | number | undefined, scale: number = 1 ): string {
	if ( !dimension ) {
		return '0';
	}

	if ( typeof dimension === 'number' ) {
		dimension = dimension.toString();
	}

	const dimensions = dimension.replace( /\s+/g, ' ' ).trim().split( ' ' );

	const scaledDimensions = dimensions.map( theDimension => {
		const match = theDimension.match( /(\d*\.?\d*)([a-z]+)?/ );

		let number = 0;
		let unit = 'px';

		if ( !!match ) {
			number = parseFloat( match[ 1 ] ?? 0 ) * scale;
			unit = match[ 2 ] ?? 'px';
		}

		return number + unit;
	} );

	return scaledDimensions.join( ' ' );
}
