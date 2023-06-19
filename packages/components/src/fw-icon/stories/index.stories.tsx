import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import FwIcon from '../';
import Typography from "../../typography";

const meta: Meta<typeof FwIcon> = {
	title: 'Components/FwIcon',
	component: FwIcon,
	argTypes: {
		fontSize: {
			table: {
				type: { summary: '"sm"|"md"|"lg"|"xl"|FontSize' },
			},
			control: {
				type: 'text',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FwIcon>

export const Default: Story = {
	args: {
		icon: 'calendar',
	},
	render: ( args ) => <FwIcon { ...args } />
};

const SIZES = [
	{ size: 'sm', label: 'Small', description: '16px' },
	{ size: 'md', label: 'Medium', description: '24px' },
	{ size: 'lg', label: 'Large', description: '32px' },
	{ size: 'xl', label: 'Extra large', description: '40px' },
]

export const Sizes: Story = {
	args: {
		icon: 'calendar',
	},
	render: ( { ...args } ) => <>
		{ SIZES.map( _ => (
				<div key={ _.size } style={ { textAlign: "center", padding: "10px 15px", display: 'inline-block' } }>
					<FwIcon { ...args } fontSize={ _.size }/>
					<Typography align='center'>{ _.label }</Typography>
					<Typography variant='body2' align='center'>{ _.description }</Typography>
				</div>
			)
		) }
	</>
};