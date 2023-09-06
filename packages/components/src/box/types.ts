import type React from "react";
import type { SxProps } from "@lapilli-ui/styles";

type BoxOwnProps = {
	/**
	 * The sx prop lets you style elements inline, using values from your theme.
	 */
	sx?: SxProps
}

type BoxPropsWithRef = Omit<React.ComponentProps<'div'>, keyof BoxOwnProps> & BoxOwnProps
export type BoxProps = Omit<BoxPropsWithRef, 'ref'>