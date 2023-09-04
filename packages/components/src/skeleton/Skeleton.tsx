import { alpha, generateComponentClasses, styled, keyframes } from '@maya-ui/styles';
import React from 'react';
import type { SkeletonOwnerState, SkeletonProps, SkeletonStyled } from "./types";
import classNames from "classnames";

const useComponentClasses = () => {
	return generateComponentClasses(
		'Skeleton',
		{
			root: [ 'root' ]
		}
	)
}

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const SkeletonRoot = styled( 'div', { name: 'Skeleton', slot: 'Root' } )<SkeletonStyled>(
	( { ownerState, theme } ) => ( {
		display: 'block',
		backgroundColor: alpha( theme.palette.text.primary, theme.mode === 'light' ? 0.11 : 0.13 ),
		height: ownerState.height,
		width: ownerState.width,
		...( ownerState.variant === 'circular' && {
			borderRadius: '50%',
		} ),
		...( ownerState.variant === 'rounded' && {
			borderRadius: theme.shape.borderRadius,
		} ),
		...( ownerState.variant === 'text' && {
			marginTop: 0,
			marginBottom: 0,
			height: 'auto',
			fontSize: ownerState.fontSize,
			borderRadius: '4px',
			'&:empty:before': {
				content: '"\\00a0"',
			},
		} ),
		...( ownerState.animation === 'pulse' && {
			animation: `${ pulseAnimation } 1.5s ease-in-out 0.5s infinite`
		} )
	} )
);

/**
 * The Skeleton component display a "placeholder preview" of a non-yet loaded content.
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>( function Skeleton(
	{
		width = 'auto',
		height = 'auto',
		fontSize = '1em',
		variant = 'text',
		animation = 'pulse',
		className,
		...other
	}, ref ) {

	const classes = useComponentClasses();

	const ownerState: SkeletonOwnerState = { variant, height, width, fontSize, animation };
	return (
		<SkeletonRoot
			{ ...other }
			ownerState={ ownerState }
			className={ classNames( classes.root, className ) }
			ref={ ref }
		/>
	);
} );

export default Skeleton;
