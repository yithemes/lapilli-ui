import { merge } from "lodash";
import { defaultFormat, defaultLocale } from "../adapded/private";

export const settings = {
	dateFormats: {
		year: "yyyy", // 2023
		month: "LLLL", // June
		dayOfMonth: "d", // 5
		monthShort: "MMM", // Jun
		weekday: "EEEE", // Thursday
		weekdayShort: "EEE", // Thu

		fullDate: "PP", // Jun 5, 2023
		inputDate: "yyyy-MM-dd", // 2023-06-05

		monthAndDate: "MMMM d", // June 5
		monthAndYear: "LLLL yyyy", // June 2023
	},
	locale: defaultLocale,
	formatDate: ( dateFormat: string, date: Date = new Date() ) => {
		return defaultFormat( date, dateFormat, { locale: getLocale() } );
	}
}

export const setDateFormats = ( formats: typeof settings.dateFormats | any ) => {
	settings.dateFormats = { ...settings.dateFormats, ...formats };
}

export const setLocale = ( locale: typeof settings.locale | any ) => {
	settings.locale = merge( settings.locale, locale );
}

export const setFormatDate = ( formatDate: typeof settings.formatDate ) => {
	settings.formatDate = formatDate;
}

export const getDateFormats = () => settings.dateFormats;
export const getDateFormat = ( key: keyof typeof settings.dateFormats ) => settings.dateFormats[ key ] ?? key;
export const getLocale = () => settings.locale;