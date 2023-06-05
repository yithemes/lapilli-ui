import React, { useState } from 'react';
import { alpha, styled } from '@yith/styles';
import { CheckIcon } from "@heroicons/react/20/solid";

import type { RadioGroupOptionOwnerState, RadioGroupOptionProps, RadioGroupOptionStyled } from "../types";
import { useRadioGroupContext } from "../context";

const RadioGroupOptionRoot = styled( 'label', { name: 'RadioGroup', slot: 'Option' } )<RadioGroupOptionStyled>( ( { theme, ownerState } ) => ( {
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'baseline',
	cursor: 'pointer',
	...( ownerState.variant !== 'radio' && {
		flexDirection: 'column',
		justifyContent: 'center',
		userSelect: 'none',
	} ),
	...( ownerState.variant === 'boxed' && {
		background: theme.fields.background,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		borderRadius: theme.fields.borderRadius,
		padding: theme.fields.padding[ ownerState.size ],
		...( ownerState.isChecked && {
			borderColor: theme.palette[ ownerState.color ].main,
		} ),
		...( ownerState.isFocused && {
			boxShadow: '0 0 0 3px ' + alpha( theme.palette[ ownerState.color ].main ?? '#ffffff', 0.15 ),
		} ),
	} ),
	...( ownerState.variant === 'compact' && {
		padding: theme.fields.padding[ ownerState.size ],
		zIndex: 1
	} )
} ) );

const RadioGroupOptionRadioShape = styled( 'div', { name: 'RadioGroup', slot: 'OptionRadioShape' } )<RadioGroupOptionStyled>( ( { ownerState, theme } ) => ( {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flex: '0 0 16px',
	borderRadius: '50%',
	width: '16px',
	height: '16px',
	border: `1px solid ${ theme.fields.borderColor }`,
	transform: 'translateY( 3px )',
	marginRight: '8px',
	boxSizing: 'border-box',
	'&:after': {
		content: '""',
		position: 'absolute',
		borderRadius: 'inherit',
		background: theme.palette[ ownerState.color ].contrastText,
		width: ownerState.isChecked ? 6 : 0,
		height: ownerState.isChecked ? 6 : 0,
		opacity: ownerState.isChecked ? 1 : 0,
		transition: 'all .2s ease',
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		borderRadius: 'inherit',
		border: `2px solid ${ theme.palette[ ownerState.color ].main }`,
		width: 20,
		height: 20,
		boxSizing: 'content-box',
		transition: 'all .2s ease',
		opacity: 0,
		...( ownerState.isFocused && {
			opacity: 1
		} )
	},
	...( ownerState.isChecked && {
		background: theme.palette[ ownerState.color ].main,
		borderColor: '#0000'
	} )
} ) );
const RadioGroupOptionSelectedIcon = styled( 'div', { name: 'RadioGroup', slot: 'OptionSelectedIcon' } )<RadioGroupOptionStyled>( ( { ownerState, theme } ) => ( {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '16px',
	height: '16px',
	borderRadius: '50%',
	background: theme.palette[ ownerState.color ].main,
	color: theme.palette[ ownerState.color ].contrastText,
	fontSize: '10px',
	transform: 'translate(4px, -4px)',
	'& > svg': {
		width: '1em',
		strokeWidth: 2,
		stroke: 'currentColor'
	}
} ) );

const RadioGroupOptionRadio = styled( 'input', { name: 'RadioGroup', slot: 'OptionRadio' } )<RadioGroupOptionStyled>`
	display: block !important;
	opacity: 0 !important;
	position: absolute !important;
	z-index: -1;

	&[type="radio"]:checked:checked, &[type="radio"]:not(:checked):not(:checked) {
		display: block !important;
	}
`;

const RadioGroupOptionContent = styled( 'div', { name: 'RadioGroup', slot: 'OptionContent' } )<RadioGroupOptionStyled>( ( { theme, ownerState } ) => ( {
	lineHeight: 1.5,
	fontSize: theme.fields.fontSize,
	color: theme.fields.color,
	margin: '-3px 0',
	transition: 'color 0.2s ease-in-out',
	...( ownerState.variant === 'compact' && {
		width: '100%',
		textAlign: 'center',
		...( ownerState.isChecked && {
			color: theme.palette[ ownerState.color ].contrastText,
		} )
	} )
} ) );

const RadioGroupOption = (
	{
		option,
		isChecked,
		children,
		onChange,
		onFocus,
		onBlur,
	}: RadioGroupOptionProps
) => {
	const [ isFocused, setIsFocused ] = useState( false );
	const { color: groupColor, name, variant, size } = useRadioGroupContext();
	const { value, color } = option;

	const handleFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( true );
		onFocus?.( e );
	};
	const handleBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
		setIsFocused( false );
		onBlur?.( e );
	};

	const ownerState: RadioGroupOptionOwnerState = {
		isChecked,
		isFocused,
		color: color ?? groupColor,
		variant,
		size
	}

	return (
		<RadioGroupOptionRoot ownerState={ ownerState }>
			<RadioGroupOptionRadio
				type="radio"
				name={ name }
				checked={ isChecked }
				value={ value }
				onChange={ onChange }
				ownerState={ ownerState }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
			/>
			{ 'radio' === variant && <RadioGroupOptionRadioShape ownerState={ ownerState }/> }
			{ 'boxed' === variant && isChecked && <RadioGroupOptionSelectedIcon ownerState={ ownerState }><CheckIcon/></RadioGroupOptionSelectedIcon> }
			<RadioGroupOptionContent ownerState={ ownerState }>
				{ children }
			</RadioGroupOptionContent>
		</RadioGroupOptionRoot>
	);
};

export default RadioGroupOption;
