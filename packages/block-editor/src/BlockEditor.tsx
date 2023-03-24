import React from "react";
import { Popover, SlotFillProvider } from '@wordpress/components';
import {
	BlockEditorProvider,
	BlockList,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	ObserveTyping,
	WritingFlow
} from '@wordpress/block-editor';
// @ts-ignore
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import { debounce, noop } from "lodash";

import { styled } from "@yith/styles";

import type { BlockEditorProps } from "./types";
import { registerBlocks } from './utils/register-blocks';

registerBlocks();

const BlockEditorRoot = styled( 'div', { name: 'BlockEditor', slot: 'Root' } )( ( { theme } ) => ( {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: theme.fields.borderColor,
	width: '100%',
	'& .block-editor-writing-flow': {
		padding: '12px',
		boxSizing: 'border-box',
		'ol, ul': {
			listStyle: 'revert',
			padding: 'revert',
		}
	}
} ) );

function BlockEditor( {
						  blocks,
						  onChange = noop,
						  placeholder = ''
					  }: BlockEditorProps ) {

	const debounceChange = debounce( ( updatedBlocks ) => {
		onChange( updatedBlocks );
	}, 200 );

	return <BlockEditorRoot>

		<SlotFillProvider>
			<BlockEditorProvider
				value={ blocks }
				settings={ {
					bodyPlaceholder: placeholder,
					hasFixedToolbar: true,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore This property was recently added in the block editor data store.
					__experimentalClearBlockSelection: false,
				} }
				onInput={ debounceChange }
				onChange={ debounceChange }
			>
				<ShortcutProvider>
					<BlockTools>
						<WritingFlow>
							<ObserveTyping>
								<BlockList/>
							</ObserveTyping>
						</WritingFlow>
					</BlockTools>
				</ShortcutProvider>
				<Popover.Slot/>
			</BlockEditorProvider>
		</SlotFillProvider>
	</BlockEditorRoot>
}

export default BlockEditor;