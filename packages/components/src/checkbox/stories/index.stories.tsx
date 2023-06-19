import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../Checkbox';
import type { FieldSize } from "@yith/styles";
import FormControl from "../../form-control";

import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Stack from "../../stack";
import Typography from "../../typography";


const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	argTypes: {
		checked: {
			control: false
		},
	}
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		type: 'checkbox',
		size: 'md'
	},
	render: ( args ) => <Checkbox { ...args } />
};

export const Icon: Story = {
	args: {
		...Default.args,
		icon: <HeartIcon width='1em' strokeWidth={ 2 }/>,
		checkedIcon: <HeartIconSolid width='1em'/>
	},
	render: Default.render
};

const SIZES: { size: FieldSize, label: string }[] = [
	{ size: 'sm', label: 'Small' },
	{ size: 'md', label: 'Medium' },
	{ size: 'lg', label: 'Large' },
	{ size: 'xl', label: 'Extra Large' },
]

export const Sizes: Story = {
	args: Default.args,
	render: ( args ) => <>
		{ SIZES.map( _ => {
				const fieldId = `input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<Checkbox { ...args } size={ _.size } id={ fieldId }/>
				</FormControl>
			}
		) }
		{ SIZES.map( _ => {
				const fieldId = `icon-input-size-${ _.size }`;
				return <FormControl key={ _.size } label={ _.label } htmlFor={ fieldId }>
					<Checkbox
						{ ...args }
						size={ _.size }
						id={ fieldId }
						icon={ <HeartIcon width='1em' strokeWidth={ 2 }/> }
						checkedIcon={ <HeartIconSolid width='1em'/> }
					/>
				</FormControl>
			}
		) }
	</>
};

export const CustomColors: Story = {
	args: Default.args,
	render: ( args ) => <>
		<Stack direction='column' spacing={ 4 }>
			<div>
				<Typography variant="h4" gutterBottom>Icons only</Typography>
				<Checkbox
					{ ...args }
					aria-label='Checked'
					sx={ {
						color: '#009d9d'
					} }
				/>
				<Checkbox
					{ ...args }
					aria-label='Starred'
					icon={ <StarIcon width='1em' strokeWidth={ 2 }/> }
					checkedIcon={ <StarIconSolid width='1em'/> }
					sx={ {
						color: '#ffd024'
					} }
				/>
				<Checkbox
					{ ...args }
					aria-label='Featured'
					icon={ <HeartIcon width='1em' strokeWidth={ 2 }/> }
					checkedIcon={ <HeartIconSolid width='1em'/> }
					sx={ {
						'&.yithUI--checked': {
							color: '#e91e63'
						}
					} }
				/>
			</div>
			<div>
				<Typography variant="h4" gutterBottom>With labels</Typography>
				<Stack direction='column' align='start'>
					<label>
						<Checkbox
							{ ...args }
							sx={ {
								color: '#009d9d'
							} }
						/>
						Checked
					</label>
					<label>
						<Checkbox
							{ ...args }
							icon={ <StarIcon width='1em' strokeWidth={ 2 }/> }
							checkedIcon={ <StarIconSolid width='1em'/> }
							sx={ {
								color: '#ffd024'
							} }
						/>
						Starred
					</label>
					<label>
						<Checkbox
							{ ...args }
							icon={ <HeartIcon width='1em' strokeWidth={ 2 }/> }
							checkedIcon={ <HeartIconSolid width='1em'/> }
							sx={ {
								'&.yithUI--checked': {
									color: '#e91e63'
								}
							} }
						/>
						Featured
					</label>
				</Stack>
			</div>
		</Stack>
	</>
};
