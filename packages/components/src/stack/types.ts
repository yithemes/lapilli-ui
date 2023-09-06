import type { ResponsiveStyleValue, SxProps } from "@lapilli-ui/styles";
import type React from "react";

type StackDirection = 'row' | 'column';
export type StackAlignment = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type StackJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export type StackOwnerState = {
	/**
	 * Defines the direction of the stack.
	 */
	direction: ResponsiveStyleValue<StackDirection>;
	/**
	 * If set to true, it'll revert the direction of items shown in the stack.
	 */
	isReverse: boolean;
	/**
	 * Do you want to wrap the items in the stack?
	 */
	wrap: ResponsiveStyleValue<boolean>;
	/**
	 * Defines the spacing between the items in the stack.
	 */
	spacing: ResponsiveStyleValue<number | string>;
	/**
	 * How do you want to align the items in the stack?
	 */
	align: ResponsiveStyleValue<StackAlignment>;
	/**
	 * How do you want to justify the items in the stack?
	 */
	justify: ResponsiveStyleValue<StackJustify>;
	/**
	 * Set to true to use inline-flex display.
	 */
	inline: boolean;
};

type StackOwnProps<C extends React.ElementType> = {
	as?: C;
	children?: React.ReactNode;
	sx?: SxProps;
} & Partial<StackOwnerState>;

type StackPropsWithRef<C extends React.ElementType> = StackOwnProps<C> & Omit<React.ComponentProps<C>, keyof StackOwnProps<C>>;
export type StackProps<C extends React.ElementType> = Omit<StackPropsWithRef<C>, 'ref'>;

export type StyledStackProps = {
	ownerState: StackOwnerState
};