import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import DatePicker from '../';
import type { FieldSize } from "@yith/styles";
import Container from "../../container";
import FormControl from "../../form-control";

const meta: ComponentMeta<typeof DatePicker> = {
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

const getDateFromStoryControl = ( date?: string | number | Date | null ) => {
	return typeof date === 'number' ? new Date( date ) : date;
}

const Template: ComponentStory<typeof DatePicker> = ( args ) => {
	const { value: valueFromStoryControls, minDate: minDateFromStoryControls, maxDate: maxDateFromStoryControls, ...others } = args;
	// In story controls, the date is returned as a UNIX timestamp.
	const value = getDateFromStoryControl( valueFromStoryControls );
	const minDate = getDateFromStoryControl( minDateFromStoryControls );
	const maxDate = getDateFromStoryControl( maxDateFromStoryControls );

	return <DatePicker { ...others } value={ value } minDate={ minDate } maxDate={ maxDate }/>
};

export const Default: ComponentStory<typeof DatePicker> = Template.bind( {} );
Default.args = {
	placeholder: 'Select a date',
	size: 'md'
};

export const Static: ComponentStory<typeof DatePicker> = Template.bind( {} );
Static.args = {
	isStatic: true
};

export const DisabledDates: ComponentStory<typeof DatePicker> = Template.bind( {} );
DisabledDates.args = {
	placeholder: 'Select a date',
	size: 'md',
	isStatic: true,
	shouldDisableDate: ( date ) => date.getDate() === 15,
	minDate: "2022-01-01",
	maxDate: "2022-05-31",
};

const isSameDay = ( a: Date, b: Date ) => {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const WithStartAdornmentTemplate: ComponentStory<typeof DatePicker> = ( args ) => {
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
};

export const WithStartAdornment: ComponentStory<typeof DatePicker> = WithStartAdornmentTemplate.bind( {} );
WithStartAdornment.args = {
	placeholder: 'Select a date',
	size: 'md'
};


const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5
}

const SizesTemplate: ComponentStory<typeof DatePicker> = ( { ...args } ) => {
	return <Container style={ CONTAINER_STYLE }>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<DatePicker { ...args } size={ _.size } id={ fieldId }/>
				</FormControl>
			}
		) }
	</Container>;
};

export const Sizes: ComponentStory<typeof DatePicker> = SizesTemplate.bind( {} );
Sizes.args = {
	placeholder: 'Select a date',
	size: 'md'
};