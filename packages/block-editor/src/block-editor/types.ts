import type { BlockInstance } from '../types/wordpress';
import type { BlockEditorProvider } from "@wordpress/block-editor";
import type React from "react";

export type BlockEditorOwnProps = {
	blocks: BlockInstance[]
	onChange: ( changes: BlockInstance[] ) => void
	placeholder?: string,
	settings?: BlockEditorProvider.Props['settings'],
	disablePortal?: boolean,
}

export type BlockEditorProps = Omit<React.ComponentProps<'div'>, keyof BlockEditorOwnProps> & BlockEditorOwnProps