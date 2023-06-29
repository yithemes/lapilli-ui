import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { FieldSize } from "@yith/styles";

import Spinner from '../';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	args: {
		color: 'default',
		thickness: 3.6,
		size: 'md'
	},
	render: ( args ) => <Spinner { ...args } />
}

const SIZES: { size: FieldSize, label: string, description: string }[] = [
	{ size: 'sm', label: 'Small', description: '16px' },
	{ size: 'md', label: 'Medium', description: '24px' },
	{ size: 'lg', label: 'Large', description: '32px' },
	{ size: 'xl', label: 'Extra large', description: '40px' },
]

export const Sizes: Story = {
	args: Default.args,
	render: ( args ) => <>
		{ SIZES.map( _ => (
				<div key={ _.size } style={ { textAlign: "center", padding: "10px 15px", display: 'inline-block' } }>
					<Spinner { ...args } size={ _.size }/>
					<div style={ { margin: '8px 0 0' } }>{ _.label }</div>
					<div>{ _.description }</div>
				</div>
			)
		) }
	</>
};