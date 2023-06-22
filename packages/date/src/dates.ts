import { settings } from "./settings";
import { getDay, addDays, endOfMonth, endOfWeek, isBefore, startOfMonth, startOfWeek } from "./adapded";

/**
 * Format date.
 * @param dateFormat Formatting string.
 * @param date Date object.
 */
export const format = ( dateFormat: string, date: Date = new Date() ) => {
	return settings.formatDate( dateFormat, date );
};

export const getWeekArray = ( date: Date ) => {
	const start = startOfWeek( startOfMonth( date ) );
	const end = endOfWeek( endOfMonth( date ) );

	let count = 0;
	let current = start;
	const nestedWeeks: Date[][] = [];
	let lastDay = null;
	while ( isBefore( current, end ) ) {
		const weekNumber = Math.floor( count / 7 );
		nestedWeeks[ weekNumber ] = nestedWeeks[ weekNumber ] || [];
		const day = getDay( current );
		if ( lastDay !== day ) {
			lastDay = day;
			nestedWeeks[ weekNumber ].push( current );
			count += 1;
		}
		current = addDays( current, 1 );
	}
	return nestedWeeks;
};

/**
 * Retrieve a Date object.
 * @param date Date object.
 */
export const getDate = (
	date: Date | string | number = new Date(),
): Date | null => {
	if ( date instanceof Date ) {
		return date;
	} else {
		const theDate = new Date( date );

		if ( !isNaN( theDate.getTime() ) ) {
			return theDate;
		} else {
			return null;
		}
	}
}