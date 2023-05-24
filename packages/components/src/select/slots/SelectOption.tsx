import { alpha, generateComponentClasses, mergeComponentClasses, styled } from "@yith/styles";
import React, { useEffect, useRef } from "react";
import type { SelectOptionOwnerState, SelectOptionProps, SelectOptionStyled } from "../types";
import { selectClasses } from "../classes";

const useComponentClasses = ( ownerState: SelectOptionOwnerState ) => {
	const stateClasses = generateComponentClasses(
		'Select',
		{
			option: [ ownerState.isSelected && 'selected', ownerState.isDisabled && 'disabled', ownerState.isActiveDescendant && 'active' ],
		}
	);

	return mergeComponentClasses( selectClasses, stateClasses );
}

const SelectOptionRoot = styled( 'div', { name: 'Select', slot: 'Option' } )<SelectOptionStyled>( ( { theme, ownerState } ) => ( {
	padding: theme.fields.padding.md,
	color: theme.fields.color,
	lineHeight: 1.5,
	cursor: 'pointer',
	userSelect: 'none',
	outline: 'none',
	...( !ownerState.isDisabled && {
		'&:hover': {
			background: alpha( theme.palette.primary.main ?? '', theme.palette.action.hoverOpacity ),
			color: theme.palette.primary.main,
		},
	} ),
	...( ownerState.isSelected && !ownerState.isDisabled && {
		background: alpha( theme.palette.primary.main ?? '', theme.palette.action.selectedOpacity ),
		color: theme.palette.primary.main,

		...( ownerState.isActiveDescendant && {
			background: alpha(
				theme.palette.primary.main ?? '',
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		} ),

		'&:hover': {
			background: alpha(
				theme.palette.primary.main ?? '',
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		},
	} ),
	...( ownerState.isDisabled && {
		opacity: theme.palette.action.disabledOpacity,
		color: alpha( theme.palette.action.disabled!, 1 ),
		cursor: 'default',
	} ),
	...( ownerState.isActiveDescendant && !ownerState.isSelected && {
		background: alpha( theme.palette.primary.main ?? '', theme.palette.action.hoverOpacity ),
	} ),
} ) );

const SelectOption = ( props: SelectOptionProps ) => {
	const { children, isSelected, isDisabled, isActiveDescendant, ...other } = props;
	const optionRef = useRef<HTMLDivElement>( null );

	useEffect( () => {
		if ( isSelected && !isDisabled && optionRef.current ) {
			// TODO: do not focus the option! Instead, use 'aria-activedescendant' and scroll the list down to the first selected option.
			optionRef.current.focus();
		}
	}, [] );

	const ownerState: SelectOptionOwnerState = { isSelected, isDisabled, isActiveDescendant };
	const classes = useComponentClasses( ownerState );

	return (
		<SelectOptionRoot { ...other } className={ classes.option } ownerState={ ownerState } ref={ optionRef } role="option" tabIndex={ -1 } aria-selected={ isSelected }>
			{ children }
		</SelectOptionRoot>
	);
};
export default SelectOption;