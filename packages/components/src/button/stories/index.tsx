import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../';
import FwIcon from "../../fw-icon";
import type { FieldSize } from "@yith/styles";
import Stack from "../../stack";
import Container from "../../container";

const iconsSettings = {
	control: {
		type: 'select',
	},
	options: [ 'none', 'calendar', 'check', 'close', 'edit' ],
	mapping: {
		none: '',
		calendar: <FwIcon icon='calendar'/>,
		check: <FwIcon icon='check'/>,
		close: <FwIcon icon='close'/>,
		edit: <FwIcon icon='edit'/>,
	}
}

const meta: ComponentMeta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		startIcon: iconsSettings,
		endIcon: iconsSettings,
	},
};

export default meta;

const Template: ComponentStory<typeof Button> = ( args ) => {
	return <Button { ...args }>Button</Button>;
};

export const Default: ComponentStory<typeof Button> = Template.bind(
	{}
);

Default.args = {
	variant: 'contained',
	size: 'md',
	color: 'primary'
};

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

const SizesTemplate: ComponentStory<typeof Button> = ( { ...args } ) => {
	return <Container style={CONTAINER_STYLE}>
		<Stack spacing={ 2 } direction="column" alignItems="flex-start">
			{ SIZES.map( _ => <Stack key={ _.size } direction="row" alignItems="center" spacing={ 2 }>
				<div style={ { minWidth: 100 } }>{ _.label }</div>
				<Button { ...args } size={ _.size }>Button</Button>
			</Stack> ) }
		</Stack>
	</Container>
};

export const Sizes: ComponentStory<typeof Button> = SizesTemplate.bind( {} );

Sizes.args = {
	variant: 'contained',
	size: 'md',
	color: 'primary'
};