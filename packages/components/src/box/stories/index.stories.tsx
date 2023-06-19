import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Box from '../';

const meta: Meta<typeof Box> = {
	title: 'Components/Box',
	component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
	args: {
		sx: {
			background: '#2490e5',
			padding: '16px',
			borderRadius: '16px',
			width: 100,
			height: 100,
			transition: 'all .2s ease-in-out',
			':hover': {
				background: '#4bb0ff',
				transform: 'scale(1.05)'
			}
		}
	},
	render: ( args ) => <Box { ...args }/>
}