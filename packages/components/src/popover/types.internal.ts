import type { PopoverPosition, PopoverProps, PopoverXPos, PopoverYPos } from "./types";

export type PopoverComputePositionProps = {
	anchorRect: DOMRect;
	container: HTMLElement;
	position: PopoverPosition;
	verticalMargin: number;
	forceMinWidth: boolean | number;
	forceInView: PopoverProps['forceInView']
	fixed: boolean
	document?: Document
};

export type PopoverComputedPosition = {
	maxWidth?: number;
	maxHeight?: number;
	minWidth?: number;
	xPos: PopoverXPos;
	yPos: PopoverYPos;
} & ( { left: number; right?: never } | { right: number; left?: never } ) &
	( { top: number; bottom?: never } | { bottom: number; top?: never } );