import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from "..";
import CardMedia from "../card-media";
import CardHeader from "../card-header";
import CardContent from "../card-content";
import CardActions from "../card-actions";
import { Default as CardContentDefault } from './CardContent.stories';
import { Default as CardHeaderDefault } from './CardHeader.stories';
import { Default as CardMediaDefault } from './CardMedia.stories';
import Button from "../../button";
import Checkbox from "../../checkbox";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const meta: Meta<typeof CardActions> = {
	title: 'Components/Card/CardActions',
	component: CardActions
};

export default meta;
type Story = StoryObj<typeof CardActions>

export const Default: Story = {
	args: {
		children: <>
			<Button fullWidth variant='text'>Book now</Button>
			<Checkbox
				icon={ <HeartIcon width='1em' /> }
				checkedIcon={ <HeartIconSolid width='1em'/> }
				sx={ { color: '#e91e63' } }
			/>
		</>
	},
	render: ( args ) => <Card sx={ { width: 345 } }>
		<CardMedia { ...CardMediaDefault.args } />
		<CardHeader { ...CardHeaderDefault.args } />
		<CardContent { ...CardContentDefault.args } />
		<CardActions { ...args } />
	</Card>
}