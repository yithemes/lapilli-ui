import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Grid from "..";
import GridItem from "../grid-item";

const meta: Meta<typeof Grid> = {
	title: 'Components/Grid',
	component: Grid
};

export default meta;
type Story = StoryObj<typeof Grid>

const Item = ( { color, children }: { color?: React.CSSProperties['color'], children: React.ReactNode } ) => {
	let textColor = 'rgba(0,0,0,0.6)';
	if ( typeof color === 'undefined' ) {
		color = '#cbd5e1';
		textColor = '#323b43';
	}

	return <div style={ {
		border: `1px solid ${ color }`,
		background: `${ color }33`,
		borderRadius: '4px',
		color: textColor,
		fontWeight: 500,
		padding: '8px',
		display: 'flex',
		height: '100%',
		alignItems: "center",
		justifyContent: 'center',
		boxSizing: "border-box"
	} }>
		{ children }
	</div>
}

export const Default: Story = {
	args: {
		columns: 3,
		gap: 1
	},
	render: ( args ) => <Grid { ...args }>
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
	</Grid>
}

export const Responsive: Story = {
	args: {
		columns: 12,
		gap: 1
	},
	render: ( args ) => <Grid { ...args } columns={ 12 }>
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
	</Grid>
}

export const Complex: Story = {
	args: {
		columns: 4,
		rows: 8,
		gap: 1
	},
	render: ( args ) => <Grid { ...args } columns={ 3 } rows={ 8 } sx={ { maxWidth: 800 } }>
		<GridItem rowSpan={ 2 } colSpan={ 2 } colStart={ 1 } rowStart={ 1 }>
			<Item color="#86bedf">One</Item>
		</GridItem>
		<GridItem rowSpan={ 1 } colSpan={ 1 } colStart={ 3 } rowStart={ 1 }>
			<Item color="#86dfbc">Two</Item>
		</GridItem>
		<GridItem rowSpan={ 1 } colSpan={ 1 } colStart={ 3 } rowStart={ 2 }>
			<Item color="#86dfdf">Three</Item>
		</GridItem>
		<GridItem rowSpan={ 1 } colSpan={ 1 } colStart={ 2 } rowStart={ 3 }>
			<Item color="#86df8a">Four</Item>
		</GridItem>
		<GridItem rowSpan={ 2 } colSpan={ 1 } colStart={ 3 } rowStart={ 3 }>
			<Item color="#a086df">Five</Item>
		</GridItem>
		<GridItem rowSpan={ 4 } colSpan={ 1 } colStart={ 1 } rowStart={ 3 }>
			<Item color="#dfd386">Six</Item>
		</GridItem>
		<GridItem rowSpan={ 2 } colSpan={ 2 } colStart={ 2 } rowStart={ 5 }>
			<Item color="#dfae86">Seven</Item>
		</GridItem>
		<GridItem rowSpan={ 1 } colSpan={ 2 } colStart={ 1 } rowStart={ 7 }>
			<Item color="#df8686">Eight</Item>
		</GridItem>
		<GridItem rowSpan={ 1 } colSpan={ 3 } colStart={ 1 } rowStart={ 8 }>
			<Item color="#df86cb">Nine</Item>
		</GridItem>
	</Grid>
}