import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CalendarIcon, CheckIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";

import Button from '../';
import type { FieldSize } from "@maya-ui/styles";
import Stack from "../../stack";

const iconsSettings = {
	control: {
		type: 'select',
	},
	options: [ 'none', 'calendar', 'check', 'close', 'edit' ],
	mapping: {
		none: '',
		calendar: <CalendarIcon width="1em"/>,
		check: <CheckIcon width="1em"/>,
		close: <XMarkIcon width="1em"/>,
		edit: <PencilIcon width="1em"/>,
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

export const Sizes: Story = {
	args: Default.args,
	render: ( args ) => <>
		<Stack spacing={ 2 } direction="column" align="start">
			{ SIZES.map( _ => <Stack key={ _.size } direction="row" align="center" spacing={ 2 }>
				<div style={ { minWidth: 100 } }>{ _.label }</div>
				<Button { ...args } size={ _.size }>Button</Button>
			</Stack> ) }
		</Stack>
	</>
}