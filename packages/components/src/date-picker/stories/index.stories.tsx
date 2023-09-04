import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '../';
import type { FieldSize } from "@maya-ui/styles";
import FormControl from "../../form-control";
import Select from "../../select";
import Input from "../../input";
import { isInteger } from "lodash";
import Typography from "../../typography";
import Box from "../../box";
import VStack from "../../v-stack";
import HStack from "../../h-stack";

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker',
	component: DatePicker,
	argTypes: {
		value: {
			control: 'date'
		},
		shouldDisableDate: { control: false },
		startAdornment: { control: false }
	}
};

export default meta;

type Story = StoryObj<typeof DatePicker>

const getDateFromStoryControl = ( date?: string | number | Date | null ) => {
	return typeof date === 'number' ? new Date( date ) : date;
}

export const Default: Story = {
	args: {
		placeholder: 'Select a date',
		size: 'md'
	},
	render: ( args ) => {
		const { value: valueFromStoryControls, minDate: minDateFromStoryControls, maxDate: maxDateFromStoryControls, ...others } = args;
		// In story controls, the date is returned as a UNIX timestamp.
		const value = getDateFromStoryControl( valueFromStoryControls );
		const minDate = getDateFromStoryControl( minDateFromStoryControls );
		const maxDate = getDateFromStoryControl( maxDateFromStoryControls );

		return <DatePicker { ...others } value={ value } minDate={ minDate } maxDate={ maxDate }/>
	}
}


export const Static: Story = {
	args: {
		...Default.args,
		isStatic: true
	}
}

export const DisabledDates: Story = {
	args: {
		...Default.args,
		placeholder: 'Select a date',
		size: 'md',
		isStatic: true,
		shouldDisableDate: ( date ) => date.getDate() === 15,
		minDate: "2022-01-01",
		maxDate: "2022-05-31",
	}
}

const isSameDay = ( a: Date, b: Date ) => {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const WithStartAdornment: Story = {
	args: Default.args,
	render: ( args ) => {
		const { value: valueFromStoryControls, minDate: minDateFromStoryControls, maxDate: maxDateFromStoryControls, ...others } = args;
		// In story controls, the date is returned as a UNIX timestamp.
		const value = getDateFromStoryControl( valueFromStoryControls );
		const minDate = getDateFromStoryControl( minDateFromStoryControls );
		const maxDate = getDateFromStoryControl( maxDateFromStoryControls );

		const [ prefix, setPrefix ] = useState( '' );
		const handleChange = ( newDate: Date | null ) => {
			const today = new Date();
			const yesterday = new Date();
			const tomorrow = new Date();

			tomorrow.setDate( today.getDate() + 1 );
			yesterday.setDate( today.getDate() - 1 );

			if ( newDate ) {
				if ( isSameDay( today, newDate ) ) {
					setPrefix( 'TODAY' );
					return;
				} else if ( isSameDay( tomorrow, newDate ) ) {
					setPrefix( 'TOMORROW' );
					return;
				} else if ( isSameDay( yesterday, newDate ) ) {
					setPrefix( 'YESTERDAY' );
					return;
				}
			}

			setPrefix( '' );
		};

		return <>
			<DatePicker { ...others }
				value={ value }
				minDate={ minDate }
				maxDate={ maxDate }
				onChange={ ( _ ) => handleChange( _ ) }
				startAdornment={ !!prefix && <div><small><strong>{ prefix }</strong></small></div> }
			/>
			<p>Try selecting yesterday/today/tomorrow as date.</p>
		</>
	}
};


const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]


export const Sizes: Story = {
	args: Default.args,
	render: ( { ...args } ) => {
		return <>
			{ SIZES.map( _ => {
					const fieldId = `input-size-${ _.size }`;
					return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
						<DatePicker { ...args } size={ _.size } id={ fieldId }/>
					</FormControl>
				}
			) }
		</>;
	}
}

export const InsideLabel: Story = {
	args: Default.args,
	render: ( args ) => {
		return <label>Choose a date <DatePicker { ...args } /></label>
	}
}

export const WithDefaultValue: Story = {
	args: { ...Default.args, defaultValue: '2023-10-31' },
	render: Default.render
}

const isValidYear = ( year: number | string ) => Number( year ) >= 1900 && Number( year ) < 3000 && isInteger( Number( year ) );
const getDaysInMonth = ( month: number, year: number | string = 1900 ) => new Date( isValidYear( year ) ? Number( year ) : 1900, month, 0 ).getDate();

function DateFieldsFirstSolution() {
	const [ day, setDay ] = useState( '1' );
	const [ month, setMonth ] = useState( 1 );
	const [ year, setYear ] = useState( '' );

	const daysInMonth = getDaysInMonth( month, year );

	const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		.map( ( label, index ) => ( { value: String( index + 1 ), label: label } ) );

	const isValidDate = !year || ( isValidYear( year ) && Number( day ) <= daysInMonth );

	return <VStack spacing={ 1 } sx={ { color: !isValidDate ? '#951300' : undefined } }>
		<HStack spacing={ 1 }>
			<VStack spacing={ .5 }>
				<label htmlFor='day'>Day</label>
				<Input
					id='day'
					sx={ { width: '80px !important' } }
					size='lg'
					value={ day }
					onChange={ e => setDay( e.target.value ) }
					error={ !isValidDate }
				/>
			</VStack>
			<VStack spacing={ .5 }>
				<label htmlFor='month'>Month</label>
				<Select
					id='month'
					options={ months }
					sx={ { width: 150 } }
					size='lg'
					value={ String( month ) }
					onChange={ ( _: string ) => setMonth( Number( _ ) ) }
					error={ !isValidDate }
				/>
			</VStack>
			<VStack spacing={ .5 }>
				<label htmlFor='year'>Year</label>
				<Input
					id='year'
					placeholder='AAAA'
					sx={ { width: '100px !important' } }
					size='lg'
					value={ year }
					onChange={ e => setYear( e.target.value ) }
					error={ !isValidDate }
				/>
			</VStack>
		</HStack>
		{ !isValidDate && <div style={ { fontSize: '.8em' } }>Invalid date</div> }
	</VStack>
}

function DateFieldsSecondSolution() {
	const [ day, setDay ] = useState( 1 );
	const [ month, setMonth ] = useState( 1 );
	const [ year, setYear ] = useState( 1990 );

	const daysInMonth = getDaysInMonth( month, year );

	const days = [ ...( new Array( daysInMonth ).keys() ) ]
		.map( ( index ) => ( { value: String( index + 1 ), label: ( index + 1 < 10 ? '0' : '' ) + ( index + 1 ) } ) );

	const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		.map( ( label, index ) => ( { value: String( index + 1 ), label: label } ) );

	const years = [ ...( new Array( 200 ).keys() ) ]
		.map( ( index ) => ( { value: String( index + 1900 ), label: String( index + 1900 ) } ) );

	React.useEffect( () => {
		if ( day > daysInMonth ) {
			setDay( daysInMonth );
		}
	}, [ day, month, year ] )

	return <HStack spacing={ 1 }>
		<VStack spacing={ .5 }>
			<label htmlFor='day'>Day</label>
			<Select
				id='day'
				options={ days }
				sx={ { width: 80 } }
				size='lg'
				value={ String( day ) }
				onChange={ ( _: string ) => setDay( Number( _ ) ) }
			/>
		</VStack>
		<VStack spacing={ .5 }>
			<label htmlFor='month'>Month</label>
			<Select
				id='month'
				options={ months }
				sx={ { width: 150 } }
				size='lg'
				value={ String( month ) }
				onChange={ ( _: string ) => setMonth( Number( _ ) ) }
			/>
		</VStack>
		<VStack spacing={ .5 }>
			<label htmlFor='year'>Year</label>
			<Select
				id='year'
				options={ years }
				sx={ { width: 100 } }
				size='lg'
				value={ String( year ) }
				onChange={ ( _: string ) => setYear( Number( _ ) ) }
			/>
		</VStack>
	</HStack>
}

export const Birthday: Story = {
	args: {},
	render: () => {
		return <>
			<Typography gutterBottom>The <strong>DatePicker</strong> should be used for dates that the user <strong>don't know</strong>.</Typography>
			<Typography gutterBottom>For dates that user <strong>exactly knows</strong> (e.g. birthday), it could be better using different fields as follows.</Typography>
			<Box sx={{margin: '36px 0'}}>
				<Typography variant='h3' gutterBottom>Solution 1</Typography>
				<DateFieldsFirstSolution/>
			</Box>
			<Box sx={{margin: '36px 0'}}>
				<Typography variant='h3' gutterBottom>Solution 2</Typography>
				<DateFieldsSecondSolution/>
			</Box>
		</>
	}
}
