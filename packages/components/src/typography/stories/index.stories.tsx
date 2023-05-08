import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Typography from "..";
import type { TypographyVariant } from "@yith/styles";

const meta: ComponentMeta<typeof Typography> = {
	title: 'Components/Typography',
	component: Typography,
};

export default meta;

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

const Template: ComponentStory<typeof Typography> = () => {
	return <>
		{ ( Object.keys( variants ) as TypographyVariant[] ).map( key => (
			<Typography key={ key } variant={ key } gutterBottom>
				{ `${ key } - ${ variants[ key ] }` }
			</Typography>
		) ) }
	</>
};

export const Default: ComponentStory<typeof Typography> = Template.bind( {} );