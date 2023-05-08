import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import FwIcon from '../';
import Container from "../../container";

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

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5
}

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
	render: ( { ...args } ) => <Container style={ CONTAINER_STYLE }>
		{ SIZES.map( _ => (
				<div key={ _.size } style={ { textAlign: "center", padding: "10px 15px", display: 'inline-block' } }>
					<FwIcon { ...args } fontSize={ _.size }/>
					<div style={ { margin: '8px 0 0' } }>{ _.label }</div>
					<div>{ _.description }</div>
				</div>
			)
		) }
	</Container>
};