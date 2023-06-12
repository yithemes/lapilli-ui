import type { FieldSize } from "@yith/styles";

export type StaticDatePickerProps = {
	/**
	 * The class name for the root slot.
	 */
	className?: string,
	/**
	 * The id name for the field.
	 */
	id?: string,
	/**
	 * The field name.
	 */
	name?: string,
	/**
	 * The current date value.
	 */
	value?: Date | string | null,
	/**
	 * The default value. Useful when the component is not controlled.
	 */
	defaultValue?: Date | string,
	/**
	 * The function called when a new date has been selected.
	 */
	onChange?: ( date: Date | null ) => void,
	/**
	 * The format of the hidden input field.
	 */
	inputFormat?: string,
	/**
	 * The format of the shown value.
	 */
	displayFormat?: string,
	/**
	 * Minimum selectable date.
	 */
	minDate?: Date | string | null,
	/**
	 * Maximum selectable date.
	 */
	maxDate?: Date | string | null,
	/**
	 * Allows to disable specific dates.
	 */
	shouldDisableDate?: ( date: Date ) => boolean,
	/**
	 * Set to `true` to allow clearing the field.
	 */
	allowClear?: boolean
	/**
	 * Set to `true` to disable the field.
	 */
	disabled?: boolean
}

export type DatePickerProps = StaticDatePickerProps & {
	/**
	 * Set `true` to show the date-picker directly.
	 */
	isStatic?: boolean,
	/**
	 * The placeholder.
	 */
	placeholder?: string,
	/**
	 * The field size.
	 */
	size?: FieldSize;
	/**
	 * If provided, displays the adornment at the start position inside the toggle.
	 */
	startAdornment?: React.ReactNode;
}

export type DatePickerRef = {
	/**
	 * The root node element.
	 */
	node: HTMLDivElement
	/**
	 * Open/close the toggle field.
	 */
	toggle: () => void
	/**
	 * Trigger focus to the toggle field.
	 */
	focus: () => void
	/**
	 * The current value of the DatePicker.
	 */
	value: DatePickerProps['value']
}

export type PickerDayOwnerState = {
	/**
	 * Is the day selected?
	 */
	isSelected: boolean
	/**
	 * Is the day disabled?
	 */
	isDisabled: boolean
	/**
	 * Is the day outside the current month?
	 */
	isOutsideCurrentMonth: boolean
	/**
	 * Is the whole datePicker disabled?
	 */
	isDatePickerDisabled: boolean
}

type PickerDaySpecificProps = Omit<PickerDayOwnerState, 'isDatePickerDisabled'> & {
	/**
	 * The specific date.
	 */
	day: Date
	/**
	 * Callback triggered on click.
	 */
	onClick?: ( event: React.MouseEvent, day: Date ) => void
	/**
	 * Callback triggered on key down.
	 */
	onKeyDown?: ( event: React.KeyboardEvent, day: Date ) => void
	/**
	 * Callback triggered on focus.
	 */
	onFocus?: ( event: React.FocusEvent, day: Date ) => void;
	/**
	 * Callback triggered on blur.
	 */
	onBlur?: ( event: React.FocusEvent, day: Date ) => void;
	/**
	 * Callback triggered on day select.
	 */
	onDaySelect?: ( day: Date ) => void;
};

type PickerDayPropsWithRef = Omit<React.ComponentProps<'button'>, keyof PickerDaySpecificProps> & PickerDaySpecificProps;
export type PickerDayProps = Omit<PickerDayPropsWithRef, 'ref'>;

export type PickerToggleOwnerState = {
	isOpen: boolean
	text: string
	placeholder: string
	disabled: boolean
	size: FieldSize
}

type PickerToggleSpecificProps = {
	/**
	 * Is open?
	 */
	isOpen: boolean
	/**
	 * The text to be shown.
	 */
	text: string,
	/**
	 * The placeholder.
	 */
	placeholder?: string
	/**
	 * The field size.
	 */
	size: FieldSize;
	/**
	 * Should be allowed to clear the field?
	 */
	allowClear: boolean;
	/**
	 * Callback fired when clearing the field.
	 */
	onClear: () => void;
	/**
	 * If provided, displays the adornment at the start position inside the component.
	 */
	startAdornment?: React.ReactNode;
	/**
	 * Disabled flag.
	 */
	disabled?: boolean
}

type PickerTogglePropsWithRef = PickerToggleSpecificProps & Omit<React.ComponentProps<'div'>, keyof PickerToggleSpecificProps>;
export type PickerToggleProps = Omit<PickerTogglePropsWithRef, 'ref'>;
export type PickerToggleStyledProps = { ownerState: PickerToggleOwnerState };