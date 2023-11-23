import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from "..";
import Button from "../../button";
import VStack from "../../v-stack";
import HStack from "../../h-stack";
import { styled } from "@lapilli-ui/styles";

import { ArrowDownTrayIcon, Square2StackIcon, PencilIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Experimental/Dropdown',
	component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>

const Wrap = styled( VStack )( () => ( {
	minWidth: 200,
	fontSize: 14,
	marginBlock: 4
} ) )

const Item = styled( HStack )( ( { theme } ) => ( {
	paddingBlock: 12,
	paddingInline: 16,
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.primary.main
	},
	'svg': {
		width: '1.3em',
		opacity: .6
	}
} ) )

export const Default: Story = {
	render: ( args ) => {
		return <>
			<Dropdown
				{ ...args }
				renderToggle={ ( { toggle } ) => <Button onClick={ toggle }>Menu</Button> }
				renderContent={ () => <Wrap>
					<Item spacing={ 2 }><PencilIcon/>Edit</Item>
					<Item spacing={ 2 }><Square2StackIcon/>Duplicate</Item>
					<Item spacing={ 2 }><ArrowDownTrayIcon/>Download</Item>
				</Wrap> }

			/>
		</>
	}
}