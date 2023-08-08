import React, { useEffect, useState } from "react";
import {
	BlockList,
	// @ts-ignore No types for this exist yet.
	BlockTools,
	BlockInspector,
	ObserveTyping,
	WritingFlow,
	Inserter,
	// @ts-ignore No types for this exist yet.
	__unstableBlockToolbarLastItem as BlockToolbarLastItem,
	// @ts-ignore No types for this exist yet.
	__unstableEditorStyles as EditorStyles,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from "@wordpress/data";
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { drawerRight } from '@wordpress/icons';
import { createBlock, BlockInstance } from "@wordpress/blocks";

import { styled } from "@yith/styles";
import useLayoutClasses from "../utils/use-layout-classes";
import { useLosingFocusFix } from "./utils/useLosingFocusFix";

type BlockEditorWritingFlowProps = {
	blocks: BlockInstance[];
	onChange: ( changes: BlockInstance[] ) => void;
	placeholder?: string;
};

const BlockEditorWritingFlowRoot = styled( 'div', { name: 'BlockEditorWritingFlow', slot: 'Root' } )( () => ( {} ) );

const BlockEditorWritingFlowWrapper = styled( 'div', { name: 'BlockEditorWritingFlow', slot: 'Wrapper' } )( ( { theme } ) => ( {
	display: 'flex',
	'.block-editor-writing-flow': {
		flex: 1,
		borderBottomLeftRadius: theme.fields.borderRadius,
		borderBottomRightRadius: theme.fields.borderRadius,
	},
	'.block-editor-block-inspector': {
		width: 280,
		borderLeftStyle: 'solid',
		borderLeftWidth: '1px',
		borderLeftColor: theme.fields.borderColor,
		height: '100%'
	},
} ) );

const BlockEditorToolbarActionsRoot = styled( 'div', { name: 'BlockEditorToolbarActions', slot: 'Root' } )( () => ( {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	flex: 1,
	'.components-toolbar-group': {
		border: 'none',
		paddingRight: 0,
		'&:after': {
			display: 'none'
		}
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

	const { selectedBlockClientIds, blockEditorSettings } = useSelect( ( select ) => {
		// @ts-ignore This selector is available in the block editor data store.
		const { getSelectedBlockClientIds, getSettings } = select( blockEditorStore );
		return {
			selectedBlockClientIds: getSelectedBlockClientIds(),
			blockEditorSettings: getSettings(),
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

	const rootRef = useLosingFocusFix();

	const layoutClasses = useLayoutClasses();

	return <BlockEditorWritingFlowRoot ref={ rootRef }>
		<BlockTools>
			<EditorStyles styles={ blockEditorSettings?.styles ?? [] }/>
			<BlockEditorWritingFlowWrapper>
				<WritingFlow
					// @ts-ignore className is a valid prop for WritingFlow.
					className="editor-styles-wrapper"
				>
					<ObserveTyping>
						<BlockList className={ layoutClasses }/>
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
					<ToolbarGroup>
						<Inserter
							isAppender
							// @ts-ignore toggleProps is a valid prop for Inserter.
							toggleProps={ { as: ToolbarButton } }
						/>
						<ToolbarButton icon={ drawerRight } onClick={ () => setIsInspectorOpen( _ => !_ ) } isPressed={ isInspectorOpen }/>
					</ToolbarGroup>
				</BlockEditorToolbarActionsRoot>
			</BlockToolbarLastItem>

		</BlockTools>
	</BlockEditorWritingFlowRoot>
}