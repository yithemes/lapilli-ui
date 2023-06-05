import React from 'react';
import { styled } from '@yith/styles';

const RadioGroupOptionLabel = styled( 'div', { name: 'RadioGroup', slot: 'OptionLabel' } )( () => ( {} ) )
const RadioGroupOptionDescription = styled( 'div', { name: 'RadioGroup', slot: 'OptionDescription' } )( () => ( {
	fontSize: '.9em',
	marginTop: '2px'
} ) )

const RadioGroupOptionDefaultContent = (
	{
		label,
		description,
	}: { label: React.ReactNode, description?: React.ReactNode }
) => {

	return <>
		<RadioGroupOptionLabel>{ label }</RadioGroupOptionLabel>
		{ !!description && <RadioGroupOptionDescription>{ description }</RadioGroupOptionDescription> }
	</>
};

export default RadioGroupOptionDefaultContent;
