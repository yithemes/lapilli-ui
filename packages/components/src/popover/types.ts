import type React from "react";
import type { SxProps } from "@yith/styles";

export type PopoverXPos = 'left' | 'right';
export type PopoverYPos = 'top' | 'bottom';
export type PopoverPosition = `${ PopoverYPos } ${ PopoverXPos }`;

export type PopoverProps = {
	/**
	 * An HTML anchor element, used to set the position of the popover.
	 */
	anchorRef?: HTMLElement;
	/**
	 * The preferred position of the popover.
	 */
	position?: PopoverPosition;
	/**
	 * The vertical margin between the anchor element and the popover.
	 */
	verticalMargin?: number;
	/**
	 * Callback fired when clicking outside the popover.
	 */
	onClickOutside?: ( event: MouseEvent | React.KeyboardEvent<HTMLDivElement> ) => void;
	/**
	 * If `true`, the popover will have the minimum width set to the anchor element one.
	 * You can set a specific min-width value as a number.
	 */
	forceMinWidth?: boolean | number;
	/**
	 * If `true`, the popover won't use the portal.
	 */
	disablePortal?: boolean;
	/**
	 * If `true`, the popover will be forced to be inside the viewport (by setting max width/height).
	 * Use `horizontally` or `vertically` to force only the horizontal or vertical dimension.
	 * Use `false` to disable forcing.
	 */
	forceInView?: 'horizontally' | 'vertically' | boolean;
	/**
	 * Sx theme props.
	 */
	sx?: SxProps
} & React.ComponentProps<'div'>;

