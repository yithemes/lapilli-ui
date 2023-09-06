import type React from "react";
import type { Breakpoint, SxProps } from "@lapilli-ui/styles";

type ContainerOwnProps = {
	/**
	 * The max width of the container.
	 */
	maxWidth?: false | Breakpoint | React.CSSProperties['maxWidth']
	/**
	 * The alignment of the container.
	 */
	align?: 'left' | 'center' | 'right'
	/**
	 * Set to `true` to disable the left and right padding.
	 */
	gutters?: number | React.CSSProperties['paddingRight']
	/**
	 * The sx prop lets you style elements inline, using values from your theme.
	 */
	sx?: SxProps
}

type ContainerPropsWithRef = Omit<React.ComponentProps<'div'>, keyof ContainerOwnProps> & ContainerOwnProps
export type ContainerProps = Omit<ContainerPropsWithRef, 'ref'>

export type ContainerOwnerState = Required<Pick<ContainerOwnProps, 'maxWidth' | 'align' | 'gutters'>>

export type ContainerStyled = {
	ownerState: ContainerOwnerState
}