import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '../';

const meta: Meta<typeof Skeleton> = {
	title: 'Components/Skeleton',
	component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
	args: {
		variant: 'text',
		animation: 'pulse'
	},
	render: ( args ) => <Skeleton { ...args } />
};