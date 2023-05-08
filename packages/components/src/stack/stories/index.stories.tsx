import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Stack from "..";

const createResponsiveRadioControl = ( ...options: string[] ) => {
	return {
		table: { type: { summary: 'ResponsiveStyleValue<' + options.join( ' | ' ) + '>' }, },
		control: { type: 'radio' },
		options: options,
	}
}

const meta: ComponentMeta<typeof Stack> = {
	title: 'Components/Stack',
	component: Stack,
	argTypes: {
		direction: createResponsiveRadioControl( 'row', 'column' ),
		align: createResponsiveRadioControl( 'start', 'end', 'center', 'baseline', 'stretch' ),
		justify: createResponsiveRadioControl( 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly' ),
		wrap: {control: { type: 'boolean' },}
	}
};

export default meta;

const Item = ( { children }: { children: React.ReactNode } ) => {
	return <div style={ {
		border: '1px solid #cbd5e1',
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