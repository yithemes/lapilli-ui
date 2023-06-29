import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Stack from "..";
import Paper from "../../paper";

const createResponsiveRadioControl = ( ...options: string[] ) => {
	return {
		table: { type: { summary: 'ResponsiveStyleValue<' + options.join( ' | ' ) + '>' }, },
		control: { type: 'radio' },
		options: options,
	}
}

const meta: Meta<typeof Stack> = {
	title: 'Components/Stack',
	component: Stack,
	argTypes: {
		direction: createResponsiveRadioControl( 'row', 'column' ),
		align: createResponsiveRadioControl( 'start', 'end', 'center', 'baseline', 'stretch' ),
		justify: createResponsiveRadioControl( 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly' ),
		wrap: { control: { type: 'boolean' }, }
	}
};

export default meta;

type Story = StoryObj<typeof Stack>

const Item = ( { children }: { children: React.ReactNode } ) => {
	return <Paper sx={ { padding: '16px 24px' } } elevation={ 3 } variant="outlined">{ children }</Paper>
}

export const Default: Story = {
	args: {
		spacing: 2
	},
	render: ( args ) => <Stack { ...args }>
		<Item>One</Item>
		<Item>Two</Item>
		<Item>Three</Item>
	</Stack>
}