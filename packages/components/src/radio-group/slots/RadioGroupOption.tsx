import React, { useState } from 'react';
import { noop } from "lodash";
import { CheckIcon } from "@heroicons/react/20/solid";
import { alpha, generateComponentClasses, mergeComponentClasses, styled } from '@yith/styles';

import { useRadioGroupContext } from "../context";
import type { RadioGroupClasses, RadioGroupOptionOwnerState, RadioGroupOptionProps, RadioGroupOptionStyled } from "../types";

const useComponentClasses = ( ownerState: RadioGroupOptionOwnerState ): RadioGroupClasses => {
	const { classes } = useRadioGroupContext();
	const stateClasses = generateComponentClasses(
		'RadioGroup',
		{
			option: [
				ownerState.isChecked && 'checked',
				ownerState.isDisabled && 'disabled',
				ownerState.isFocused && 'focused',
			],
		}
	);

	return mergeComponentClasses( classes, stateClasses );
}

const RadioGroupOptionRoot = styled( 'label', { name: 'RadioGroup', slot: 'Option' } )<RadioGroupOptionStyled>( ( { theme, ownerState } ) => ( {
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'baseline',
	cursor: 'pointer',
	...( ownerState.groupContext.variant !== 'radio' && {
		flexDirection: 'column',
		justifyContent: 'center',
		userSelect: 'none',
	} ),
	...( ownerState.groupContext.variant === 'boxed' && {
		background: theme.fields.background,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: theme.fields.borderColor,
		borderRadius: theme.fields.borderRadius,
		padding: theme.fields.padding[ ownerState.groupContext.size ],
		...( ownerState.isChecked && {
			borderColor: theme.palette.primary.main,
		} ),
		...( ownerState.isFocused && {
			boxShadow: '0 0 0 3px ' + alpha( theme.palette.primary.main ?? '#ffffff', 0.15 ),
		} ),
	} ),
	...( ownerState.groupContext.variant === 'segmented' && {
		padding: theme.fields.padding[ ownerState.groupContext.size ],
		zIndex: 1
	} ),
	...( ownerState.groupContext.sizing === 'adaptive' && {
		flex: 'auto',
	} ),
	...( ownerState.groupContext.sizing === 'equal' && {
		flex: 1,
		minWidth: 0
	} ),
	...( ownerState.isDisabled && {
		cursor: 'not-allowed'
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
	margin: '4px 8px 4px 4px',
	boxSizing: 'border-box',
	'&:after': {
		content: '""',
		position: 'absolute',
		borderRadius: 'inherit',
		background: theme.palette.primary.contrastText,
		width: ownerState.isChecked ? 6 : 0,
		height: ownerState.isChecked ? 6 : 0,
		opacity: ownerState.isChecked ? 1 : 0,
		transition: 'all .2s ease',
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		borderRadius: 'inherit',
		border: `2px solid ${ theme.palette.primary.main }`,
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
		background: theme.palette.primary.main,
		borderColor: '#0000'
	} ),
	...( ownerState.isDisabled && {
		opacity: theme.palette.action.disabledOpacity
	} )
} ) );
const RadioGroupOptionSelectedIcon = styled( 'div', { name: 'RadioGroup', slot: 'OptionSelectedIcon' } )<RadioGroupOptionStyled>( ( { theme } ) => ( {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '16px',
	height: '16px',
	borderRadius: '50%',
	background: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
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
	inset-block-start: 0;
	inset-inline-start: 0;
	width: 0;
	height: 0;
	pointer-events: none;
	z-index: -1;

	&[type="radio"]:checked:checked, &[type="radio"]:not(:checked):not(:checked) {
		display: block !important;
	}
`;
const RadioGroupOptionContent = styled( 'div', { name: 'RadioGroup', slot: 'OptionContent' } )<RadioGroupOptionStyled>( ( { theme, ownerState } ) => ( {
	lineHeight: 1.5,
	fontSize: theme.fields.fontSize,
	color: theme.fields.color,
	transition: 'color 0.2s ease-in-out',
	...( ( ownerState.groupContext.variant === 'boxed' || ownerState.groupContext.variant === 'segmented' ) && {
		...( ownerState.isChecked && {
			color: theme.palette.primary.main,
		} ),
	} ),
	...( ownerState.groupContext.variant === 'segmented' && {
		width: '100%',
		textAlign: 'center',
		margin: '-3px 0'
	} ),
	...( ownerState.isDisabled && {
		opacity: theme.palette.action.disabledOpacity,
		cursor: 'not-allowed'
	} )
} ) );
const RadioGroupOptionLabel = styled( 'div', { name: 'RadioGroup', slot: 'OptionLabel' } )<RadioGroupOptionStyled>( ( { ownerState } ) => ( {
	...( ownerState.groupContext.sizing === 'equal' && {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	} )
} ) )
const RadioGroupOptionDescription = styled( 'div', { name: 'RadioGroup', slot: 'OptionDescription' } )<RadioGroupOptionStyled>( ( { ownerState } ) => ( {
	fontSize: '.9em',
	marginTop: '2px',
	...( ownerState.groupContext.sizing === 'equal' && {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	} )
} ) )

const RadioGroupOption = (
	{
		option,
		isChecked,
		onChange,
		onFocus,
		onBlur,
	}: RadioGroupOptionProps
) => {
	const [ isFocused, setIsFocused ] = useState( false );
	const groupContext = useRadioGroupContext();
	const { name, variant, disabled: groupDisabled } = groupContext;
	const { value, label, description, disabled } = option;
	const isDisabled = groupDisabled || ( disabled ?? false );

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
		isDisabled,
		groupContext
	};

	const classes = useComponentClasses( ownerState );

	return (
		<RadioGroupOptionRoot ownerState={ ownerState } className={ classes.option }>
			<RadioGroupOptionRadio
				className={ classes.optionRadio }
				type="radio"
				name={ name }
				checked={ isChecked }
				value={ value }
				onChange={ !isDisabled ? onChange : noop }
				ownerState={ ownerState }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				disabled={ isDisabled }
			/>
			{ 'radio' === variant && <RadioGroupOptionRadioShape ownerState={ ownerState } className={ classes.optionRadioShape }/> }
			{ 'boxed' === variant && isChecked && <RadioGroupOptionSelectedIcon ownerState={ ownerState } className={ classes.optionSelectedIcon }><CheckIcon/></RadioGroupOptionSelectedIcon> }
			<RadioGroupOptionContent ownerState={ ownerState } className={ classes.optionContent }>
				<RadioGroupOptionLabel ownerState={ ownerState } className={ classes.optionLabel }>{ label }</RadioGroupOptionLabel>
				{ !!description && <RadioGroupOptionDescription ownerState={ ownerState } className={ classes.optionDescription }>{ description }</RadioGroupOptionDescription> }
			</RadioGroupOptionContent>
		</RadioGroupOptionRoot>
	);
};

export default RadioGroupOption;
