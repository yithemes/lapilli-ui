import type { SxProps } from "@yith/styles";
import type React from 'react';

export type SkeletonOwnProps = {
	/**
	 * The type of content that will be rendered.
	 */
	variant?: 'text' | 'circular' | 'rounded' | 'rectangular'
	/**
	 * The width
	 */
	width?: React.CSSProperties['width']
	/**
	 * The width
	 */
	height?: React.CSSProperties['height']

	/**
	 * The fontSize. Useful for 'text' variant.
	 */
	fontSize?: React.CSSProperties['fontSize']

	/**
	 * The animation to use.
	 */
	animation?: 'pulse' | false
	/**
	 * Sx props.
	 */
	sx?: SxProps
}

type SkeletonPropsWithRef = Omit<React.ComponentProps<'div'>, keyof SkeletonOwnProps> & SkeletonOwnProps
export type SkeletonProps = Omit<SkeletonPropsWithRef, 'ref'>

export type SkeletonOwnerState = Required<Pick<SkeletonOwnProps, 'variant' | 'width' | 'height' | 'fontSize' | 'animation'>>

export type SkeletonStyled = {
	ownerState: SkeletonOwnerState
}