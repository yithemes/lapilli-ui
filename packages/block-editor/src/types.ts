import type { BlockInstance } from '@wordpress/blocks';

export type BlockEditorProps = {
	blocks: BlockInstance[]
	onChange: ( changes: BlockInstance[] ) => void
	placeholder?: string
}