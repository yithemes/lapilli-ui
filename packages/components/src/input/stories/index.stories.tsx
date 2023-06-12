import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { FieldSize } from "@yith/styles";
import { CalendarIcon, CheckIcon, XMarkIcon, PencilIcon, EyeIcon, EyeSlashIcon, Square2StackIcon } from "@heroicons/react/24/outline";


import Input from '../';
import FormControl from "../../form-control";
import Container from "../../container";
import Stack from "../../stack";
import IconButton from "../../icon-button";
import Button from "../../button";
import Select from "../../select";

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
				calendar: <CalendarIcon width="1.2em"/>,
				edit: <PencilIcon width="1.2em"/>,
			}
		},
		endAdornment: {
			control: {
				type: 'select',
			},
			options: [ 'none', 'check', 'close', 'dollar', 'percentage' ],
			mapping: {
				none: '',
				check: <CheckIcon width="1.2em"/>,
				close: <XMarkIcon width="1.2em"/>,
				dollar: '$',
				percentage: '%',
			}
		},
		defaultValue: {
			control: {
				type: 'text',
			},
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' }
			},
			description: 'The default value. Useful when the component is not controlled.',
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
						{ showPassword ? <EyeSlashIcon width="1em"/> : <EyeIcon width="1em"/> }
					</IconButton>
				}
			/>
			<Input { ...args } endAdornment={
				<Select
					variant="reveal"
					options={ [ 'kb', 'mb', 'gb' ].map( _ => ( { value: _, label: _.toUpperCase() } ) ) }
					hideToggleIcon
					sx={ { transform: 'scale(.8)', margin: '0 -14px' } }
				/>
			}/>
			<Input { ...args } startAdornment="€"/>
			<Input { ...args } endAdornment={
				<Button size="sm" variant="text" short startIcon={ <Square2StackIcon width="1.2em"/> } sx={ { transform: 'scale(.8)', margin: '0 -14px' } }>COPY</Button>
			}/>
		</Stack>
	}
}