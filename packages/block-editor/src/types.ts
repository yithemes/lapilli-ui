import type { BlockInstance } from '@wordpress/blocks';
import type { BlockEditorProvider } from "@wordpress/block-editor";
import type React from "react";

export type BlockEditorOwnProps = {
	blocks: BlockInstance[]
	onChange: ( changes: BlockInstance[] ) => void
	placeholder?: string,
	settings?: BlockEditorProvider.Props['settings'],
}

export type BlockEditorProps = Omit<React.ComponentProps<'div'>, keyof BlockEditorOwnProps> & BlockEditorOwnProps