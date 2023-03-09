import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Switch from '../';
import type { FieldSize } from "@yith/styles";
import Container from "../../container";
import FormControl from "../../form-control";

const meta: ComponentMeta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	argTypes: {
		checked: {
			control: false
		},
	}
};

export default meta;

const Template: ComponentStory<typeof Switch> = ( args ) => {
	return <Switch { ...args } />;
};

const LabelledTemplate: ComponentStory<typeof Switch> = ( args ) => {
	return <label><Switch { ...args } /> Is enabled?</label>;
};

export const Default: ComponentStory<typeof Switch> = Template.bind( {} );

Default.args = {
	type: 'checkbox',
	size: 'md'
}

export const WithLabel: ComponentStory<typeof Switch> = LabelledTemplate.bind( {} );

WithLabel.args = {
	type: 'checkbox',
	size: 'md'
}

const ControlledTemplate: ComponentStory<typeof Switch> = ( args ) => {
	const [ checked, setChecked ] = React.useState( false );
	return <Switch { ...args } checked={ checked } onChange={ ( _, value ) => setChecked( value ) }/>;
};

export const Controlled: ComponentStory<typeof Switch> = ControlledTemplate.bind( {} );

Controlled.args = {
	type: 'checkbox',
	size: 'md'
}

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

const SizesTemplate: ComponentStory<typeof Switch> = ( { ...args } ) => {
	return <Container style={CONTAINER_STYLE}>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${_.size}`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={fieldId}>
					<Switch { ...args } size={ _.size } id={fieldId}/>
				</FormControl>
			}
		) }
	</Container>;
};

export const Sizes: ComponentStory<typeof Switch> = SizesTemplate.bind( {} );
Sizes.args = {
	type: 'checkbox',
	size: 'md'
}