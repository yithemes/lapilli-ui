import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Paper from "..";
import Box from "../../box";

const meta: ComponentMeta<typeof Paper> = {
	title: 'Components/Paper',
	component: Paper,
};

export default meta;

const Template: ComponentStory<typeof Paper> = ( args ) => {
	return <Paper { ...args } sx={ { padding: '16px 24px', display: 'inline-flex' } }>
		Hi! I'm a Paper.
	</Paper>;
};

export const Default: ComponentStory<typeof Paper> = Template.bind( {} );

const ElevationTemplate: ComponentStory<typeof Paper> = () => {
	return <Box sx={ {
		display: 'flex',
		flexWrap: 'wrap',
		background: '#f1f1f1',
		padding: '16px',
		// @ts-ignore
		'& > :not(style)': {
			margin: 8,
			width: 128,
			height: 128,
		},
	} }>
		<Paper elevation={ 0 }/>
		<Paper/>
		<Paper elevation={ 4 }/>
	</Box>;
};

export const Elevation: ComponentStory<typeof Paper> = ElevationTemplate.bind( {} );