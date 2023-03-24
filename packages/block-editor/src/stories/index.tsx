import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BlockInstance, parse } from '@wordpress/blocks';

import BlockEditor from "..";

const meta: ComponentMeta<typeof BlockEditor> = {
	title: 'Components/BlockEditor',
	component: BlockEditor,
};

export default meta;

const DefaultTemplate: ComponentStory<typeof BlockEditor> = ( ) => {
	const [ blocks, setBlocks ] = React.useState<BlockInstance[]>( parse( '' ) );

	const onChange = ( blocks: BlockInstance[] ) => {
		setBlocks( blocks );
	}
	return <BlockEditor blocks={ blocks } onChange={ onChange }/>;
};

export const Default: ComponentStory<typeof BlockEditor> = DefaultTemplate.bind( {} );