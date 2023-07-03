import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

import type { FieldSize } from "@yith/styles";

import IconButton from '../';
import Stack from "../../stack";
import Typography from "../../typography";

const meta: Meta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	argTypes: {
		children: {
			control: {
				type: 'select',
			},
			options: [ 'eye', 'edit', 'trash' ],
			mapping: {
				eye: <EyeIcon width='1em'/>,
				edit: <PencilIcon width='1em'/>,
				trash: <TrashIcon width='1em'/>,
			}
		},
	}
};

export default meta;

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
	args: {
		color: 'primary',
		children: 'edit',
		variant: 'ghost',
		size: 'md'
	},
	render: ( { children, ...args } ) => {
		return <IconButton { ...args } aria-label='Click me'>{ children }</IconButton>;
	}
};


const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

export const Sizes: Story = {
	args: Default.args,
	render: ( { children, ...args } ) => {
		return <>
			<Stack spacing={ 3 } direction="row" align="start" wrap>
				{ SIZES.map( _ => <Stack key={ _.size } direction="column" align="center" spacing={ 2 }>
					<Stack style={ { minHeight: 60 } } align="center" justify="center">
						<IconButton { ...args } size={ _.size } aria-label='Click me'>{ children }</IconButton>
					</Stack>
					<Typography align='center'>{ _.label }</Typography>
				</Stack> ) }
			</Stack>

		</>;
	}
};