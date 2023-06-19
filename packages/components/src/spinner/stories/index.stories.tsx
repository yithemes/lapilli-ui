import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Spinner from '../';

const meta: ComponentMeta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
};

export default meta;

const Template: ComponentStory<typeof Spinner> = ( args ) => {
	return <Spinner { ...args }/>;
};

export const Default: ComponentStory<typeof Spinner> = Template.bind( {} );
Default.args = {
	color: 'default',
	thickness: 3.6,
	size: 'md'
};

const SIZES: { size: 'sm' | 'md' | 'lg' | 'xl', label: string, description: string }[] = [
	{ size: 'sm', label: 'Small', description: '16px' },
	{ size: 'md', label: 'Medium', description: '24px' },
	{ size: 'lg', label: 'Large', description: '32px' },
	{ size: 'xl', label: 'Extra large', description: '40px' },
]

const SizesTemplate: ComponentStory<typeof Spinner> = ( { ...args } ) => {
	return <>
		{ SIZES.map( _ => (
				<div key={ _.size } style={ { textAlign: "center", padding: "10px 15px", display: 'inline-block' } }>
					<Spinner { ...args } size={ _.size }/>
					<div style={ { margin: '8px 0 0' } }>{ _.label }</div>
					<div>{ _.description }</div>
				</div>
			)
		) }
	</>;
};

export const Sizes: ComponentStory<typeof Spinner> = SizesTemplate.bind( {} );
Sizes.args = {
	color: 'default',
	thickness: 3.6,
	size: 'md'
};