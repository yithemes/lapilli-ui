import React from 'react';
import type { RadioGroupProps } from "./types";

export type RadioGroupProviderProps = {
	children: React.ReactNode
} & Required<Pick<RadioGroupProps,
	'variant'
	| 'size'
	| 'sizing'
>> &
	Pick<RadioGroupProps, 'name'>

export type RadioGroupContextValue = Omit<RadioGroupProviderProps, 'children'>

const RadioGroupContext = React.createContext<RadioGroupContextValue>( {} as RadioGroupContextValue );

export const useRadioGroupContext = (): RadioGroupContextValue => React.useContext( RadioGroupContext );

export function RadioGroupProvider( { children, ...props }: RadioGroupProviderProps ) {
	const theContext: RadioGroupContextValue = props;

	return (
		<RadioGroupContext.Provider value={ theContext }>
			{ children }
		</RadioGroupContext.Provider>
	)
}