import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Stack from "..";

const meta: ComponentMeta<typeof Stack> = {
	title: 'Components/Stack',
	component: Stack,
};

export default meta;

const Item = ( { children }: { children: React.ReactNode } ) => {
	return <div style={ {
		background: '#f1f1f1',
		borderRadius: '4px',
		padding: '8px 16px',
		textAlign: 'center'
	} }>
		{ children }
	</div>
}

const Template: ComponentStory<typeof Stack> = ( args ) => {
	return <Stack { ...args }>
		<Item>One</Item>
		<Item>Two</Item>
		<Item>Three</Item>
	</Stack>;
};

export const Default: ComponentStory<typeof Stack> = Template.bind(
	{}
);

Default.args = {
	spacing: 2
}