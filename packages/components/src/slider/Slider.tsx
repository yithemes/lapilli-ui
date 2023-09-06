import { capitalize } from 'lodash';
import React, { forwardRef, Fragment, useCallback, useRef, useState } from 'react';

import { alpha, FieldSize, generateComponentClasses, styled } from '@lapilli-ui/styles';

import type { SliderMark, SliderOwnerState, SliderProps, SliderStyled } from "./types";
import classNames from "classnames";
import { useControlledState, useMergedRefs, useRelatedLabelFocus } from "../utils";
import Popover from "../popover";
import { useDocument } from "../document-provider";

const useComponentClasses = ( ownerState: SliderOwnerState ) => {
	return generateComponentClasses(
		'Slider',
		{
			root: [
				'root',
				`--size${ capitalize( ownerState.size ) }`,
				`--color${ capitalize( ownerState.color ) }`,
				ownerState.disabled && 'disabled'
			],
			field: [ 'field' ],
			track: [ 'track' ],
			filledTrack: [ 'filledTrack' ],
			thumb: [ 'thumb' ],
		}
	)
}

const getSizing = ( size: FieldSize ) => {
	return {
		sm: 2,
		md: 4,
		lg: 6,
		xl: 8
	}[ size ];
}

const SliderRoot = styled( 'div', { name: 'Slider', slot: 'Root' } )<SliderStyled>( ( { ownerState, theme } ) => ( {
	color: theme.palette[ ownerState.color ].main,
	cursor: 'pointer',
	position: 'relative',
	padding: `${ getSizing( ownerState.size ) * 2 }px 0`,
	fontSize: theme.fields.fontSize,
	userSelect: 'none',
	lineHeight: '1.5em',
	outline: 'none',
	width: '100%',
	...( ownerState.hasMarkLabels && {
		marginBottom: '1.5em'
	} ),
	...( ownerState.disabled && {
		opacity: theme.palette.action.disabledOpacity,
		cursor: 'not-allowed'
	} )
} ) );

const SliderTrack = styled( 'div', { name: 'Slider', slot: 'Track' } )<SliderStyled>( ( { theme, ownerState } ) => ( {
	background: theme.palette.grey[ theme.mode === 'light' ? 200 : 700 ],
	height: getSizing( ownerState.size ),
	borderRadius: getSizing( ownerState.size ),
	position: 'relative',
} ) );

const SliderFilledTrack = styled( 'div', { name: 'Slider', slot: 'FilledTrack' } )<SliderStyled>( ( { ownerState } ) => ( {
	background: 'currentColor',
	height: getSizing( ownerState.size ),
	borderRadius: getSizing( ownerState.size ),
	transition: 'width .1s cubic-bezier(.4,0,.2,1)',
	...( ownerState.isDragging && {
		transition: 'none'
	} )
} ) );

const SliderMark = styled( 'div', { name: 'Slider', slot: 'Mark', shouldForwardProp: prop => prop !== 'active' } )<SliderStyled & { active: boolean }>( ( { theme, ownerState, active } ) => ( {
	background: theme.palette[ ownerState.color ].main,
	width: 2,
	height: 2,
	position: 'absolute',
	top: '50%',
	borderRadius: '50%',
	transform: 'translate(-50%, -50%)',
	...( active && {
		background: theme.palette[ ownerState.color ].contrastText,
	} ),
	...( ownerState.size === 'sm' && {
		width: 1,
		height: 1,
	} ),
} ) );

const SliderMarkLabel = styled( 'div', { name: 'Slider', slot: 'MarkLabel', shouldForwardProp: prop => prop !== 'active' } )<SliderStyled & { active: boolean }>( ( { theme, ownerState, active } ) => ( {
	color: theme.palette.text.secondary,
	position: 'absolute',
	top: '100%',
	transform: 'translate(-50%, 0)',
	padding: getSizing( ownerState.size ),
	...( active && {
		color: theme.palette.text.primary,
	} )
} ) );

const SliderValueLabel = styled( 'div', { name: 'Slider', slot: 'ValueLabel' } )<SliderStyled>( ( { theme, ownerState } ) => ( {
	background: theme.palette.grey[ 900 ],
	color: theme.palette.grey[ 50 ],
	position: 'absolute',
	top: -6,
	transform: 'translate(-50%, -100%)',
	padding: `4px 8px`,
	borderRadius: 4,
	lineHeight: 1.4,
	fontSize: `.9em`,
	transition: 'left .1s cubic-bezier(.4,0,.2,1)',
	...( ownerState.size === 'sm' && {
		fontSize: `.8em`,
		top: -8,
	} ),
	...( !ownerState.isFocused && {
		display: 'none'
	} ),
	...( ownerState.isDragging && {
		transition: 'none'
	} )
} ) );

const SliderThumb = styled( 'div', { name: 'Slider', slot: 'Thumb' } )<SliderStyled>( ( { theme, ownerState } ) => ( {
	background: theme.palette[ ownerState.color ].main,
	borderRadius: '50%',
	position: 'absolute',
	transition: 'left .1s cubic-bezier(.4,0,.2,1), box-shadow .2s ease-in-out',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: `${ getSizing( ownerState.size ) * 2 + 8 }px`,
	width: '1em',
	height: '1em',
	top: '50%',
	left: 0,
	transform: 'translate(-50%, -50%)',
	boxShadow: `0 0 0 0 ${ alpha( theme.palette[ ownerState.color ].main, 0 ) }`,
	...( ownerState.isFocused && {
		boxShadow: `0 0 0 ${ getSizing( ownerState.size ) + 2 }px ${ alpha( theme.palette[ ownerState.color ].main, .2 ) }`
	} ),
	...( ownerState.isDragging && {
		transition: 'none'
	} )
} ) );

function clamp( value: number, min: number, max: number ) {
	if ( value == null ) {
		return min;
	}
	return Math.min( Math.max( min, value ), max );
}

function valueToPercentage( value: number, min: number, max: number ) {
	return ( ( value - min ) * 100 ) / ( max - min );
}

function percentageToValue( percent: number, min: number, max: number ) {
	return ( max - min ) * percent + min;
}

function getDecimalPrecision( num: number ) {
	if ( Math.abs( num ) < 1 ) {
		const parts = num.toExponential().split( 'e-' );
		const matissaDecimalPart = parts[ 0 ].split( '.' )[ 1 ];
		return ( matissaDecimalPart ? matissaDecimalPart.length : 0 ) + parseInt( parts[ 1 ], 10 );
	}

	const decimalPart = num.toString().split( '.' )[ 1 ];
	return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep( value: number, step: number, min: number ) {
	const nearest = Math.round( ( value - min ) / step ) * step + min;
	return Number( nearest.toFixed( getDecimalPrecision( step ) ) );
}

type Position = { x: number, y: number };

/**
 * A slider is an input where the user selects a value from within a given range.
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>( function Slider(
	{
		color = 'primary',
		disabled = false,
		onChange,
		className,
		name,
		size = 'md',
		defaultValue,
		min = 0,
		max = 100,
		step = 1,
		value: valueProp,
		marks = false,
		sx,
		onMouseDown,
		onFocus,
		onBlur,
		onKeyDown,
		...other
	},
	ref
) {
	const [ value, setValue ] = useControlledState( valueProp, defaultValue ?? 0 );
	const percentage = valueToPercentage( value, min, max );
	const document = useDocument();
	const rootRef = useRef<HTMLDivElement>();
	const relatedLabelFocusRef = useRelatedLabelFocus();
	const mainRef = useMergedRefs( rootRef, relatedLabelFocusRef, ref );
	const [ isDragging, setIsDragging ] = useState( false );
	const [ isFocused, setIsFocused ] = useState( false );
	const theMarks = ( marks === true && step > 0
		? [ ...Array( Math.floor( ( max - min ) / step ) + 1 ) ].map( ( _, index ) => ( {
			value: min + step * index,
		} ) )
		: ( Array.isArray( marks ) ? marks : [] ) ) as SliderMark[];

	const hasMarkLabels = theMarks.findIndex( _ => typeof _.label !== 'undefined' ) !== -1;

	const getValueFromPosition = useCallback( ( position: Position ) => {
		const { current: slider } = rootRef;
		const { width, left } = slider!.getBoundingClientRect();
		const percentage = ( position.x - left ) / width;
		let newValue = percentageToValue( percentage, min, max );

		if ( step ) {
			newValue = roundValueToStep( newValue, step, min );
		}

		newValue = clamp( newValue, min, max );

		return newValue;
	}, [ rootRef, min, max, step ] );

	const handleMouseMove = ( event: MouseEvent ) => {
		if ( !disabled ) {
			const newValue = getValueFromPosition( { x: event.clientX, y: event.clientY } );

			setValue( newValue );

			setIsDragging( true );
		}
	}

	const handleMouseUp = ( event: MouseEvent ) => {
		if ( !disabled ) {
			const newValue = getValueFromPosition( { x: event.clientX, y: event.clientY } );

			setValue( newValue );
			setIsDragging( false );

			document.removeEventListener( 'mousemove', handleMouseMove );
			document.removeEventListener( 'mouseup', handleMouseUp );
		}
	}

	const handleMouseDown = ( event: React.MouseEvent<HTMLDivElement> ) => {
		if ( !disabled ) {
			const newValue = getValueFromPosition( { x: event.clientX, y: event.clientY } );

			setValue( newValue );
			document.addEventListener( 'mousemove', handleMouseMove );
			document.addEventListener( 'mouseup', handleMouseUp );
		}

		onMouseDown?.( event );
	}

	const handleFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( true );
		onFocus?.( e );
	};

	const handleBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( false );
		onBlur?.( e );
	};

	const handleKeydown = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
		onKeyDown?.( event );
		if ( event.target !== rootRef.current || disabled ) {
			return;
		}
		switch ( event.key ) {
			case 'Down':
			case 'ArrowDown':
			case 'Left':
			case 'ArrowLeft':
				setValue( _ => clamp( _ - step, min, max ) );
				event.preventDefault();
				break;
			case 'Up':
			case 'ArrowUp':
			case 'Right':
			case 'ArrowRight':
				setValue( _ => clamp( _ + step, min, max ) );
				event.preventDefault();
				break;
			case 'Home':
				setValue( min );
				event.preventDefault();
				break;
			case 'End':
				setValue( max );
				event.preventDefault();
				break;
		}
	};

	const ownerState: SliderOwnerState = {
		disabled,
		color,
		size,
		isDragging,
		isFocused,
		hasMarkLabels
	};
	const classes = useComponentClasses( ownerState );

	return (
		<SliderRoot
			{ ...other }
			className={ classNames( className, classes.root ) }
			ownerState={ ownerState }
			onMouseDown={ handleMouseDown }
			onFocus={ handleFocus }
			onBlur={ handleBlur }
			onKeyDown={ handleKeydown }
			sx={ sx }
			ref={ mainRef }
			tabIndex={ 0 }
			role='slider'
			aria-valuenow={ value }
			aria-valuemin={ min }
			aria-valuemax={ max }
			aria-disabled={ disabled }
		>
			<input
				className={ classes.field }
				type="hidden"
				name={ name }
				value={ value }
				disabled={ disabled }
			/>

			<SliderTrack ownerState={ ownerState }>
				<SliderFilledTrack sx={ { width: `${ percentage }%` } } ownerState={ ownerState }/>
			</SliderTrack>

			<Popover anchorRef={ rootRef.current } forceMinWidth position='top left'>
				<SliderValueLabel sx={ { left: `${ percentage }%` } } ownerState={ ownerState }>{ value }</SliderValueLabel>
			</Popover>

			{ theMarks.map( mark => {
					const { value: markValue, label: markLabel } = mark;
					const markPercentage = valueToPercentage( markValue, min, max );
					const isActive = markValue <= value;

					return <Fragment key={ `mark-${ markValue }` }>
						<SliderMark
							sx={ { left: `${ markPercentage }%` } }
							active={ isActive }
							ownerState={ ownerState }
						/>
						{ typeof markLabel !== 'undefined' && <SliderMarkLabel
							sx={ { left: `${ markPercentage }%` } }
							active={ isActive }
							ownerState={ ownerState }
						>{ markLabel }</SliderMarkLabel> }
					</Fragment>
				}
			) }

			<SliderThumb sx={ { left: `${ percentage }%` } } ownerState={ ownerState }/>
		</SliderRoot>
	);
} );

export default Slider;
