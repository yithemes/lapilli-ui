import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal, { ModalActions, ModalContent, ModalTitle } from "../";
import Button from "../../button";
import Typography from "../../typography";
import Container from "../../container";
import Select from "../../select";
import Stack from "../../stack";
import DatePicker from "../../date-picker";
import Input from "../../input";
import Dropdown from "../../dropdown";

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
};

export default meta;

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`


type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal
				{ ...args }
				open={ open }
				onClose={ () => setOpen( false ) }
				aria-labelledby='modal__label'
				aria-describedby='modal__content'
				role='alertdialog'
			>
				<ModalTitle id='modal__label'>Modal</ModalTitle>

				<ModalContent id='modal__content'>
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
					<Button variant="outlined" onClick={ () => setOpen( false ) }>Close</Button>
				</ModalActions>
			</Modal>
		</>
	}
}

export const Confirm: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal { ...args }
				open={ open }
				onClose={ () => setOpen( false ) }
				maxWidth="xs"
				disableAutoFocus
				aria-labelledby='modal__label'
				aria-describedby='modal__content'
				role='alertdialog'
			>
				<ModalTitle id='modal__label'>Confirmation</ModalTitle>

				<ModalContent id='modal__content'>
					<Typography>
						Do you want to confirm the action?
					</Typography>
				</ModalContent>

				<ModalActions>
					<Button variant="outlined" onClick={ () => setOpen( false ) }>Cancel</Button>
					<Button onClick={ () => setOpen( false ) } autoFocus>Confirm</Button>
				</ModalActions>
			</Modal>
		</>
	}
}

export const Delete: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal
				{ ...args }
				open={ open }
				onClose={ () => setOpen( false ) }
				maxWidth="xs"
				disableAutoFocus
				aria-labelledby='modal__label'
				aria-describedby='modal__content'
				role='alertdialog'
			>
				<ModalTitle id='modal__label'>Confirm Delete</ModalTitle>

				<ModalContent id='modal__content'>
					<Typography>Are you sure to delete the selected item?</Typography>
					<Typography>This action cannot be undone.</Typography>
				</ModalContent>

				<ModalActions>
					<Button variant="outlined" onClick={ () => setOpen( false ) }>Cancel</Button>
					<Button color="error" onClick={ () => setOpen( false ) } autoFocus>Delete</Button>
				</ModalActions>
			</Modal>
		</>
	}
}

export const ScrollableContent: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal
				{ ...args }
				open={ open }
				onClose={ () => setOpen( false ) }
				aria-labelledby='modal__label'
				aria-describedby='modal__content'
				role='alertdialog'
			>
				<ModalTitle id='modal__label'>Confirm</ModalTitle>

				<ModalContent id='modal__content'>
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
	}
}

export const WithFields: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) } role='dialog' aria-labelledby='modal__label'>
				<ModalTitle id='modal__label'>Fill the form</ModalTitle>

				<ModalContent>
					<Container maxWidth="sm">
						<Stack direction="column" spacing={ 3 }>
							<Stack direction="column" spacing={ 1 } align="start">
								<label htmlFor="name">Choose a name</label>
								<Input id="name" fullWidth/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label htmlFor="number">Choose a number</label>
								<Select id="number" options={ [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'Three', label: 'Three' } ] } sx={ { maxWidth: 400 } } fullWidth/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label htmlFor="date">Choose a date</label>
								<DatePicker id="date"/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label>Dropdown with other fields</label>
								<Dropdown
									renderToggle={ ( { isOpen, toggle } ) => <Button onClick={ toggle }>{ isOpen ? 'Close' : 'Open' }</Button> }
									renderContent={ () => (
										<Stack direction="column" spacing={ 3 } align="stretch" sx={ { padding: '24px', width: '100vw', maxWidth: '600px' } }>
											<Stack direction="column" spacing={ 1 } align="start">
												<label htmlFor="other-name">Choose another name</label>
												<Input id="other-name" fullWidth/>
											</Stack>
											<Stack direction="column" spacing={ 1 } align="start">
												<label htmlFor="other-number">Choose another number</label>
												<Select id="other-number" options={ [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'Three', label: 'Three' } ] } sx={ { maxWidth: 400 } } fullWidth/>
											</Stack>
											<Stack direction="column" spacing={ 1 } align="start">
												<label htmlFor="other-date">Choose another date</label>
												<DatePicker id="other-date"/>
											</Stack>
										</Stack>
									) }
									popoverProps={ {
										position: 'bottom left',
										forceMinWidth: true,
										role: 'listbox',
										tabIndex: -1,
									} }
								/>
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
	}
}

export const Nested: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		const [ childOpen, setChildOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) } role='dialog' aria-labelledby='modal__label' aria-describedby='modal__description'>
				<ModalTitle id='modal__label'>Parent</ModalTitle>
				<ModalContent>
					<Typography id='modal__description'>Hi, I'm the parent modal</Typography>
				</ModalContent>
				<ModalActions>
					<Button onClick={ () => setChildOpen( true ) }>Open Child</Button>
				</ModalActions>
			</Modal>
			<Modal { ...args } open={ childOpen } onClose={ () => setChildOpen( false ) } role='dialog' aria-labelledby='modal-child__label' aria-describedby='modal-child__description'>
				<ModalTitle id='modal-child__label'>Child</ModalTitle>
				<ModalContent id='modal-child__description'>
					<Typography>Hi, I'm the child modal</Typography>
				</ModalContent>

				<ModalActions>
					<Button variant="outlined" onClick={ () => setChildOpen( false ) }>Ok, close me!</Button>
				</ModalActions>
			</Modal>
		</>
	}
}