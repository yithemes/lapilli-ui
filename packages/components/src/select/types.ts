import type React from "react";
import type { FieldSize, SxProps } from "@yith/styles";
import type { SelectProviderProps } from "./context";
import type { selectClasses } from "./classes";

export type SelectOptionParams = {
	value: string
	label: string
	disabled?: boolean
	className?: string
}

export type SelectClasses = typeof selectClasses;

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
	 * CSS classes to add custom classes to each slot of the component.
	 */
	classes?: Partial<SelectClasses>
	/**
	 * The value.
	 */
	value?: string
	/**
	 * The default value.
	 */
	defaultValue?: string
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
	 * The text shown as placeholder in the search field.
	 */
	searchPlaceholder?: string
	/**
	 * Set to `true` to make the field fits width to its parent's width.
	 */
	fullWidth?: boolean
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
	 * If `true`, the field will be disabled.
	 */
	disabled?: boolean;
	/**
	 * Theme sc props.
	 */
	sx?: SxProps
};

type MultipleSelectOwnProps = Omit<SingleSelectOwnProps, 'onChange' | 'value' | 'defaultValue' | 'multiple' | 'showTags' | 'limitTags'> & {
	/**
	 * Whether the select is multiple or not.
	 */
	multiple?: true
	/**
	 * The value.
	 */
	value?: string[]
	/**
	 * The default value.
	 */
	defaultValue?: string[]
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

export type SelectOwnerState = Required<Pick<SelectProps, 'fullWidth' | 'variant' | 'classes'>>

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
	disabled: boolean
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