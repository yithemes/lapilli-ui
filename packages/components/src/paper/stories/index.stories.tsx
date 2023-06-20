import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Paper from "..";
import Stack from "../../stack";

const meta: Meta<typeof Paper> = {
	title: 'Components/Paper',
	component: Paper,
};

export default meta;
type Story = StoryObj<typeof Paper>

export const Default: Story = {
	args: {
		variant: 'elevation',
		squared: false,
		borderColor: 'border.primary'
	},
	render: ( args ) => <Paper { ...args } sx={ { padding: '16px 24px', display: 'inline-flex' } }>
		Hi! I'm a Paper.
	</Paper>
}

export const Elevation: Story = {
	args: Default.args,
	render: ( args ) => <Stack
		direction='row'
		spacing={ 3 }
		wrap
		sx={ ( theme ) => ( {
			background: theme.palette.grey[ theme.mode === 'light' ? 50 : 900 ],
			padding: theme.spacing( 3 ),
			borderRadius: theme.shape.borderRadius,
			'& > :not(style)': {
				width: 128,
				height: 128,
			},
		} ) }
	>
		<Paper { ...args } elevation={ 0 }/>
		<Paper { ...args } elevation={ 1 }/>
		<Paper { ...args } elevation={ 4 }/>
	</Stack>
}