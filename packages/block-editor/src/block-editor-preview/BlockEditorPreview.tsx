import React from 'react';
import { Disabled } from '@wordpress/components';
import classNames from "classnames";
import {
	BlockList,
	BlockEditorProvider,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	// @ts-ignore No types for this exist yet.
	__unstableEditorStyles as EditorStyles,
} from '@wordpress/block-editor';
// @ts-ignore No types exists for this yet.
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';

import { styled } from "@lapilli-ui/styles";

import type { BlockEditorPreviewProps } from "./types";
import useLayoutClasses from "../utils/use-layout-classes";

const BlockEditorPreviewRoot = styled( 'div', { name: 'BlockEditorPreview', slot: 'Root' } )( () => ( {
	'.block-list-appender': {
		display: 'none'
	},
	'.wp-block-paragraph[data-empty="true"]': {
		display: 'none'
	},
} ) );

function BlockEditorPreview( { className, blocks, settings = {}, ...other }: BlockEditorPreviewProps ) {

	const layoutClasses = useLayoutClasses();

	return <BlockEditorPreviewRoot className={ classNames( 'editor-styles-wrapper', className ) } { ...other }>
		<EditorStyles styles={ settings.styles ?? [] }/>
		<Disabled>
			<ShortcutProvider>
				<BlockEditorProvider value={ blocks } settings={ settings }>
					<BlockTools>
						<BlockList className={ layoutClasses }/>
					</BlockTools>
				</BlockEditorProvider>
			</ShortcutProvider>
		</Disabled>
	</BlockEditorPreviewRoot>
}

export default BlockEditorPreview;