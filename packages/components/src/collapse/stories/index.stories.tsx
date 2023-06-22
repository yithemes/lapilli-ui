import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PhotoIcon } from "@heroicons/react/24/outline";

import Collapse from "..";
import Switch from "../../switch/Switch"; // Imported from the specific file to prevent issues with typescript docgen storybook.
import Container from "../../container";
import Stack from "../../stack";
import Grid from "../../grid";
import GridItem from "../../grid/grid-item";

const meta: Meta<typeof Collapse> = {
	title: 'Components/Collapse',
	component: Collapse,
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Stack direction="column" spacing={ 2 } align="start">
				<Stack direction="row" spacing={ 1 } align="center">
					<Switch id="show" checked={ open } onChange={ ( _e, _ ) => setOpen( _ ) }/>
					<label htmlFor="show">Show</label>
				</Stack>

				<Stack direction="row" spacing={ 1 } align="center">
					<Collapse { ...args } open={ open } sx={ theme => ( {
						background: theme.palette.grey[ theme.mode === 'light' ? 50 : 900 ],
						borderRadius: theme.shape.borderRadius,
						color: theme.palette.grey[ theme.mode === 'light' ? 600 : 300 ]
					} ) }>
						<div style={ { padding: '32px' } }>
							<PhotoIcon style={ { width: 60, strokeWidth: 1 } }/>
						</div>
					</Collapse>
				</Stack>
			</Stack>
		</>
	}
};

const boxStyle = {
	boxShadow: '0 0 0 1px #94a3b888 inset',
	borderRadius: '8px'
};

const CollapsibleBox = ( { styled = false } ) => {
	return <Stack
		align="center"
		justify="center"
		sx={
			{
				...( styled && boxStyle ),
				width: 120,
				height: 120,
				color: '#94a3b888'
			}
		}>
		<PhotoIcon style={ { width: 60, strokeWidth: 1 } }/>
	</Stack>
}

export const CollapsedSize: Story = {
	render: () => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Stack direction="column" spacing={ 2 } align="start">
				<Stack direction="row" spacing={ 1 } align="center">
					<Switch id="show" checked={ open } onChange={ ( _e, _ ) => setOpen( _ ) }/>
					<label htmlFor="show">Show</label>
				</Stack>

				<Container maxWidth={ ( 120 * 3 + 16 * 2 ) } gutters={ 0 }>
					<Grid columns={ 3 } gap={ 2 } style={ { gridTemplateRows: 'repeat(6, 120px)' } }>
						<GridItem>
							<Collapse open={ open } orientation="horizontal">
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } orientation="horizontal" collapsedSize={ 20 }>
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } orientation="horizontal" collapsedSize={ 60 }>
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open }>
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } collapsedSize={ 20 }>
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } collapsedSize={ 60 }>
								<CollapsibleBox styled/>
							</Collapse>
						</GridItem>

						<GridItem>
							<Collapse open={ open } orientation="horizontal" sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } orientation="horizontal" collapsedSize={ 20 } sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } orientation="horizontal" collapsedSize={ 60 } sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } collapsedSize={ 20 } sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
						<GridItem>
							<Collapse open={ open } collapsedSize={ 60 } sx={ boxStyle }>
								<CollapsibleBox/>
							</Collapse>
						</GridItem>
					</Grid>
				</Container>
			</Stack>
		</>
	}
}