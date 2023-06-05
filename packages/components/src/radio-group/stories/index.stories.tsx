import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import RadioGroup from '../';

const createResponsiveRadioControl = ( ...options: string[] ) => {
	return {
		table: { type: { summary: 'ResponsiveStyleValue<' + options.join( ' | ' ) + '>' }, },
		control: { type: 'radio' },
		options: options,
	}
}

const OPTIONS = [
	{ value: 'public', label: 'Public', description: 'Visible to everyone.' },
	{ value: 'private', label: 'Private', description: 'Only visible to site admins and editors.' },
	{ value: 'password-protected', label: 'Password protected', description: 'Protected with a password.' },
];

const meta: ComponentMeta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	argTypes: {
		value: {
			control: false
		},
		name: {
			table: { disable: true }
		},
		direction: createResponsiveRadioControl( 'row', 'column' ),
		align: createResponsiveRadioControl( 'start', 'end', 'center', 'baseline', 'stretch' ),
		justify: createResponsiveRadioControl( 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly' ),
		wrap: { control: { type: 'boolean' }, }
	}
};

export default meta;

const Template: ComponentStory<typeof RadioGroup> = ( args ) => {
	return <RadioGroup { ...args } name='visibility'/>;
};
export const Default: ComponentStory<typeof RadioGroup> = Template.bind( {} );

Default.args = {
	color: 'primary',
	options: OPTIONS.map( _ => ( { value: _.value, label: _.label } ) )
}

export const WithDescriptions: ComponentStory<typeof RadioGroup> = Template.bind( {} );

WithDescriptions.args = {
	color: 'primary',
	options: OPTIONS
}
