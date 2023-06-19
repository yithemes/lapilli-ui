import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from '../';
import type { FieldSize } from "@yith/styles";
import FormControl from "../../form-control";
import Stack from "../../stack";
import Typography from "../../typography";
import type { SelectOptionParams } from "../types";

const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
};

const HEROES = [
	'Tony Stark',
	'Peter Parker',
	'Stephen Strange',
	'Bruce Banner',
	'Thor',
	'Nick Fury',
	'Natasha Romanoff',
	'Clint Barton',
];

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
	args: {
		options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
		placeholder: 'Choose a hero',
		size: 'md',
		variant: 'outlined',
		fullWidth: false,
		sx: { minWidth: 200 }
	},
	render: ( args ) => {
		return <Select { ...args } />;
	}
}

export const Multiple: Story = {
	args: {
		...Default.args,
		options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
		multiple: true,
		placeholder: 'Choose your heroes',
		fullWidth: true,
		allowSearch: true,
		size: 'md'
	},
	render: Default.render
}

export const MultipleWithTags: Story = {
	args: {
		...Multiple.args,
		showTags: true,
		limitTags: 3,
		hideSelectedOptions: true,
	},
	render: Default.render
}

export const WithDisabledOptions: Story = {
	args: {
		...Default.args,
		options: HEROES.sort().map( _ => ( { value: _, label: _, disabled: _.search( 'e' ) > -1 } ) ),
	},
	render: Default.render
}

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
						<Select { ...args } size={ _.size } id={ fieldId }/>
					</FormControl>
				}
			) }
		</>;
	}
}

const people = [
	{ value: 'john', label: 'John', role: 'CEO at Google', image: 'images/avatar/john.jpeg', className: 'john' },
	{ value: 'hannah', label: 'Hannah', role: 'Product Manager at Newfold Digital', image: 'images/avatar/hannah.jpeg' },
	{ value: 'kate', label: 'Kate', role: 'Developer at Microsoft', image: 'images/avatar/kate.jpeg' },
	{ value: 'mark', label: 'Mark', role: 'Product Manager at Apple', image: 'images/avatar/mark.jpeg' },
	{ value: 'sarah', label: 'Sarah', role: 'Manager at YITH', image: 'images/avatar/sarah.jpeg' },
	{ value: 'tim', label: 'Tim', role: 'Manager at Vodafone', image: 'images/avatar/tim.jpeg' },
]


function CustomOption( { option }: { option: SelectOptionParams } ) {
	// @ts-ignore
	const { label, image, role } = option;
	return <Stack direction="row" align="center" spacing={ 2 }>
		<img src={ image } style={ { width: '35px', borderRadius: '4px' } }/>
		<Stack direction="column">
			<Typography sx={ { color: 'inherit' } }>{ label }</Typography>
			<Typography variant="body2" sx={ { color: 'inherit', opacity: .5 } }>{ role }</Typography>
		</Stack>
	</Stack>
}

function renderCustomOption( option: SelectOptionParams ) {
	return <CustomOption option={ option }/>
}

function renderCustomToggleContent( { selectedOptions }: { selectedOptions: SelectOptionParams[] } ) {
	return !!selectedOptions.length ? selectedOptions.map( option => <CustomOption option={ option } key={ option.value }/> ) : <div style={ { opacity: .5 } }>Select one person</div>;
}

export const CustomContents: Story = {
	args: {
		...Default.args,
		options: people,
		defaultValue: people[ 2 ].value
	},
	render: ( { ...args } ) => {
		return <Select { ...args } renderOptionContent={ renderCustomOption } renderToggleContent={ renderCustomToggleContent } multiple={ false }/>
	}
}

export const InsideLabel: Story = {
	args: Default.args,
	render: ( args ) => {
		return <label>Choose an hero: <Select { ...args } /></label>;
	}
}