import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Switch from '../Switch';
import type { FieldSize } from "@lapilli-ui/styles";
import FormControl from "../../form-control";

const meta: Meta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	argTypes: {
		checked: {
			control: false
		},
	}
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	args: {
		type: 'checkbox',
		size: 'md'
	},
	render: ( args ) => <Switch { ...args } />
};

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

export const Sizes: Story = {
	args: Default.args,
	render: ( args ) => <>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<Switch { ...args } size={ _.size } id={ fieldId }/>
				</FormControl>
			}
		) }
	</>
};

export const InsideLabel: Story = {
	args: Default.args,
	render: ( args ) => <label><Switch { ...args } /> Is enabled?</label>
};

export const Controlled: Story = {
	args: Default.args,
	render: ( args ) => {
		const [ checked, setChecked ] = React.useState( false );
		return <Switch { ...args } checked={ checked } onChange={ ( _, value ) => setChecked( value ) }/>;
	}
};