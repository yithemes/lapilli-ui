import React, { useState, useRef, useEffect } from "react";
import { Popover, SlotFillProvider } from '@wordpress/components';
import { BlockEditorProvider } from '@wordpress/block-editor';

// @ts-ignore No types exists for this yet.
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import { debounce, noop } from "lodash";

// @ts-ignore
import { styled } from "@yith/styles";

import type { BlockEditorProps } from "./types";
import { ALLOWED_BLOCK_TYPES, registerBlocks } from './utils/register-blocks';
import useMediaUpload from "./utils/use-media-upload";
import BlockEditorWritingFlow from "./BlockEditorWritingFlow";

registerBlocks();

const BlockEditorRoot = styled( 'div', { name: 'BlockEditor', slot: 'Root' } )( ( { theme } ) => ( {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: theme.fields.borderColor,
	borderRadius: theme.fields.borderRadius,
	background: theme.fields.background,
	width: '100%',
	'.block-editor-block-contextual-toolbar': {
		background: theme.fields.background,
		borderTopLeftRadius: theme.fields.borderRadius,
		borderTopRightRadius: theme.fields.borderRadius,
		borderColor: theme.fields.borderColor,
		'body.admin-bar &.is-fixed': {
			top: '32px'
		},
		'&.is-fixed': {
			top: '32px',
			'.block-editor-block-toolbar .components-toolbar-group': {
				borderColor: theme.fields.borderColor,
			}
		},
		'.block-editor-block-toolbar .components-toolbar-group': {
			borderColor: theme.fields.borderColor,
		}
	},
	'.block-editor-writing-flow': {
		padding: '12px',
		boxSizing: 'border-box',
		minHeight: '120px',
		'ol, ul': {
			listStyle: 'revert',
			padding: 'revert',
		},
		'& :where(.wp-block)': {
			maxWidth: '100%',
			marginTop: '8px',
			marginBottom: '8px',
		},
		'.block-editor-default-block-appender__content': {
			marginTop: '8px',
			marginBottom: '8px',
		}
	},
	'.is-alternate .components-popover__content': {
		outlineColor: theme.fields.borderColor
	},
	'.is-alternate .components-dropdown-menu__menu .components-menu-group + .components-menu-group': {
		borderColor: theme.fields.borderColor
	}
} ) );

function BlockEditor( {
						  blocks,
						  onChange = noop,
						  placeholder = ''
					  }: BlockEditorProps ) {
	const blocksRef = useRef( blocks );

	const [ , setRefresh ] = useState( 0 );

	const forceRerender = () => {
		setRefresh( _ => _ + 1 );
	};

	useEffect( () => {
		blocksRef.current = blocks;
		forceRerender();
	}, [ blocks ] );


	const debounceChange = debounce( ( updatedBlocks ) => {
		onChange( updatedBlocks );
		blocksRef.current = updatedBlocks;
		forceRerender();
	}, 200 );

	const mediaUpload = useMediaUpload();

	return <BlockEditorRoot>
		<SlotFillProvider>
			<BlockEditorProvider
				value={ blocksRef.current }
				settings={ {
					allowedBlockTypes: ALLOWED_BLOCK_TYPES,
					bodyPlaceholder: placeholder,
					hasFixedToolbar: true,
					// @ts-ignore
					mediaUpload,
					// renderAppender: false
				} }
				onInput={ debounceChange }
				onChange={ debounceChange }
			>
				<ShortcutProvider>
					<BlockEditorWritingFlow
						blocks={ blocksRef.current }
						onChange={ onChange }
						placeholder={ placeholder }
					/>
				</ShortcutProvider>
				<Popover.Slot/>
			</BlockEditorProvider>
		</SlotFillProvider>
	</BlockEditorRoot>
}

export default BlockEditor;