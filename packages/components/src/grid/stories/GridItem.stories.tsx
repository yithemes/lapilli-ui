import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Grid from "..";
import GridItem from "../grid-item";
import Paper from "../../paper";

const meta: Meta<typeof GridItem> = {
	title: 'Components/Grid/GridItem',
	component: GridItem
};

export default meta;
type Story = StoryObj<typeof GridItem>

export const Default: Story = {
	args: {
		xs: 12,
	},
	render: ( args ) => <Grid columns={ 12 }>
		<GridItem { ...args }>
			<Paper sx={ { padding: '16px 24px' } } elevation={ 3 } variant="outlined">Item</Paper>
		</GridItem>
	</Grid>
}