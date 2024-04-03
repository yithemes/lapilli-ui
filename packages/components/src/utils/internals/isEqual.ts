const getValueForEquality = ( value: any ) => {
	if ( value instanceof Date ) {
		return value.getTime()
	}

	return value
}

/**
 * Return true if the first and the second parameter has the same value.
 * By default, it uses strict comparison.
 * In case of dates, it compares the timestamp.
 *
 * @param first
 * @param second
 */
export default function isEqual( first: any, second: any ) {
	return getValueForEquality( first ) === getValueForEquality( second );
}