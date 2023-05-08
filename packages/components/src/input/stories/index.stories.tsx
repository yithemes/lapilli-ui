import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '../';
import FwIcon from "../../fw-icon";
import FormControl from "../../form-control";
import type { FieldSize } from "@yith/styles";
import Container from "../../container";

const meta: ComponentMeta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	argTypes: {
		value: {
			control: false
		},
		type: {
			control: {
				type: 'select',
				options: [ 'text', 'number', 'password' ],
				mapping: {
					text: 'text',
					number: 'number',
					password: 'password',
				}
			},
			table: {
				type: { summary: 'HTMLInputTypeAttribute' },
				defaultValue: { summary: 'text' }
			},
			description: 'Type of the input element to render.',
		},
		placeholder: {
			control: {
				type: 'text',
			},
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' }
			},
			description: 'The placeholder of the input field.',
		},
		startAdornment: {
			control: {
				type: 'select',
			},
			options: [ 'none', 'calendar', 'edit' ],
			mapping: {
				none: '',
				calendar: <FwIcon icon='calendar'/>,
				edit: <FwIcon icon='edit'/>,
			}
		},
		endAdornment: {
			control: {
				type: 'select',
			},
			options: [ 'none', 'check', 'close', 'dollar', 'percentage' ],
			mapping: {
				none: '',
				check: <FwIcon icon='check'/>,
				close: <FwIcon icon='close'/>,
				dollar: '$',
				percentage: '%',
			}
		},
	},
};

export default meta;

const Template: ComponentStory<typeof Input> = ( args ) => {
	return <Input { ...args } />;
};

export const Default: ComponentStory<typeof Input> = Template.bind( {} );

Default.args = {
	// @ts-ignore
	type: 'text',
	variant: 'outlined',
	placeholder: 'Set a name',
	isMini: false,
	fullWidth: false,
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

const SizesTemplate: ComponentStory<typeof Input> = ( { ...args } ) => {
	return <Container style={CONTAINER_STYLE}>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${_.size}`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={fieldId}>
					<Input { ...args } size={ _.size } id={fieldId}/>
				</FormControl>
			}
		) }
	</Container>;
};

export const Sizes: ComponentStory<typeof Input> = SizesTemplate.bind( {} );
Sizes.args = {
	// @ts-ignore
	type: 'text',
	variant: 'outlined',
	placeholder: 'Set a name',
	isMini: false,
	fullWidth: false,
	size: 'md'
}