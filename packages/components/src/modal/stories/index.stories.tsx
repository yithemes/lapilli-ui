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
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) } maxWidth="xs" disableAutoFocus>
				<ModalTitle>Confirm</ModalTitle>

				<ModalContent>
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
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) } maxWidth="xs" disableAutoFocus>
				<ModalTitle>Confirm Delete</ModalTitle>

				<ModalContent>
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
	}
}

export const WithFields: Story = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <>
			<Button onClick={ () => setOpen( true ) }>Open Modal</Button>
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }>
				<ModalTitle>Fill the form</ModalTitle>

				<ModalContent>
					<Container maxWidth="sm">
						<Stack direction="column" spacing={ 3 }>
							<Stack direction="column" spacing={ 1 } align="start">
								<label>Choose a name</label>
								<Input fullWidth/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label>Choose a number</label>
								<Select options={ [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'Three', label: 'Three' } ] } width={ 400 }/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label>Choose a date</label>
								<DatePicker/>
							</Stack>
							<Stack direction="column" spacing={ 1 } align="start">
								<label>Dropdown with other fields</label>
								<Dropdown
									renderToggle={ ( { isOpen, toggle } ) => <Button onClick={ toggle }>{ isOpen ? 'Close' : 'Open' }</Button> }
									renderContent={ () => (
										<Stack direction="column" spacing={ 3 } align="start" sx={ { padding: '24px' } }>
											<Stack direction="column" spacing={ 1 } align="start">
												<label>Choose another name</label>
												<Input fullWidth/>
											</Stack>
											<Stack direction="column" spacing={ 1 } align="start">
												<label>Choose another number</label>
												<Select options={ [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'Three', label: 'Three' } ] } width={ 400 }/>
											</Stack>
											<Stack direction="column" spacing={ 1 } align="start">
												<label>Choose another date</label>
												<DatePicker/>
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
			<Modal { ...args } open={ open } onClose={ () => setOpen( false ) }>
				<ModalTitle>Parent</ModalTitle>
				<ModalContent>
					<Container maxWidth="sm">
						<Stack direction="column" spacing={ 3 } align="center">
							<Typography>Hi, I'm the parent modal</Typography>
							<Button onClick={ () => setChildOpen( true ) }>Open Child</Button>
							<Modal { ...args } open={ childOpen } onClose={ () => setChildOpen( false ) } disableAutoFocus>
								<ModalTitle>Child</ModalTitle>
								<ModalContent>
									<Typography>Hi, I'm the child modal</Typography>
								</ModalContent>
							</Modal>
						</Stack>
					</Container>
				</ModalContent>
			</Modal>
		</>
	}
}