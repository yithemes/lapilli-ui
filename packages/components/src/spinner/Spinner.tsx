import { keyframes, PaletteClass, styled, SxProps } from '@yith/styles';
import React from 'react';
import { forwardRef } from 'react';

type SpinnerOwnerState = {
	/**
	 * The color of the component.
	 */
	color: 'inherit' | 'default' | PaletteClass;
	/**
	 * Choose the thickness of the line of the spinner.
	 */
	thickness: number;
	/**
	 * Choose the size of the spinner
	 */
	size: number;
};
type SpinnerPropsWithRef = Omit<React.ComponentProps<'span'>, keyof SpinnerOwnerState> & {
	/**
	 * Choose the size of the spinner
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | number;
	sx?: SxProps;
} & Omit<Partial<SpinnerOwnerState>, 'size'>;

type SpinnerProps = Omit<SpinnerPropsWithRef, 'ref'>

type StyledSpinnerProps = { ownerState: SpinnerOwnerState };

const SVG_SIZE = 44;

const rotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const dashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const SpinnerRoot = styled( 'span', { name: 'Spinner', slot: 'Root' } )<StyledSpinnerProps>( ( { ownerState, theme } ) => ( {
	display: 'inline-flex',
	animation: `${ rotateKeyframe } 1.4s linear infinite`,
	width: ownerState.size,
	height: ownerState.size,
	...( ownerState.color === 'default' && {
		color: theme.palette.action.active,
	} ),
	...( ownerState.color !== 'inherit' &&
		ownerState.color !== 'default' && {
			color: theme.palette[ ownerState.color ].main,
		} ),
} ) );

const SpinnerSvg = styled( 'svg', { name: 'Spinner', slot: 'Svg' } )`
	display: block;
`;

const SpinnerCircle = styled( 'circle', { name: 'Spinner', slot: 'Circle' } )( () => ( {
	stroke: 'currentColor',
	strokeDasharray: '80px, 200px',
	strokeDashoffset: 0,
	animation: `${ dashKeyframe } 1.4s linear infinite`,
} ) );

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>( function Spinner(
	{
		color = 'default',
		thickness = 3.6,
		size: sizeProp = 24,
		...other
	},
	ref
) {
	const size = typeof sizeProp === 'number' ? sizeProp : { sm: 16, md: 24, lg: 32, xl: 40 }[ sizeProp ] ?? 24;

	const ownerState: SpinnerOwnerState = { color, thickness, size };
	return (
		<SpinnerRoot ownerState={ ownerState } ref={ ref } { ...other }>
			<SpinnerSvg viewBox={ `${ SVG_SIZE / 2 } ${ SVG_SIZE / 2 } ${ SVG_SIZE } ${ SVG_SIZE }` }>
				<SpinnerCircle
					cx={ SVG_SIZE }
					cy={ SVG_SIZE }
					r={ ( SVG_SIZE - thickness ) / 2 }
					fill="none"
					strokeWidth={ thickness }
				/>
			</SpinnerSvg>
		</SpinnerRoot>
	);
} );

export default Spinner;
