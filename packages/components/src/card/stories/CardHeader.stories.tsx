import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from "..";
import CardMedia from "../card-media";
import CardHeader from "../card-header";
import CardContent from "../card-content";
import CardActions from "../card-actions";
import { Default as CardContentDefault } from './CardContent.stories';
import { Default as CardActionsDefault } from './CardActions.stories';
import { Default as CardMediaDefault } from './CardMedia.stories';
import Typography from "../../typography";
import Stack from "../../stack";

const meta: Meta<typeof CardHeader> = {
	title: 'Components/Card/CardHeader',
	component: CardHeader
};

export default meta;
type Story = StoryObj<typeof CardHeader>

export const Default: Story = {
	args: {
		title: "Hillton room",
		endAdornment: <Stack align='center' direction='row'>
			<Typography sx={ { fontSize: '20px', fontWeight: 500 } }>150 $</Typography>
			<Typography sx={ { fontSize: '12px', marginLeft: '8px' } }>/ day</Typography>
		</Stack>
	},
	render: ( args ) => <Card sx={ { width: 345 } }>
		<CardMedia { ...CardMediaDefault.args } />
		<CardHeader { ...args } />
		<CardContent { ...CardContentDefault.args } />
		<CardActions { ...CardActionsDefault.args } />
	</Card>
}