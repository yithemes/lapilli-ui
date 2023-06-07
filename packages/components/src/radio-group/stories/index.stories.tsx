import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import RadioGroup from '../';
import Stack from "../../stack";
import Switch from "../../switch/Switch";// Imported from the specific file to prevent issues with typescript docgen storybook.
import Typography from "../../typography";
import { GlobeEuropeAfricaIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

type Story = StoryObj<typeof RadioGroup>;

const createResponsiveRadioControl = ( ...options: string[] ) => {
	return {
		table: { type: { summary: 'ResponsiveStyleValue<' + options.join( ' | ' ) + '>' }, },
		control: { type: 'radio' },
		options: options,
	}
}

const OPTIONS = [
	{ value: 'public', label: 'Public', description: 'Visible to everyone.' },
	{ value: 'private', label: 'Private', description: 'Only visible to site admins and editors.' },
	{ value: 'password-protected', label: 'Password protected', description: 'Protected with a password.' },
];

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	argTypes: {
		value: {
			control: false
		},
		name: {
			table: { disable: true }
		},
		direction: createResponsiveRadioControl( 'row', 'column' ),
		align: createResponsiveRadioControl( 'start', 'end', 'center', 'baseline', 'stretch' ),
		justify: createResponsiveRadioControl( 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly' ),
		wrap: { control: { type: 'boolean' }, }
	}
};

export default meta;

export const Default: Story = {
	args: {
		variant: 'radio',
		direction: 'column',
		size: 'md',
		fullWidth: false,
		sizing: false,
		options: OPTIONS.map( _ => ( { value: _.value, label: _.label } ) )
	},
	render: ( args ) => <RadioGroup { ...args } name='visibility'/>
};

export const WithDescriptions: Story = {
	args: {
		...Default.args,
		options: OPTIONS
	},
	render: Default.render
};

export const Variants: Story = {
	args: {
		...Default.args
	},
	render: ( args ) => {
		const [ value, setValue ] = useState( OPTIONS[ 0 ].value );
		const [ descriptionShown, setDescriptionShown ] = useState( false );
		const options = descriptionShown ? OPTIONS : OPTIONS.map( _ => ( { value: _.value, label: _.label } ) )
		return <>
			<Stack spacing={ 4 }>
				<Stack spacing={ 2 } direction="row" align="center">
					<Switch id="show-description" checked={ descriptionShown } onChange={ e => setDescriptionShown( e.target.checked ) }/>
					<label htmlFor="show-description">Show descriptions</label>
				</Stack>

				<div>
					<Typography variant="h4" gutterBottom>Radio</Typography>
					<div>
						<RadioGroup { ...args } options={ options } variant='radio' name='visibility-radio' value={ value } onChange={ e => setValue( e.target.value ) }/>
					</div>
				</div>
				<div>
					<Typography variant="h4" gutterBottom>Boxed</Typography>
					<div>
						<RadioGroup { ...args } options={ options } variant='boxed' name='visibility-boxed' value={ value } onChange={ e => setValue( e.target.value ) }/>
					</div>
				</div>
				<div>
					<Typography variant="h4" gutterBottom>Segmented</Typography>
					<div>
						<RadioGroup direction="row" { ...args } options={ options } variant='segmented' name='visibility-segmented' value={ value } onChange={ e => setValue( e.target.value ) }/>
					</div>
				</div>
			</Stack>
		</>
	}
};

const ICON_SIZE = '1.3em';
const alignments = [
	{ value: 'public', label: 'Public', icon: <GlobeEuropeAfricaIcon width={ ICON_SIZE }/> },
	{ value: 'private', label: 'Private', icon: <LockClosedIcon width={ ICON_SIZE }/> },
	{ value: 'password-protected', label: 'Password protected', icon: <KeyIcon width={ ICON_SIZE }/> },
].map( _ => ( {
	value: _.value,
	label: <Stack direction="row" align="center" spacing={ 1 }>
		{ _.icon }
		<div>{ _.label }</div>
	</Stack>
} ) )

export const CustomIcons: Story = {
	args: {
		...Default.args,
		variant: 'segmented',
		options: alignments,
		direction: 'row'
	},
	render: ( args ) => <RadioGroup { ...args } />
}

function CustomItem( { name, image, role }: { name: string, image: string, role: string } ) {
	return <Stack direction="row" align="center" spacing={ 2 }>
		<img src={ image } style={ { width: '35px', borderRadius: '4px' } }/>
		<Stack direction="column">
			<Typography sx={ { color: 'inherit' } }>{ name }</Typography>
			<Typography variant="body2" sx={ { color: 'inherit', opacity: .5 } }>{ role }</Typography>
		</Stack>
	</Stack>
}

const people = [
	{ value: 'john', name: 'John', role: 'CEO at Google', image: 'images/avatar/john.jpeg' },
	{ value: 'hannah', name: 'Hannah', role: 'Product Manager at Newfold Digital', image: 'images/avatar/hannah.jpeg' },
	{ value: 'kate', name: 'Kate', role: 'Developer at Microsoft', image: 'images/avatar/kate.jpeg' },
	{ value: 'mark', name: 'Mark', role: 'Product Manager at Apple', image: 'images/avatar/mark.jpeg' },
	{ value: 'sarah', name: 'Sarah', role: 'Manager at YITH', image: 'images/avatar/sarah.jpeg' },
	{ value: 'tim', name: 'Tim', role: 'Manager at Vodafone', image: 'images/avatar/tim.jpeg' },
];

export const CustomContent: Story = {
	args: {
		...Default.args,
		variant: 'boxed',
		options: people.map( _ => ( { label: <CustomItem name={ _.name } image={ _.image } role={ _.role }/>, value: _.value } ) )
	},
	render: ( args ) => <RadioGroup { ...args } name='person'/>
}


export const Disabled: Story = {
	args: {
		...Default.args,
		options: OPTIONS.map( _ => ( { value: _.value, label: _.label, disabled: _.value === 'private' } ) )
	},
	render: ( args ) => {
		return <Stack spacing={ 4 }>
			<div>
				<Typography variant="h4" gutterBottom>One option disabled</Typography>
				<RadioGroup { ...args } />
			</div>

			<div>
				<Typography variant="h4" gutterBottom>Whole field disabled</Typography>
				<RadioGroup { ...args } disabled/>
			</div>
		</Stack>
	}
};