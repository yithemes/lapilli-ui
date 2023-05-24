import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { FieldSize } from "@yith/styles";

import Input from '../';
import FormControl from "../../form-control";
import Container from "../../container";
import Stack from "../../stack";
import IconButton from "../../icon-button";
import Button from "../../button";
import Select from "../../select";

function CalendarIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.3em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.3em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
		</svg>
	);
}

function XMarkIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.3em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	);
}

function PencilIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.3em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
		</svg>
	);
}

function EyeIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth={ 1.5 } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
		</svg>
	);
}

function EyeSlashIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth={ 1.5 } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.1em">
			<path strokeLinecap="round" strokeLinejoin="round"
				d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
		</svg>
	);
}

function Square2StackIcon() {
	return (
		<svg fill="none" stroke="currentColor" strokeWidth={ 1.5 } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.1em">
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"/>
		</svg>
	);
}


const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	argTypes: {
		value: {
			control: false
		},
		type: {
			control: {
				type: 'select',
				options: [ 'text', 'number', 'password' ],
				mapping: {
					text: 'text',
					number: 'number',
					password: 'password',
				}
			},
			table: {
				type: { summary: 'HTMLInputTypeAttribute' },
				defaultValue: { summary: 'text' }
			},
			description: 'Type of the input element to render.',
		},
		placeholder: {
			control: {
				type: 'text',
			},
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' }
			},
			description: 'The placeholder of the input field.',
		},
		startAdornment: {
			control: {
				type: 'select',
			},
			options: [ 'none', 'calendar', 'edit' ],
			mapping: {
				none: '',
				calendar: <CalendarIcon/>,
				edit: <PencilIcon/>,
			}
		},
		endAdornment: {
			control: {
				type: 'select',
			},
			options: [ 'none', 'check', 'close', 'dollar', 'percentage' ],
			mapping: {
				none: '',
				check: <CheckIcon/>,
				close: <XMarkIcon/>,
				dollar: '$',
				percentage: '%',
			}
		},
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		type: 'text',
		variant: 'outlined',
		placeholder: 'Set a name',
		isMini: false,
		fullWidth: false,
		size: 'md'
	},
	render: args => <Input { ...args } />
}

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5
}

export const Sizes: Story = {
	args: Default.args,
	render: args => <Container style={ CONTAINER_STYLE }>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<Input { ...args } size={ _.size } id={ fieldId }/>
				</FormControl>
			}
		) }
	</Container>
}

export const Adornments: Story = {
	args: { ...Default.args, placeholder: '' },
	render: ( args ) => {
		const [ showPassword, setShowPassword ] = useState( false );

		return <Stack spacing={ 2 } direction="column">
			<Input { ...args } type={ showPassword ? 'text' : 'password' } autoComplete="one-time-code"
				endAdornment={
					<IconButton
						onClick={ _ => setShowPassword( _show => !_show ) }
						size="sm"
						color="primary"
						sx={ { margin: '0 -8px' } }
					>
						{ showPassword ? <EyeSlashIcon/> : <EyeIcon/> }
					</IconButton>
				}
			/>
			<Input { ...args } endAdornment={
				<Select
					variant="reveal"
					options={ [ 'kb', 'mb', 'gb' ].map( _ => ( { value: _, label: _.toUpperCase() } ) ) }
					width="auto"
					hideToggleIcon
					sx={ { transform: 'scale(.8)', margin: '0 -14px' } }
				/>
			}/>
			<Input { ...args } startAdornment="€"/>
			<Input { ...args } endAdornment={
				<Button size="sm" variant="text" short startIcon={ <Square2StackIcon/> } sx={ { transform: 'scale(.8)', margin: '0 -14px' } }>COPY</Button>
			}/>
		</Stack>
	}
}