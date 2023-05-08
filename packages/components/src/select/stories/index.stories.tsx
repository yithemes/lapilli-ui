import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Select from '../';
import type { FieldSize } from "@yith/styles";
import Container from "../../container";
import FormControl from "../../form-control";

const meta: ComponentMeta<typeof Select> = {
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

const Template: ComponentStory<typeof Select> = ( args ) => {
	return <Select { ...args }>Button</Select>;
};

export const Default: ComponentStory<typeof Select> = Template.bind( {} );
Default.args = {
	options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
	placeholder: 'Choose a hero',
	size: 'md'
};

export const Multiple: ComponentStory<typeof Select> = Template.bind( {} );
Multiple.args = {
	options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
	multiple: true,
	placeholder: 'Choose your heroes',
	width: '100%',
	allowSearch: true,
	size: 'md'
};

export const MultipleWithTags: ComponentStory<typeof Select> = Template.bind( {} );
MultipleWithTags.args = {
	options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
	multiple: true,
	placeholder: 'Choose your heroes',
	width: '100%',
	showTags: true,
	limitTags: 3,
	allowSearch: true,
	hideSelectedOptions: true,
	size: 'md'
};

export const WithDisabledOptions: ComponentStory<typeof Select> = Template.bind( {} );
WithDisabledOptions.args = {
	options: HEROES.sort().map( _ => ( { value: _, label: _, disabled: _.search('e') > -1  } ) ),
	placeholder: 'Choose a hero',
	size: 'md'
};

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

const CONTAINER_STYLE = {
	fontSize  : '14px',
	lineHeight: 1.5
}

const SizesTemplate: ComponentStory<typeof Select> = ( { ...args } ) => {
	return <Container style={CONTAINER_STYLE}>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${_.size}`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={fieldId}>
					<Select { ...args } size={ _.size } id={fieldId}/>
				</FormControl>
			}
		) }
	</Container>;
};

export const Sizes: ComponentStory<typeof Select> = SizesTemplate.bind( {} );
Sizes.args = {
	options: HEROES.sort().map( _ => ( { value: _, label: _ } ) ),
	placeholder: 'Choose a hero',
	size: 'md'
};