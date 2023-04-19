import React from 'react';
import { Disabled } from '@wordpress/components';

import {
	BlockList,
	BlockEditorProvider,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	// @ts-ignore No types for this exist yet.
	__unstableEditorStyles as EditorStyles,
} from '@wordpress/block-editor';
import type { BlockEditorPreviewProps } from "./types";
import { styled } from "@yith/styles";
import classNames from "classnames";
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
			<BlockEditorProvider value={ blocks } settings={ settings }>
				<BlockTools>
					<BlockList className={ layoutClasses }/>
				</BlockTools>
			</BlockEditorProvider>
		</Disabled>
	</BlockEditorPreviewRoot>
}

export default BlockEditorPreview;