import React from 'react';
import type { CardProps } from "./types";

export type CardProviderProps = {
	children: React.ReactNode
} & Required<Pick<CardProps, 'size'>>

type ContextValue = Omit<CardProviderProps, 'children'>

const Context = React.createContext<ContextValue>( {} as ContextValue );

export const useCard = () => {
	const cardContext = React.useContext( Context );

	const sizeMultipliers = {
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32
	};
	const sizing = ( number: number ) => number * sizeMultipliers[ cardContext.size ];

	return { ...cardContext, sizing };
};

export function CardProvider( { children, ...props }: CardProviderProps ) {
	const theContext: ContextValue = props;
	return (
		<Context.Provider value={ theContext }>
			{ children }
		</Context.Provider>
	)
}