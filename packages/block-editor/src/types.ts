import type { BlockInstance } from '@wordpress/blocks';
import type { BlockEditorProvider } from "@wordpress/block-editor";

export type BlockEditorProps = {
	blocks: BlockInstance[]
	onChange: ( changes: BlockInstance[] ) => void
	placeholder?: string,
	settings?: BlockEditorProvider.Props['settings'],
}