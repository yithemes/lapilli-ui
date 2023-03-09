import type React from "react";
import type { Theme } from "@yith/styles";

type BackdropOwnProps = {
	open: boolean
	disablePortal: boolean
}

export type BackdropProps = Omit<React.ComponentProps<'div'>, keyof BackdropOwnProps | 'ref'>

export type BackdropStyled = {
	theme: Theme
}