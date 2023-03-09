import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Grid from "..";
import GridItem from "../grid-item";

const meta: ComponentMeta<typeof Grid> = {
	title: 'Components/Grid',
	component: Grid,
};

export default meta;

const Item = ( { children }: { children: React.ReactNode } ) => {
	return <div style={ {
		background: '#f1f1f1',
		borderRadius: '4px',
		padding: '8px',
		textAlign: 'center'
	} }>
		{ children }
	</div>
}

const Template: ComponentStory<typeof Grid> = ( args ) => {
	return <Grid { ...args }>
		<GridItem>
			<Item>One</Item>
		</GridItem>
		<GridItem>
			<Item>Two</Item>
		</GridItem>
		<GridItem>
			<Item>Three</Item>
		</GridItem>
		<GridItem>
			<Item>Four</Item>
		</GridItem>
		<GridItem>
			<Item>Five</Item>
		</GridItem>
		<GridItem>
			<Item>Six</Item>
		</GridItem>
	</Grid>;
};

export const Default: ComponentStory<typeof Grid> = Template.bind(
	{}
);

Default.args = {
	columns: 3,
	gap: 1
}

const ResponsiveTemplate: ComponentStory<typeof Grid> = () => {
	return <Grid columns={ 12 } gap={ 1 }>
		<GridItem xs={ 12 } sm={ 4 } lg={ 6 }>
			<Item>xs=12 sm=4 lg=6</Item>
		</GridItem>
		<GridItem xs={ 12 } sm={ 8 } lg={ 6 }>
			<Item>xs=12 sm=8 lg=6</Item>
		</GridItem>
		<GridItem xs={ 12 } sm={ 4 } lg={ 6 }>
			<Item>xs=12 sm=4 lg=6</Item>
		</GridItem>
		<GridItem xs={ 12 } sm={ 8 } lg={ 6 }>
			<Item>xs=12 sm=8 lg=6</Item>
		</GridItem>
	</Grid>;
};

export const Responsive: ComponentStory<typeof Grid> = ResponsiveTemplate.bind(
	{}
);