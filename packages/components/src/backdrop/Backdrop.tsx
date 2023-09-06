import React from "react";
import classNames from "classnames";
import { generateComponentClasses, keyframes, styled } from "@lapilli-ui/styles";

import type { BackdropProps, BackdropStyled } from "./types";

const fadeInAnimation = keyframes`
from {
	opacity: 0;
}
to {
	opacity: 1;
}
`;

const BackdropRoot = styled( 'div', { name: 'Backdrop', slot: 'Root' } )(
	( { theme }: BackdropStyled ) => ( {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: theme.palette.background.backdrop,
		backdropFilter: 'blur(4px)',
		animation: `${fadeInAnimation} .3s forwards`
	} )
);

const useComponentClasses = () => {
	return generateComponentClasses(
		'Backdrop',
		{
			root: [ 'root' ]
		}
	)
}

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>( function Backdrop(
	{
		className,
		children,
		...other
	},
	ref
) {

	const classes = useComponentClasses()

	return <BackdropRoot
		ref={ ref }
		aria-hidden
		className={ classNames( classes.root, className ) }
		{ ...other }
	>
		{ children }
	</BackdropRoot>
} )

export default Backdrop;