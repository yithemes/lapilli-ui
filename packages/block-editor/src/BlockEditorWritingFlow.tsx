import React, { useEffect, useState } from "react";
import {
	BlockList,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	BlockInspector,
	ObserveTyping,
	WritingFlow,
	// @ts-ignore No types for this exist yet.
	__unstableBlockToolbarLastItem as BlockToolbarLastItem,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from "@wordpress/data";
import { Button } from '@wordpress/components';

// @ts-ignore
import { styled } from "@yith/styles";

import type { BlockInstance } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

type BlockEditorWritingFlowProps = {
	blocks: BlockInstance[];
	onChange: ( changes: BlockInstance[] ) => void;
	placeholder?: string;
};

const BlockEditorWritingFlowWrapper = styled( 'div', { name: 'BlockEditorWritingFlow', slot: 'Wrapper' } )( ( { theme } ) => ( {
	display: 'flex',
	'.block-editor-writing-flow': {
		flex: 1,
	}, '.block-editor-block-inspector': {
		width: 280,
		borderLeftStyle: 'solid',
		borderLeftWidth: '1px',
		borderLeftColor: theme.fields.borderColor,
	},
} ) );

const BlockEditorToolbarActionsRoot = styled( 'div', { name: 'BlockEditorToolbarActions', slot: 'Root' } )( ( { theme } ) => ( {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	flex: 1,
	'.components-button.has-icon.has-icon': {
		minWidth: '36px',
		paddingLeft: '6px',
		paddingRight: '6px',
	}
} ) );

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
	const [ isInspectorOpen, setIsInspectorOpen ] = useState( false );

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
		<BlockEditorWritingFlowWrapper>
			<WritingFlow>
				<ObserveTyping>
					<BlockList/>
				</ObserveTyping>
			</WritingFlow>
			{
				isInspectorOpen &&
				<form onSubmit={ ( event ) => event.preventDefault() }>
					<BlockInspector/>
				</form>
			}
		</BlockEditorWritingFlowWrapper>

		<BlockToolbarLastItem>
			<BlockEditorToolbarActionsRoot>
				<Button icon='admin-generic' label='Settings' onClick={ () => setIsInspectorOpen( _ => !_ ) } isPressed={ isInspectorOpen }/>
			</BlockEditorToolbarActionsRoot>
		</BlockToolbarLastItem>

	</BlockTools>
}