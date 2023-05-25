import type React from "react";
import type { FieldSize, SxProps } from "@yith/styles";
import type { SelectProviderProps } from "./context";

export type SelectOptionParams = {
	value: string
	label: string
	disabled?: boolean
}

type SingleSelectOwnProps = {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: false
	/**
	 * Specified the select style.
	 */
	variant?: 'outlined' | 'ghost' | 'reveal'
	/**
	 * The value.
	 */
	value?: string
	/**
	 * The field name.
	 */
	name?: string
	/**
	 * Callback triggered when the field changes its own value.
	 */
	onChange?: ( ( value: string ) => void )
	/**
	 * Callback triggered when the field is cleared.
	 */
	onClear?: () => void
	/**
	 * Callback triggered when the dropdown is closed.
	 */
	onClose?: () => void
	/**
	 * Callback triggered when searching.
	 */
	onSearch?: ( ( term: string ) => void )
	/**
	 * List of options to be shown.
	 */
	options: SelectOptionParams[]
	/**
	 * The placeholder.
	 */
	placeholder?: string
	/**
	 * Function to retrieve the option value.
	 */
	getOptionValue?: ( option: SelectOptionParams ) => string
	/**
	 * Function to retrieve the option label.
	 */
	getOptionLabel?: ( option: SelectOptionParams ) => string
	/**
	 * Function to render the option.
	 */
	renderOption?: ( props: SelectOptionProps, option: SelectOptionParams, state: SelectOptionState ) => React.ReactElement
	/**
	 * Function to render the option content.
	 */
	renderOptionContent?: ( option: SelectOptionParams, state: SelectOptionState ) => React.ReactNode
	/**
	 * Function to render the toggle content.
	 */
	renderToggleContent?: ( attrs: Pick<SelectProviderProps, 'selectedOptions' | 'deselectOption'> & { isOpen: boolean } ) => React.ReactNode
	/**
	 * Function to filter options when searching.
	 */
	filterSearch?: ( option: any, search: string ) => boolean
	/**
	 * Do you want to allow searching?
	 */
	allowSearch?: boolean
	/**
	 * Do you want to allow clear?
	 */
	allowClear?: boolean
	/**
	 * Do you want to close the dropdown after selecting an option?
	 */
	closeOnSelect?: boolean
	/**
	 * Do you want to hide selected options in suggestions' list?
	 */
	hideSelectedOptions?: boolean
	/**
	 * Is the select loading?
	 */
	isLoading?: boolean
	/**
	 * The text shown in popover when loading.
	 */
	loadingText?: string
	/**
	 * The text shown in popover when the select has no option.
	 */
	noOptionsText?: string
	/**
	 * The text shown in popover when there are no results for the searched term.
	 */
	noResultsText?: string
	/**
	 * You can set a specific width.
	 */
	width?: React.CSSProperties[ 'width' ]
	/**
	 * Do you want to show tags in the select toggle?
	 */
	showTags?: never
	/**
	 * Limit the number of tags shown in select toggle.
	 */
	limitTags?: never
	/**
	 * The field size.
	 */
	size?: FieldSize
	/**
	 * Set `true` to hide the toggle icon.
	 */
	hideToggleIcon?: boolean
	/**
	 * Theme sc props.
	 */
	sx?: SxProps
};

type MultipleSelectOwnProps = Omit<SingleSelectOwnProps, 'onChange' | 'value' | 'multiple' | 'showTags' | 'limitTags'> & {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: true
	/**
	 * The value.
	 */
	value?: string[]
	/**
	 * Callback triggered when the field changes its own value.
	 */
	onChange?: ( ( value: string[] ) => void )
	/**
	 * Do you want to show tags in the select toggle?
	 */
	showTags?: boolean
	/**
	 * Limit the number of tags shown in select toggle.
	 */
	limitTags?: number
}

export type SelectOwnProps = SingleSelectOwnProps | MultipleSelectOwnProps

type SelectPropsWithRef = Omit<React.ComponentProps<'div'>, keyof SelectOwnProps> & SelectOwnProps
export type SelectProps = Omit<SelectPropsWithRef, 'ref'>

export type SelectOwnerState = Required<Pick<SelectProps, 'width' | 'variant'>>

export type SelectStyled = {
	ownerState: SelectOwnerState
}

type SelectToggleOwnProps = {
	onClear: () => void
}

export type SelectToggleProps = Omit<React.ComponentProps<'div'>, keyof SelectToggleOwnProps> & SelectToggleOwnProps

export type SelectToggleOwnerState = {
	isOpen: boolean
	isEmpty: boolean
	isFocused: boolean
	size: FieldSize
	variant: SelectProps['variant']
}

export type SelectToggleStyled = {
	ownerState: SelectToggleOwnerState
}

export type SelectOptionState = {
	isSelected: boolean
	isDisabled: boolean
	isActiveDescendant: boolean
	label: string
	value: string
}

type SelectOptionOwnProps = Pick<SelectOptionState, 'isSelected' | 'isDisabled' | 'isActiveDescendant'>
type SelectOptionPropsWithRef = Omit<React.ComponentProps<'div'>, keyof SelectOptionOwnProps> & SelectOptionOwnProps
export type SelectOptionProps = Omit<SelectOptionPropsWithRef, 'ref'>
export type SelectOptionOwnerState = Pick<SelectOptionOwnProps, 'isSelected' | 'isDisabled' | 'isActiveDescendant'>
export type SelectOptionStyled = {
	ownerState: SelectOptionOwnerState;
};