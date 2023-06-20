import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from "..";
import CardContent from "../card-content";
import CardHeader from "../card-header";
import CardActions from "../card-actions";
import CardMedia from "../card-media";
import Typography from "../../typography";

import { Default as CardHeaderDefault } from './CardHeader.stories';
import { Default as CardActionsDefault } from './CardActions.stories';
import { Default as CardMediaDefault } from './CardMedia.stories';

const meta: Meta<typeof CardContent> = {
	title: 'Components/Card/CardContent',
	component: CardContent
};

export default meta;
type Story = StoryObj<typeof CardContent>

export const Default: Story = {
	args: {
		children: <Typography variant="body2" color="text.secondary" align="center">
			Book a beautiful room in one Hillton's hotel!
		</Typography>
	},
	render: ( args ) => <Card sx={ { width: 345 } }>
		<CardMedia { ...CardMediaDefault.args } />
		<CardHeader { ...CardHeaderDefault.args } />
		<CardContent { ...args } />
		<CardActions { ...CardActionsDefault.args } />
	</Card>
}