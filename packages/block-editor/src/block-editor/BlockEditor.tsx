import React, { useState, useRef, useEffect } from "react";
import { Popover, SlotFillProvider } from '@wordpress/components';
import { BlockEditorProvider } from '@wordpress/block-editor';

// @ts-ignore No types exists for this yet.
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import { debounce, noop } from "lodash";

// @ts-ignore
import { generateComponentClasses, styled } from "@yith/styles";

import type { BlockEditorProps } from "./types";
import useMediaUpload from "../utils/use-media-upload";
import BlockEditorWritingFlow from "./BlockEditorWritingFlow";
import classNames from "classnames";

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
		'&.is-fixed': {
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
	},
	'.is-alternate .components-popover__content': {
		outlineColor: theme.fields.borderColor
	},
	'.is-alternate .components-dropdown-menu__menu .components-menu-group + .components-menu-group': {
		borderColor: theme.fields.borderColor
	},
	'.block-editor-inserter__popover:not(.is-quick)': {
		'.components-popover__content': {
			padding: '12px'
		}
	}
} ) );

const useComponentClasses = () => {
	return generateComponentClasses(
		'BlockEditor',
		{
			root: [ 'root' ],
		}
	)
}

function BlockEditor( {
						  className,
						  blocks,
						  onChange = noop,
						  placeholder = '',
						  settings = {},
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
	const classes = useComponentClasses();

	return <BlockEditorRoot className={ classNames( classes.root, className ) }>
		<ShortcutProvider>
			<SlotFillProvider>
				<BlockEditorProvider
					value={ blocksRef.current }
					settings={ {
						...settings,
						bodyPlaceholder: placeholder,
						hasFixedToolbar: true,
						// @ts-ignore mediaUpload is not in the types yet.
						mediaUpload
					} }
					onInput={ debounceChange }
					onChange={ debounceChange }
				>

					<BlockEditorWritingFlow
						blocks={ blocksRef.current }
						onChange={ onChange }
						placeholder={ placeholder }
					/>
					<Popover.Slot/>
				</BlockEditorProvider>
			</SlotFillProvider>
		</ShortcutProvider>
	</BlockEditorRoot>
}

export default BlockEditor;