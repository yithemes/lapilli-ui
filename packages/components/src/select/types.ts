import type React from "react";
import type { FieldSize } from "@yith/styles";

export type SelectOption = {
	value: string
	label: string
	disabled?: boolean
}

export type SelectRenderOptionArgs = {
	id: string
	option: SelectOption
	isSelected: boolean
	isDisabled: boolean
	label: string
	onSelect: () => void
};

type SingleSelectOwnProps = {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: false
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
	options: SelectOption[]
	/**
	 * The placeholder.
	 */
	placeholder?: string
	/**
	 * Function to retrieve the option value.
	 */
	getOptionValue?: ( option: SelectOption ) => string
	/**
	 * Function to retrieve the option label.
	 */
	getOptionLabel?: ( option: SelectOption ) => string
	/**
	 * Function to render the option.
	 */
	renderOption?: ( args: SelectRenderOptionArgs ) => React.ReactNode
	/**
	 * Function to render the option content.
	 */
	renderOptionContent?: ( args: SelectRenderOptionArgs ) => React.ReactNode
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

export type SelectOwnerState = {
	width: React.CSSProperties[ 'width' ]
}

export type SelectStyled = {
	ownerState: SelectOwnerState
}

export type SelectToggleProps = {
	isEmpty: boolean
	allowClear: boolean
	isOpen: boolean
	label: string
	placeholder: string
	onToggle: () => void
	onClear: () => void
}

export type SelectToggleOwnerState = {
	isOpen: boolean
	isEmpty: boolean
	isFocused: boolean
	size: FieldSize
}

export type SelectToggleStyled = {
	ownerState: SelectToggleOwnerState
}

type SelectOptionOwnProps = {
	isSelected: boolean
	isDisabled: boolean
}
type SelectOptionPropsWithRef = Omit<React.ComponentProps<'div'>, keyof SelectOptionOwnProps> & SelectOptionOwnProps
export type SelectOptionProps = Omit<SelectOptionPropsWithRef, 'ref'>
export type SelectOptionOwnerState = Pick<SelectOptionOwnProps, 'isSelected' | 'isDisabled'>
export type SelectOptionStyled = {
	ownerState: SelectOptionOwnerState;
};