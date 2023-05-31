import React from 'react';
import { noop } from 'lodash';
import { styled } from '@yith/styles';

import Stack from '../stack';
import { useControlledState } from '../utils';
import type { RadioGroupItemOwnerState, RadioGroupItemStyled, RadioGroupProps } from "./types";

const RadioGroupRoot = styled( Stack, { name: 'RadioGroup', slot: 'Root' } )( ( { theme } ) => ( {
	fontSize: theme.fields.fontSize,
	lineHeight: 1.5
} ) );

const RadioGroupItem = styled( 'label', { name: 'RadioGroup', slot: 'Item' } )`
	display: flex;
	align-items: baseline;
`;

const RadioGroupRadioShape = styled( 'div', { name: 'RadioGroup', slot: 'RadioShape' } )<RadioGroupItemStyled>(
	( { ownerState, theme } ) => ( {
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
			opacity: 0
		},
		...( ownerState.isChecked && {
			background: theme.palette[ ownerState.color ].main,
			borderColor: '#0000'
		} )
	} )
);

const RadioGroupRadio = styled( 'input', { name: 'RadioGroup', slot: 'Radio' } )<RadioGroupItemStyled>`
	display: block !important;
	opacity: 0 !important;
	position: absolute !important;
	margin-top: 5px !important;
	width: 20px !important;
	height: 20px !important;

	&:focus, &:focus-visible {
		& + ${ RadioGroupRadioShape }:before {
			opacity: 1;
		}
	}

	&[type="radio"]:checked:checked, &[type="radio"]:not(:checked):not(:checked) {
		display: block !important;
	}
`;

const RadioGroupRadioContent = styled( 'div', { name: 'RadioGroup', slot: 'RadioContent' } )`
	cursor: pointer;
`;

const RadioGroupRadioLabel = styled( 'div', { name: 'RadioGroup', slot: 'RadioLabel' } )`
	font-size: inherit;
`;
const RadioGroupRadioDescription = styled( 'div', { name: 'RadioGroup', slot: 'RadioDescription' } )`
	font-size: 0.9em;
`;

const RadioGroup = (
	{
		options = [],
		variant = 'radio',
		value: valueProp,
		color: groupColor = 'primary',
		onChange = noop,
		spacing,
		name,
		...other
	}: RadioGroupProps
) => {
	const [ value, setValue ] = useControlledState( valueProp, options[ 0 ].value ?? '' );

	return (
		<RadioGroupRoot direction='column' spacing={ spacing ?? ( variant !== 'pill' ? 1 : 0 ) } wrap { ...other }>
			{ options.map( option => {
				const { value: optionValue, label, description, color } = option;
				const isChecked = optionValue === value;
				const ownerState: RadioGroupItemOwnerState = { isChecked, color: color ?? groupColor };
				return (
					<RadioGroupItem key={ optionValue }>
						<RadioGroupRadio
							type="radio"
							name={ name }
							checked={ isChecked }
							value={ optionValue }
							onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) => {
								setValue( event.target.value );
								onChange( event, event.target.value );
							} }
							ownerState={ ownerState }
						/>
						<RadioGroupRadioShape ownerState={ ownerState }/>
						<RadioGroupRadioContent>
							<RadioGroupRadioLabel>{ label }</RadioGroupRadioLabel>
							{ !!description && <RadioGroupRadioDescription>{ description }</RadioGroupRadioDescription> }
						</RadioGroupRadioContent>
					</RadioGroupItem>
				);
			} ) }
		</RadioGroupRoot>
	);
};

export default RadioGroup;
