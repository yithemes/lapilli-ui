import {
	dateI18n as wpDateI18n,
	gmdateI18n as wpGmdateI18n,
	getSettings,
	__experimentalGetSettings
} from '@wordpress/date'
import { startOfWeek as _startOfWeek, endOfWeek as _endOfWeek, startOfMonth, endOfMonth, isBefore, getDay, addDays } from 'date-fns'

export { addMonths, addDays, addYears, isSameDay, isSameMonth, startOfMonth, endOfMonth, isBefore, isAfter, startOfDay } from 'date-fns';

const wpDateGetSettings = getSettings ?? __experimentalGetSettings ?? ( () => ( {} ) );
const wpDateSettings = wpDateGetSettings();

/**
 * Wrapper for WP dateI18n function.
 * @param dateFormat PHP-style formatting string.
 * @param date Date object.
 * @param timezone Timezone to output result in or a UTC offset. Defaults to timezone from site. Use 'same' to use the same timezone of the passed date object.
 */
export const formatDate = (
	dateFormat: string,
	date: Date = new Date(),
	timezone?: 'same' | string | number | boolean
) => {
	if ( 'same' === timezone ) {
		timezone = -date.getTimezoneOffset();
	}
	return wpDateI18n( dateFormat, date, timezone )
};

/**
 * Wrapper for WP dateI18n function.
 * @param dateFormat PHP-style formatting string.
 * @param date Date object.
 */
export const formatDateSameTimezone = (
	dateFormat: string,
	date: Date = new Date(),
) => formatDate( dateFormat, date, 'same' );


/**
 * Wrapper for WP gmdateI18n function.
 *
 * @param dateFormat PHP-style formatting string.
 * @param date Date object.
 */
export const formatGmDate = ( dateFormat: string, date: Date = new Date() ) => wpGmdateI18n( dateFormat, date );

/**
 * Wrapper for date-fns startOfWeek function.
 * This sets the default weekday start based on the WP settings.
 * @param date Date object.
 * @param options Object of options.
 */
export const startOfWeek = (
	date: Date = new Date(),
	options?: {
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
	}
) => {
	const weekStartsOn = options?.weekStartsOn ?? wpDateSettings?.l10n?.startOfWeek ?? 0;
	return _startOfWeek( date, { weekStartsOn } );
}

/**
 * Wrapper for date-fns endOfWeek function.
 * This sets the default weekday start based on the WP settings.
 * @param date Date object.
 * @param options Object of options.
 */
export const endOfWeek = (
	date: Date = new Date(),
	options?: {
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
	}
) => {
	const weekStartsOn = options?.weekStartsOn ?? wpDateSettings?.l10n?.startOfWeek ?? 0;
	return _endOfWeek( date, { weekStartsOn } );
}

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