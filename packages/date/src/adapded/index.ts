import {
	addDays as _addDays,
	addMonths as _addMonths,
	addYears as _addYears,
	getDay as _getDay,
	endOfMonth as _endOfMonth,
	endOfWeek as _endOfWeek,
	isAfter as _isAfter,
	isBefore as _isBefore,
	isSameDay as _isSameDay,
	isSameMonth as _isSameMonth,
	startOfDay as _startOfDay,
	startOfMonth as _startOfMonth,
	startOfWeek as _startOfWeek,
} from 'date-fns'
import { getLocale } from "../settings";

export const addDays = ( date: Date, count: number ) => {
	return _addDays( date, count );
}

export const addMonths = ( date: Date, count: number ) => {
	return _addMonths( date, count );
}

export const addYears = ( date: Date, count: number ) => {
	return _addYears( date, count );
}

export const getDay = ( date: Date ) => {
	return _getDay( date );
}

export const endOfMonth = ( date: Date ) => {
	return _endOfMonth( date );
}

export const endOfWeek = ( date: Date ) => {
	return _endOfWeek( date, { locale: getLocale() } );
}

export const isAfter = ( date: Date, comparing: Date ) => {
	return _isAfter( date, comparing );
}

export const isBefore = ( date: Date, comparing: Date ) => {
	return _isBefore( date, comparing );
}

export const isSameDay = ( date: Date, comparing: Date ) => {
	return _isSameDay( date, comparing );
}

export const isSameMonth = ( date: Date, comparing: Date ) => {
	return _isSameMonth( date, comparing );
}

export const startOfDay = ( date: Date = new Date() ) => {
	return _startOfDay( date );
}

export const startOfMonth = ( date: Date = new Date() ) => {
	return _startOfMonth( date );
}

export const startOfWeek = ( date: Date = new Date() ) => {
	return _startOfWeek( date, { locale: getLocale() } );
}