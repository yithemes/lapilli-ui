import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Typography from "..";
import type { TypographyVariant } from "@maya-ui/styles";

const meta: Meta<typeof Typography> = {
	title: 'Components/Typography',
	component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

const variants: Record<TypographyVariant, string> = {
	h1: 'Heading',
	h2: 'Heading',
	h3: 'Heading',
	h4: 'Heading',
	h5: 'Heading',
	h6: 'Heading',
	body: LOREM_IPSUM,
	body2: LOREM_IPSUM,
}

export const Default: Story = {
	args: {
		variant: 'body',
		color: 'text.primary',
		gutterBottom: true,
		align: 'left'
	},
	render: args => <>
		{ ( Object.keys( variants ) as TypographyVariant[] ).map( key => (
			<Typography { ...args } key={ key } variant={ key }>
				{ `${ key } - ${ variants[ key ] }` }
			</Typography>
		) ) }
	</>
}