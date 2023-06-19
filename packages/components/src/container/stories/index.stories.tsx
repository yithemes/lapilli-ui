import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Container from '../';
import Box from '../../box';
import Stack from "../../stack";
import Typography from "../../typography";

const meta: Meta<typeof Container> = {
	title: 'Components/Container',
	component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
	args: {
		align: 'left',
		maxWidth: 'md',
		gutters: 2,
		sx: { background: '#a6dc9a' }
	},
	render: ( args ) => <>
		<Container { ...args }>
			<Box sx={ { background: '#e4e7ff', height: '400px' } }/>
		</Container>

		<Stack spacing={ 2 } direction='column' align='start' sx={ { padding: '32px 0' } }>
			<Stack spacing={ 1 } direction='row' align='center'>
				<Box sx={ { background: '#a6dc9a', borderRadius: '2px', width: '20px', height: '20px' } }/>
				<Typography>Container</Typography>
			</Stack>
			<Stack spacing={ 1 } direction='row' align='center'>
				<Box sx={ { background: '#e4e7ff', borderRadius: '2px', width: '20px', height: '20px' } }/>
				<Typography>Content</Typography>
			</Stack>

		</Stack>
	</>
}