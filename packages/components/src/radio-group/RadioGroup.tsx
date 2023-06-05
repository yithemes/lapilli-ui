import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { noop, debounce } from 'lodash';
import { styled } from '@yith/styles';

import Stack from '../stack';
import { useControlledState } from '../utils';
import type { RadioGroupOwnerState, RadioGroupProps, RadioGroupStyled } from "./types";
import { RadioGroupProvider } from "./context";
import RadioGroupOption from "./slots/RadioGroupOption";
import RadioGroupOptionDefaultContent from "./slots/RadioGroupOptionDefaultContent";

const RadioGroupRoot = styled( Stack, { name: 'RadioGroup', slot: 'Root' } )<RadioGroupStyled>( ( { theme, ownerState } ) => ( {
	position: 'relative',
	display: 'inline-flex',
	fontSize: theme.fields.fontSize,
	lineHeight: 1.5,
	...( ownerState.variant === 'compact' && {
		background: theme.fields.background,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		padding: '3px',
		borderRadius: theme.fields.borderRadius,
		...( ownerState.isFocused && {
			borderColor: theme.fields.focusedBorderColor,
			boxShadow: theme.fields.focusedBoxShadow
		} )
	} ),
} ) );

const RadioGroupOptionHighlight = styled( 'div', { name: 'RadioGroup', slot: 'OptionHighlight' } )<RadioGroupStyled>( ( { theme, ownerState } ) => ( {
	position: 'absolute',
	borderRadius: `calc(${ theme.fields.borderRadius } - 3px)`,
	background: theme.palette[ ownerState.color ].main,
	zIndex: 0,
	top: 0,
	left: 0,
	transitionProperty: 'top, left, width, height',
	transitionDuration: '0.2s',
	transitionTimingFunction: 'ease-in-out'
} ) );

const RadioGroup = (
	{
		options = [],
		variant = 'radio',
		value: valueProp,
		color = 'primary',
		onChange = noop,
		spacing: spacingProp,
		name,
		direction = 'column',
		size = 'md',
		...other
	}: RadioGroupProps
) => {
	const [ value, setValue ] = useControlledState( valueProp, options[ 0 ].value ?? '' );
	const rootRef = useRef<HTMLDivElement>( null );
	const highlightRef = useRef<HTMLDivElement>( null );
	const blurTimeout = useRef<ReturnType<typeof setTimeout>>();
	const [ isFocused, setIsFocused ] = useState( false );

	const updateHighlightPosition = useCallback( () => {
		if ( variant === 'compact' && rootRef.current && highlightRef.current ) {
			const checkedRadio = rootRef.current.querySelector( 'input[type=radio]:checked' );
			const checkedOption = checkedRadio?.closest( 'label' );

			if ( checkedOption ) {
				highlightRef.current.style.top = checkedOption.offsetTop + 'px';
				highlightRef.current.style.left = checkedOption.offsetLeft + 'px';
				highlightRef.current.style.width = checkedOption.clientWidth + 'px';
				highlightRef.current.style.height = checkedOption.clientHeight + 'px';
			} else {
				highlightRef.current.style.top = '0';
				highlightRef.current.style.left = '0';
				highlightRef.current.style.width = '0';
				highlightRef.current.style.height = '0';
			}
		}
	}, [ value, variant ] );

	const debouncedUpdateHighlighPosition = debounce( updateHighlightPosition, 150 );

	useEffect( updateHighlightPosition, [ value, options, spacingProp, direction, size, variant ] );

	useEffect( () => {
		blurTimeout.current && clearTimeout( blurTimeout.current );
	}, [] );

	useEffect( () => {
		let resizeObserver: ResizeObserver;
		window.addEventListener( 'resize', debouncedUpdateHighlighPosition );

		if ( typeof ResizeObserver !== 'undefined' && rootRef.current ) {
			resizeObserver = new ResizeObserver( debouncedUpdateHighlighPosition );
			resizeObserver.observe( rootRef.current );
		}

		return () => {
			window.removeEventListener( 'resize', debouncedUpdateHighlighPosition );
			if ( resizeObserver ) {
				resizeObserver.disconnect();
			}
		};
	}, [] );

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

		if ( variant === 'compact' ) {
			return 0;
		}

		if ( direction === 'row' && variant === 'radio' ) {
			return 2;
		}
		return 1;
	}, [ spacingProp, variant, direction ] );

	const providerProps: Omit<React.ComponentProps<typeof RadioGroupProvider>, 'children'> = {
		variant,
		color,
		name,
		size
	};

	const ownerState: RadioGroupOwnerState = { variant, size, color, isFocused };

	return (
		<RadioGroupProvider { ...providerProps }>
			<RadioGroupRoot
				direction={ direction }
				spacing={ spacing }
				wrap={ variant !== 'compact' }
				align={ variant === 'compact' ? 'stretch' : undefined }
				{ ...other }
				ownerState={ ownerState }
				ref={ rootRef }
			>
				{ options.map( option => {
					const { value: optionValue, label, description } = option;
					const isChecked = optionValue === value;
					return (
						<RadioGroupOption
							key={ optionValue }
							isChecked={ isChecked }
							option={ option }
							onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) => {
								setValue( event.target.value );
								onChange( event, event.target.value );
							} }
							onFocus={ handleFocus }
							onBlur={ handleBlur }
						>
							<RadioGroupOptionDefaultContent label={ label } description={ description }/>
						</RadioGroupOption>
					);
				} ) }
				{ 'compact' === variant && <RadioGroupOptionHighlight ref={ highlightRef } ownerState={ ownerState }/> }
			</RadioGroupRoot>
		</RadioGroupProvider>
	);
};

export default RadioGroup;
