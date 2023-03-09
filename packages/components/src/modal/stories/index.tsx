import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Modal, { ModalActions, ModalContent, ModalTitle } from "../";
import Button from "../../button";
import Typography from "../../typography";
import Container from "../../container";
import Select from "../../select";
import Stack from "../../stack";
import DatePicker from "../../date-picker";
import Input from "../../input";

const meta: ComponentMeta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
};

export default meta;

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`


const Template: ComponentStory<typeof Modal> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
		<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }>
			<ModalTitle>Modal</ModalTitle>

			<ModalContent>
				<Typography>
					Hello, nice to meet you! <br/>
					I'm a simple modal, to show you what you can achieve ;-) <br/>
					<br/>
					You can close me in different ways:
					<ul>
						<li>by clicking the X on top-right corner</li>
						<li>by pressing <code>ESC</code> in your keyboard</li>
						<li>by clicking on the backdrop</li>
						<li>by clicking on the close button</li>
					</ul>

					Enjoy!
				</Typography>
			</ModalContent>

			<ModalActions>
				<Button variant="outlined"  onClick={ () => setOpen( false ) }>Close</Button>
			</ModalActions>
		</Modal>
	</>
};
export const Default: ComponentStory<typeof Modal> = Template.bind( {} );

const ConfirmTemplate: ComponentStory<typeof Modal> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
		<Modal { ...args } open={ open } onClose={ () => setOpen( false ) } maxWidth="xs">
			<ModalTitle>Confirm</ModalTitle>

			<ModalContent>
				<Typography>
					Do you want to confirm the action?
				</Typography>
			</ModalContent>

			<ModalActions>
				<Button variant="outlined"  onClick={ () => setOpen( false ) }>Cancel</Button>
				<Button onClick={ () => setOpen( false ) }>Confirm</Button>
			</ModalActions>
		</Modal>
	</>
};
export const Confirm: ComponentStory<typeof Modal> = ConfirmTemplate.bind( {} );

const DeleteTemplate: ComponentStory<typeof Modal> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
		<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }  maxWidth="xs">
			<ModalTitle>Confirm Delete</ModalTitle>

			<ModalContent>
				<Typography>Are you sure to delete the selected item?</Typography>
				<Typography>This action cannot be undone.</Typography>
			</ModalContent>

			<ModalActions>
				<Button variant="outlined" onClick={ () => setOpen( false ) }>Cancel</Button>
				<Button color="error" onClick={ () => setOpen( false ) }>Delete</Button>
			</ModalActions>
		</Modal>
	</>
};
export const Delete: ComponentStory<typeof Modal> = DeleteTemplate.bind( {} );

const ScrollableContentTemplate: ComponentStory<typeof Modal> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
		<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }>
			<ModalTitle>Confirm</ModalTitle>

			<ModalContent>
				<Container maxWidth="sm">
					<Typography>
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
						{ LOREM_IPSUM }
					</Typography>
				</Container>
			</ModalContent>

			<ModalActions>
				<Button variant="text" onClick={ () => setOpen( false ) }>Cancel</Button>
				<Button onClick={ () => setOpen( false ) }>Confirm</Button>
			</ModalActions>
		</Modal>
	</>
};
export const ScrollableContent: ComponentStory<typeof Modal> = ScrollableContentTemplate.bind( {} );

const WithFieldsTemplate: ComponentStory<typeof Modal> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <>
		<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
		<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }>
			<ModalTitle>Confirm</ModalTitle>

			<ModalContent>
				<Container maxWidth="sm">
					<Stack direction="column" spacing={ 3 }>
						<Stack direction="column" spacing={ 1 }>
							<label>Choose a name</label>
							<Input fullWidth/>
						</Stack>
						<Stack direction="column" spacing={ 1 }>
							<label>Choose a number</label>
							<Select options={ [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'Three', label: 'Three' } ] } width={ 400 }/>
						</Stack>
						<Stack direction="column" spacing={ 1 }>
							<label>Choose a date</label>
							<DatePicker/>
						</Stack>
					</Stack>
				</Container>
			</ModalContent>

			<ModalActions>
				<Button variant="outlined" onClick={ () => setOpen( false ) }>Cancel</Button>
				<Button onClick={ () => setOpen( false ) }>Confirm</Button>
			</ModalActions>
		</Modal>
	</>
};
export const WithFields: ComponentStory<typeof Modal> = WithFieldsTemplate.bind( {} );