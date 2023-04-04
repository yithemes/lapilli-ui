import React, { useEffect } from "react";
import {
	BlockList,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	ObserveTyping,
	WritingFlow,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from "@wordpress/data";

// @ts-ignore
import { styled } from "@yith/styles";

import type { BlockInstance } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

type BlockEditorWritingFlowProps = {
	blocks: BlockInstance[];
	onChange: ( changes: BlockInstance[] ) => void;
	placeholder?: string;
};

export default function BlockEditorWritingFlow(
	{
		blocks,
		onChange,
		placeholder = '',
	}: BlockEditorWritingFlowProps
) {
	const firstBlock = blocks[ 0 ];
	const isEmpty = !blocks.length;
	const { insertBlock, selectBlock } = useDispatch( blockEditorStore );

	const { selectedBlockClientIds } = useSelect( ( select ) => {
		// @ts-ignore This selector is available in the block editor data store.
		const { getSelectedBlockClientIds } = select( blockEditorStore );
		return {
			selectedBlockClientIds: getSelectedBlockClientIds(),
		};
	}, [] );

	useEffect( () => {
		if ( selectedBlockClientIds?.length || !firstBlock ) {
			return;
		}

		selectBlock( firstBlock.clientId, null );
	}, [ firstBlock, selectedBlockClientIds ] );

	useEffect( () => {
		if ( isEmpty ) {
			const initialBlock = createBlock(
				'core/paragraph',
				{
					content: '',
					placeholder,
				} );
			insertBlock( initialBlock );
			onChange( [ initialBlock ] );
		}
	}, [ isEmpty ] );

	return <BlockTools>
		<WritingFlow>
			<ObserveTyping>
				<BlockList/>
			</ObserveTyping>
		</WritingFlow>
	</BlockTools>
}