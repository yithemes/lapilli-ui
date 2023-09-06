import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Slider from '..';
import Box from "../../box";
import type { FieldSize } from "@lapilli-ui/styles";
import FormControl from "../../form-control";

const meta: Meta<typeof Slider> = {
	title: 'Components/Slider',
	component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
	args: {
		size: 'md',
		color: 'primary',
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		marks: false,
	},
	render: ( args ) => <Box sx={ { paddingTop: 40 } }>
		<Slider { ...args } />
	</Box>
};

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

export const Sizes: Story = {
	args: Default.args,
	render: args => <>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<Slider { ...args } size={ _.size } id={ fieldId }/>
				</FormControl>
			}
		) }
	</>
}

export const Marks: Story = {
	args: {
		...Default.args,
		marks: [
			{ value: 0, label: '0°C' },
			{ value: 20, label: '20°C' },
			{ value: 40, label: '40°C' },
			{ value: 60, label: '60°C' },
			{ value: 80, label: '80°C' },
			{ value: 100, label: '100°C' }
		]
	},
	render: ( args ) => <Box sx={ { paddingTop: 40 } }>
		<Slider { ...args } />
	</Box>
};