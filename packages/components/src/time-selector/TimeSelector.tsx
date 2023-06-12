import { styled } from '@yith/styles';
import { noop, range } from 'lodash';
import React, { useMemo, useState } from 'react';
import Select from '../select';

type Time = {
	hours: number;
	minutes: number;
	hoursVal: string;
	minutesVal: string;
	value: string;
};

type TimeSelectorProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> & {
	value?: string;
	onChange?: ( ( value: string ) => void ) | React.Dispatch<React.SetStateAction<string>>;
	minutesStep?: number;
};

const TimeSelectorRoot = styled( 'div', { name: 'TimeSelector', slot: 'Root' } )`
	display: flex;
	align-items: baseline;
`;

const TimeSelectorSeparator = styled( 'span', { name: 'TimeSelector', slot: 'Separator' } )`
	margin: 0 5px;
`;

const getHours = ( value: string | number ): number => {
	let hours = typeof value === 'number' ? value : parseInt( value, 10 );
	hours = Math.min( 23, hours );
	hours = Math.max( 0, hours );
	return hours;
};

const getMinutes = ( value: string | number ): number => {
	let minutes = typeof value === 'number' ? value : parseInt( value, 10 );
	minutes = Math.min( 59, minutes );
	minutes = Math.max( 0, minutes );
	return minutes;
};

const getTime = ( hours: string | number, minutes: string | number ): Time => {
	hours = getHours( hours );
	minutes = getMinutes( minutes );

	return {
		hours,
		minutes,
		hoursVal: formatSingle( hours ),
		minutesVal: formatSingle( minutes ),
		value: `${ formatSingle( hours ) }:${ formatSingle( minutes ) }`,
	};
};

const getTimeFromString = ( time: string ): Time => {
	const [ h = 0, m = 0 ] = time.split( ':' );
	const hours = getHours( h );
	const minutes = getMinutes( m );

	return getTime( hours, minutes );
};

const formatSingle = ( number: number ) => ( number > 9 ? number.toString() : `0${ number }` );

const HOURS = range( 24 )
	.map( formatSingle )
	.map( _ => ( { value: _, label: _ } ) );

const TimeSelector = React.forwardRef<HTMLInputElement, TimeSelectorProps>( function TimeSelector(
	{
		value = '00:00',
		onChange = noop,
		minutesStep = 1,
		...other
	},
	ref
) {
	const minutesOptions = useMemo(
		() =>
			range( 0, 60, minutesStep )
				.map( formatSingle )
				.map( _ => ( { value: _, label: _ } ) ),
		[ minutesStep ]
	);
	const timeProp = useMemo( () => getTimeFromString( value ), [ value ] );
	const [ hours, setHours ] = useState( timeProp.hoursVal );
	const [ minutes, setMinutes ] = useState( timeProp.minutesVal );
	const time = useMemo( () => getTime( hours, minutes ), [ hours, minutes ] );

	return (
		<TimeSelectorRoot>
			<input { ...other } type="hidden" value={ time.value } ref={ ref }/>
			<Select value={ hours } onChange={ ( _: string ) => setHours( _ ) } options={ HOURS } sx={ { width: 75 } }/>
			<TimeSelectorSeparator>:</TimeSelectorSeparator>
			<Select value={ minutes } onChange={ ( _: string ) => setMinutes( _ ) } options={ minutesOptions } sx={ { width: 75 } }/>
		</TimeSelectorRoot>
	);
} );

export default TimeSelector;
