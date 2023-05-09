import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Grid from "..";
import GridItem from "../grid-item";
import Paper from "../../paper";

const meta: Meta<typeof Grid> = {
	title: 'Components/Grid',
	component: Grid
};

export default meta;
type Story = StoryObj<typeof Grid>

const Item = ( { color, children }: { color?: React.CSSProperties['color'], children: React.ReactNode } ) => {
	const isColored = typeof color !== 'undefined';

	return <Paper
		sx={ {
			padding: '16px 24px',
			height: '100%',
			display: 'flex',
			alignItems: "center",
			justifyContent: 'center',
			boxSizing: 'border-box',
			...( isColored && {
				borderColor: color,
				background: `${ color }11`,
				boxShadow: `1px 2px 3px 0 ${ color }33`
			} )
		} }
		elevation={ isColored ? 0 : 3 }
		variant="outlined"
	>{ children }</Paper>
}

export const Default: Story = {
	args: {
		columns: 3,
		gap: 1
	},
	render: ( args ) => <Grid { ...args }>
		{ [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six' ].map( ( item ) => <GridItem key={ item }><Item>{ item }</Item></GridItem> ) }
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