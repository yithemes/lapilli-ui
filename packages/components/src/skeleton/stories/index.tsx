import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Skeleton from '../';

const meta: ComponentMeta<typeof Skeleton> = {
	title: 'Components/Skeleton',
	component: Skeleton,
};

export default meta;

const Template: ComponentStory<typeof Skeleton> = ( args ) => {
	return <Skeleton { ...args } />;
};

export const Default: ComponentStory<typeof Skeleton> = Template.bind(
	{}
);

Default.args = {
	variant: 'text',
	animation: 'pulse'
};