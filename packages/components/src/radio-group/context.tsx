import React from 'react';
import type { RadioGroupProps } from "./types";

export type RadioGroupProviderProps = {
	children: React.ReactNode
} & Required<Pick<RadioGroupProps,
	'variant'
	| 'color'
	| 'size'
>> &
	Pick<RadioGroupProps, 'name'>

type ContextValue = Omit<RadioGroupProviderProps, 'children'>

const RadioGroupContext = React.createContext<ContextValue>( {} as ContextValue );

export const useRadioGroupContext = (): ContextValue => React.useContext( RadioGroupContext );

export function RadioGroupProvider( { children, ...props }: RadioGroupProviderProps ) {
	const theContext: ContextValue = props;

	return (
		<RadioGroupContext.Provider value={ theContext }>
			{ children }
		</RadioGroupContext.Provider>
	)
}