import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { noop, debounce } from 'lodash';
import { styled } from '@yith/styles';

import Stack from '../stack';
import { useControlledState } from '../utils';
import type { RadioGroupOwnerState, RadioGroupProps, RadioGroupStyled } from "./types";
import { RadioGroupProvider } from "./context";
import RadioGroupOption from "./slots/RadioGroupOption";

const RadioGroupRoot = styled( Stack, { name: 'RadioGroup', slot: 'Root' } )<RadioGroupStyled>( ( { theme, ownerState } ) => ( {
	position: 'relative',
	fontSize: theme.fields.fontSize,
	lineHeight: 1.5,
	...( ownerState.variant === 'segmented' && {
		background: 'light' === theme.mode ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: 'light' === theme.mode ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		padding: '3px',
		borderRadius: theme.fields.borderRadius,
		...( ownerState.isFocused && {
			boxShadow: '0 0 0 1px ' + theme.palette.primary.main,
		} )
	} ),
} ) );

const RadioGroupOptionHighlight = styled( 'div', { name: 'RadioGroup', slot: 'OptionHighlight' } )<RadioGroupStyled>( ( { theme } ) => ( {
	position: 'absolute',
	borderRadius: `calc(${ theme.fields.borderRadius } - 2px)`,
	background: theme.fields.background,
	zIndex: 0,
	top: 0,
	left: 0,
	transitionProperty: 'top, left, width, height',
	transitionDuration: '0.16s',
	transitionTimingFunction: 'ease-in-out',
	boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
} ) );

const RadioGroup = (
	{
		options = [],
		variant = 'radio',
		value: valueProp,
		onChange = noop,
		spacing: spacingProp,
		name,
		direction = 'column',
		size = 'md',
		fullWidth = false,
		sizing = false,
		...other
	}: RadioGroupProps
) => {
	const [ value, setValue ] = useControlledState( valueProp, options[ 0 ].value ?? '' );
	const variantRendered = useRef( false ); // Useful to disable transition on first rendering (segmented variation) to prevent glitches.
	const rootRef = useRef<HTMLDivElement>( null );
	const highlightRef = useRef<HTMLDivElement>( null );
	const blurTimeout = useRef<ReturnType<typeof setTimeout>>();
	const [ isFocused, setIsFocused ] = useState( false );

	const updateHighlightPosition = useCallback( () => {
		if ( variant === 'segmented' && rootRef.current && highlightRef.current ) {
			const checkedRadio = rootRef.current.querySelector( 'input[type=radio]:checked' );
			const checkedOption = checkedRadio?.closest( 'label' );

			if ( checkedOption ) {
				Object.assign(
					highlightRef.current.style,
					{
						top: checkedOption.offsetTop + 'px',
						left: checkedOption.offsetLeft + 'px',
						width: checkedOption.clientWidth + 'px',
						height: checkedOption.clientHeight + 'px'
					}
				);
			} else {
				Object.assign(
					highlightRef.current.style,
					{
						top: '0',
						left: '0',
						width: '0',
						height: '0'
					}
				);
			}

			if ( !variantRendered.current ) {
				highlightRef.current.style.transition = 'none';
			} else {
				highlightRef.current.style.removeProperty( 'transition' );
			}
		}
	}, [ value, variant, options ] );

	const debouncedUpdateHighlightPosition = debounce( updateHighlightPosition, 150 );

	useEffect( updateHighlightPosition, [ value, options, spacingProp, direction, size, variant, fullWidth, other ] );

	useEffect( () => {
		let resizeObserver: ResizeObserver;
		window.addEventListener( 'resize', debouncedUpdateHighlightPosition );

		if ( typeof ResizeObserver !== 'undefined' && rootRef.current ) {
			resizeObserver = new ResizeObserver( debouncedUpdateHighlightPosition );
			resizeObserver.observe( rootRef.current );
		}

		return () => {
			window.removeEventListener( 'resize', debouncedUpdateHighlightPosition );
			if ( resizeObserver ) {
				resizeObserver.disconnect();
			}
		};
	}, [] );

	useEffect( () => {
		blurTimeout.current && clearTimeout( blurTimeout.current );
	}, [] );

	useEffect( () => {
		variantRendered.current = true;
		return () => {
			variantRendered.current = false
		}
	}, [ variant ] );

	const handleFocus = () => {
		setIsFocused( true );
		blurTimeout.current && clearTimeout( blurTimeout.current );
	};
	const handleBlur = () => {
		blurTimeout.current && clearTimeout( blurTimeout.current );
		blurTimeout.current = setTimeout( () => setIsFocused( false ), 150 );
	};

	const spacing = useMemo( () => {
		if ( typeof spacingProp !== 'undefined' ) {
			return spacingProp;
		}

		if ( variant === 'segmented' ) {
			return 0;
		}

		if ( direction === 'row' && variant === 'radio' ) {
			return 2;
		}
		return 1;
	}, [ spacingProp, variant, direction ] );

	const providerProps: Omit<React.ComponentProps<typeof RadioGroupProvider>, 'children'> = {
		variant,
		name,
		size,
		sizing
	};

	const ownerState: RadioGroupOwnerState = { variant, size, isFocused };

	return (
		<RadioGroupProvider { ...providerProps }>
			<RadioGroupRoot
				direction={ direction }
				spacing={ spacing }
				wrap={ variant !== 'segmented' }
				align={ variant === 'radio' ? 'start' : 'stretch' }
				{ ...other }
				inline={ !fullWidth }
				ownerState={ ownerState }
				ref={ rootRef }
			>
				{ options.map( option => {
					const isChecked = option.value === value;
					return (
						<RadioGroupOption
							key={ option.value }
							isChecked={ isChecked }
							option={ option }
							onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) => {
								setValue( event.target.value );
								onChange( event, event.target.value );
							} }
							onFocus={ handleFocus }
							onBlur={ handleBlur }
						/>
					);
				} ) }
				{ 'segmented' === variant && <RadioGroupOptionHighlight ref={ highlightRef } ownerState={ ownerState }/> }
			</RadioGroupRoot>
		</RadioGroupProvider>
	);
};

export default RadioGroup;
