import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../';
import type { FieldSize } from "@yith/styles";
import Stack from "../../stack";
import Container from "../../container";

function CalendarIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
		</svg>
	);
}

function XMarkIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	);
}

function PencilIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
		</svg>
	);
}


const iconsSettings = {
	control: {
		type: 'select',
	},
	options: [ 'none', 'calendar', 'check', 'close', 'edit' ],
	mapping: {
		none: '',
		calendar: <CalendarIcon/>,
		check: <CheckIcon/>,
		close: <XMarkIcon/>,
		edit: <PencilIcon/>,
	}
}

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		startIcon: iconsSettings,
		endIcon: iconsSettings,
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		variant: 'contained',
		size: 'md',
		color: 'primary'
	},
	render: ( args ) => <Button { ...args }>Button</Button>
}

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5
}

export const Sizes: Story = {
	args: Default.args,
	render: ( args ) => <Container style={ CONTAINER_STYLE }>
		<Stack spacing={ 2 } direction="column" align="start">
			{ SIZES.map( _ => <Stack key={ _.size } direction="row" align="center" spacing={ 2 }>
				<div style={ { minWidth: 100 } }>{ _.label }</div>
				<Button { ...args } size={ _.size }>Button</Button>
			</Stack> ) }
		</Stack>
	</Container>
}