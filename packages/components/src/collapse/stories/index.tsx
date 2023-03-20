import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Collapse from "..";
import Switch from "../../switch/Switch"; // Imported from the specific file to prevent issues with typescript docgen storybook.
import Container from "../../container";
import Stack from "../../stack";
import FwIcon from "../../fw-icon";
import Grid from "../../grid";
import GridItem from "../../grid/grid-item";

const meta: ComponentMeta<typeof Collapse> = {
	title: 'Components/Collapse',
	component: Collapse,
};

export default meta;

const Template: ComponentStory<typeof Collapse> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Stack direction="column" spacing={ 2 } alignItems="flex-start">
			<Stack direction="row" spacing={ 1 } alignItems="center">
				<Switch id="show" checked={ open } onChange={ ( _e, _ ) => setOpen( _ ) }/>
				<label htmlFor="show">Show</label>
			</Stack>

			<Stack direction="row" spacing={ 1 } alignItems="center">
				<Collapse { ...args } open={ open } sx={ { background: '#f1f1f1', borderRadius: '8px' } }>
					<div style={ { padding: '32px' } }>
						<FwIcon icon='image' fontSize={ 60 }/>
					</div>
				</Collapse>
			</Stack>
		</Stack>
	</>
};

export const Default: ComponentStory<typeof Collapse> = Template.bind( {} );

const boxStyle = {
	boxShadow: '0 0 0 1px #94a3b888 inset',
	borderRadius: '8px'
};

const CollapsibleBox = ( { styled = false } ) => {
	return <Stack
		alignItems="center"
		justifyContent="center"
		sx={
			{
				...( styled && boxStyle ),
				width: 120,
				height: 120,
				color: '#94a3b888'
			}
		}>
		<FwIcon icon='image' fontSize={ 60 }/>
	</Stack>
}

const CollapsedSizeTemplate: ComponentStory<typeof Collapse> = () => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Stack direction="column" spacing={ 2 } alignItems="flex-start">
			<Stack direction="row" spacing={ 1 } alignItems="center">
				<Switch id="show" checked={ open } onChange={ ( _e, _ ) => setOpen( _ ) }/>
				<label htmlFor="show">Show</label>
			</Stack>

			<Container maxWidth={ ( 120 * 3 + 16 * 2 ) }>
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
};

export const CollapsedSize: ComponentStory<typeof Collapse> = CollapsedSizeTemplate.bind( {} );