import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from "..";
import CardMedia from "../card-media";
import CardHeader from "../card-header";
import CardContent from "../card-content";
import CardActions from "../card-actions";
import { Default as CardContentDefault } from './CardContent.stories';
import { Default as CardHeaderDefault } from './CardHeader.stories';
import { Default as CardActionsDefault } from './CardActions.stories';

const meta: Meta<typeof CardMedia> = {
	title: 'Components/Card/CardMedia',
	component: CardMedia
};

export default meta;
type Story = StoryObj<typeof CardMedia>

export const Default: Story = {
	args: {
		src: "images/hillton-header.jpeg",
		sx: { height: 170 }
	},
	render: ( args ) => <Card sx={ { width: 345 } }>
		<CardMedia { ...args } />
		<CardHeader { ...CardHeaderDefault.args } />
		<CardContent { ...CardContentDefault.args } />
		<CardActions { ...CardActionsDefault.args } />
	</Card>
}