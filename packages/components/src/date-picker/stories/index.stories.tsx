import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '../';
import type { FieldSize } from "@yith/styles";
import Container from "../../container";
import FormControl from "../../form-control";

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

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5
}

export const Sizes: Story = {
	args: Default.args,
	render: ( { ...args } ) => {
		return <Container style={ CONTAINER_STYLE }>
			{ SIZES.map( _ => {
					const fieldId = `input-size-${ _.size }`;
					return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
						<DatePicker { ...args } size={ _.size } id={ fieldId }/>
					</FormControl>
				}
			) }
		</Container>;
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
