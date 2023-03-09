import { PaletteClass, styled, SxProps } from '@yith/styles';
import { noop } from 'lodash';
import React from 'react';
import Stack from '../stack';
import { useControlledState } from '../utils';

type RadioGroupOption = {
	value: string;
	label: React.ReactNode;
	description?: React.ReactNode;
	color?: PaletteClass;
};

type RadioGroupProps = {
	/**
	 * The value of the radio group (if controlled).
	 */
	value?: string;
	/**
	 * The HTML name for the radio fields.
	 */
	name?: string;
	/**
	 * Triggered when the value changes (if controlled).
	 */
	onChange?: ( event: React.ChangeEvent<HTMLInputElement>, value: string ) => void;
	/**
	 * The options to be shown.
	 */
	options?: RadioGroupOption[];
	/**
	 * The color of the radio options.
	 */
	color?: PaletteClass;
	/**
	 * Sx props.
	 */
	sx?: SxProps;
};

type RadioGroupOptionOwnerState = {
	isChecked: boolean;
	color: PaletteClass;
};

type StyledRadioGroupOptionProps = { ownerState: RadioGroupOptionOwnerState };

const RadioGroupRoot = styled( Stack, { name: 'RadioGroup', slot: 'Root' } )( ( { theme } ) => ( {
	fontSize: theme.fields.fontSize,
	lineHeight: 1.5
} ) );

const RadioGroupItem = styled( 'label', { name: 'RadioGroup', slot: 'Item' } )`
	display: flex;
	align-items: baseline;
`;

const RadioGroupRadioShape = styled( 'div', { name: 'RadioGroup', slot: 'RadioShape' } )<StyledRadioGroupOptionProps>(
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
			border: `2px solid ${theme.palette[ ownerState.color ].main}`,
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

const RadioGroupRadio = styled( 'input', { name: 'RadioGroup', slot: 'Radio' } )<StyledRadioGroupOptionProps>`
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
	
	.yith-plugin-ui &[type="radio"]:checked, .yith-plugin-ui &[type="radio"]:not(:checked){
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
		value: valueProp,
		color: groupColor = 'primary',
		onChange = noop,
		name,
		...other
	}: RadioGroupProps
) => {
	const [ value, setValue ] = useControlledState( valueProp, options[ 0 ].value ?? '' );

	return (
		<RadioGroupRoot direction="column" spacing={ 1 } { ...other }>
			{ options.map( option => {
				const { value: optionValue, label, description, color } = option;
				const isChecked = optionValue === value;
				const ownerState: RadioGroupOptionOwnerState = { isChecked, color: color ?? groupColor };
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
