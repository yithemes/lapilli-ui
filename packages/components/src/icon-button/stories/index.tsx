import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import IconButton from '../';
import FwIcon from "../../fw-icon";
import type { FieldSize } from "@yith/styles";
import Stack from "../../stack";
import Container from "../../container";

const meta: ComponentMeta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	argTypes: {
		children: {
			control: {
				type: 'select',
			},
			options: [ 'eye', 'edit', 'trash' ],
			mapping: {
				eye: <FwIcon icon='eye'/>,
				edit: <FwIcon icon='edit'/>,
				trash: <FwIcon icon='trash'/>,
			}
		},
	}
};

export default meta;

const Template: ComponentStory<typeof IconButton> = ( { children, ...args } ) => {
	return <IconButton { ...args }>{ children }</IconButton>;
};
export const Default: ComponentStory<typeof IconButton> = Template.bind( {} );

Default.args = {
	color: 'primary',
	children: 'edit',
	variant: 'shadowed',
	size: 'md'
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

const SizesTemplate: ComponentStory<typeof IconButton> = ( { children, ...args } ) => {
	return <Container style={ CONTAINER_STYLE }>
		<Stack spacing={ 2 } direction="row" alignItems="flex-start">
			{ SIZES.map( _ => <Stack key={ _.size } direction="column" alignItems="center" spacing={ 2 }>
				<Stack style={ { minHeight: 60 } } alignItems="center" justifyContent="center">
					<IconButton { ...args } size={ _.size }>{ children }</IconButton>
				</Stack>
				<div style={ { textAlign: 'center' } }>{ _.label }</div>
			</Stack> ) }
		</Stack>
	</Container>;
};

export const Sizes: ComponentStory<typeof IconButton> = SizesTemplate.bind( {} );

Sizes.args = {
	color: 'primary',
	children: 'edit',
	variant: 'shadowed',
	size: 'md'
}
