import type { BlockInstance } from '@wordpress/blocks';
import type { BlockEditorProvider } from "@wordpress/block-editor";
import type React from "react";

export type BlockEditorPreviewOwnProps = {
	blocks: BlockInstance[]
	settings?: BlockEditorProvider.Props['settings'],
}

export type BlockEditorPreviewProps = Omit<React.ComponentProps<'div'>, keyof BlockEditorPreviewOwnProps> & BlockEditorPreviewOwnProps