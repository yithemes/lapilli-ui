// @ts-ignore
import React, { useRef, useState } from 'react';
import Button from "../../../../../packages/components/src/button";
import Container from "../../../../../packages/components/src/container";
import Checkbox from "../../../../../packages/components/src/checkbox";
import DatePicker from "../../../../../packages/components/src/date-picker";
import FormControl from "../../../../../packages/components/src/form-control";
import IconButton from "../../../../../packages/components/src/icon-button";
import Input from "../../../../../packages/components/src/input";
import Modal, { ModalActions, ModalContent, ModalTitle } from "../../../../../packages/components/src/modal";
import RadioGroup from "../../../../../packages/components/src/radio-group";
import Select from "../../../../../packages/components/src/select";
import Stack from "../../../../../packages/components/src/stack";
import Switch from "../../../../../packages/components/src/switch/Switch";
import type { DatePickerRef } from "../../../../../packages/components/src/";
import { formatDateSameTimezone } from "../../../../../packages/date/src/";

import { Square2StackIcon, EyeIcon, TrashIcon, ArrowLongLeftIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const CATEGORIES = [
	{ value: 'adventure', label: 'Adventure' },
	{ value: 'classics', label: 'Classics' },
	{ value: 'crime', label: 'Crime' },
	{ value: 'fables', label: 'Fables' },
	{ value: 'fantasy', label: 'Fantasy' },
	{ value: 'horror', label: 'Horror' },
	{ value: 'humor', label: 'Humor' },
	{ value: 'mystery', label: 'Mystery' },
	{ value: 'romance', label: 'Romance' },
	{ value: 'thrillers', label: 'Thrillers' }
]

const VISIBILITY = [
	{ value: 'public', label: 'Public' },
	{ value: 'private', label: 'Private' },
	{ value: 'password-protected', label: 'Password protected' }
]

const SIZES = [
	{ value: 'KB', label: 'KB' },
	{ value: 'MB', label: 'MB' },
	{ value: 'GB', label: 'GB' }
];

const CONTAINER_STYLE = {
	fontSize: '14px',
	lineHeight: 1.5,
	padding: '10px',
	margin: '0 auto'
}

function FeaturedIcon() {
	const style = {
		color: '#e91e63',
		fontSize: '30px'
	}
	return <HeartIcon width='1em' style={ style }/>
}

function PublishedInfo( { children } ) {
	const style = {
		color: 'rgba(00,22,56,0.5)',
		fontSize: '.8em',
		fontWeight: 500,
		marginBottom: '16px'
	}
	return <div style={ style }>
		{ children }
	</div>
}

function FooterInfo( { children } ) {
	const style = {
		color: 'rgba(00,22,56,0.5)',
		fontSize: '.8em',
		fontWeight: 500,
		marginTop: '16px',
	}
	return <Stack style={ style } direction="row" justify="center" spacing={ 2 }>
		{ children }
	</Stack>
}

function SimpleForm() {
	const [ name, setName ] = useState( '' );
	const [ visibility, setVisibility ] = useState( 'public' );
	const [ publishedDate, setPublishedDate ] = useState<Date | null>( null );
	const [ showPassword, setShowPassword ] = useState( false );
	const [ isFeatured, setIsFeatured ] = useState( false );
	const [ featuredFrom, setFeaturedFrom ] = useState<Date | null>( null );
	const [ featuredTo, setFeaturedTo ] = useState<Date | null>( null );
	const [ pages, setPages ] = useState<number>( 100 );
	const [ size, setSize ] = useState<number>( 1 );
	const [ sizeUnit, setSizeUnit ] = useState<string>( 'MB' );
	const featuredToRef = useRef<DatePickerRef>( null );
	const [ modalOpened, setModalOpened ] = useState( false );

	return <Container maxWidth="md" style={ CONTAINER_STYLE } className="themed-story-wrapper">
		<Stack spacing={ 2 } direction="column">
			<Stack direction="row" spacing={ 1.5 } align="center">
				<h1 style={ { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', opacity: !!name ? 1 : .5 } }>{ !!name ? name : 'Untitled' }</h1>
				<IconButton variant="ghost" color="primary" title="View"><EyeIcon width='1em'/></IconButton>
				<IconButton variant="ghost" color="primary" title="Clone"><Square2StackIcon width='1em'/></IconButton>
				<IconButton variant="ghost" color="error" title="Delete"><TrashIcon width='1em'/></IconButton>
			</Stack>
			<Stack direction="row" spacing={ 1 } align="center" style={ { height: '30px', fontSize: 13, marginTop: -15 } }>
				{ isFeatured && <>
					<FeaturedIcon/>
					{ !!featuredFrom && <span>from { formatDateSameTimezone( 'M j, Y', featuredFrom ) }</span> }
					{ !!featuredTo && <span>to { formatDateSameTimezone( 'M j, Y', featuredTo ) }</span> }
				</> }
			</Stack>
			<Container>
				<FormControl label="Book name" htmlFor="name" help="Enter the book name.">
					<Input id="name" fullWidth placeholder="Enter the book name" value={ name } onChange={ ( _, theName ) => setName( theName ) }/>
				</FormControl>
				<FormControl label="Categories" htmlFor="categories" help="Choose the categories related to your book.">
					<Select id="categories" options={ CATEGORIES } multiple showTags fullWidth limitTags={ 2 } allowClear allowSearch hideSelectedOptions sx={ { maxWidth: 400 } }/>
				</FormControl>
				<FormControl label="Visibility" help="Choose the visibility.">
					<RadioGroup variant='segmented' direction='row' inline options={ VISIBILITY } value={ visibility } onChange={ ( _, theVisibility ) => setVisibility( theVisibility ) }/>
				</FormControl>
				{ visibility === 'password-protected' &&
					<FormControl label="Password" htmlFor="my-pass" help="Choose the password.">
						<Input id="my-pass" type={ showPassword ? 'text' : 'password' } autoComplete="one-time-code"
							endAdornment={
								<IconButton
									onClick={ _ => setShowPassword( _show => !_show ) }
									size="sm"
									sx={ { margin: '0 -8px' } }
								>
									{ showPassword ? <EyeSlashIcon width='1em'/> : <EyeIcon width='1em'/> }
								</IconButton>
							}
						/>
					</FormControl> }
				<FormControl label="Publish date" htmlFor="date" help="Choose the date of the publication.">
					<DatePicker id="date" placeholder="Select a date" value={ publishedDate } onChange={ _ => setPublishedDate( _ ) }/>
				</FormControl>
				<FormControl label="Pages" htmlFor="pages" help="Enter the number of pages.">
					<Input id="pages" type="number" isMini min={ 0 } value={ pages } onChange={ ( e, _ ) => setPages( _ ) }/>
				</FormControl>
				<FormControl label="File size" htmlFor="size" help="Choose the file size">
					<Stack direction="row" spacing={ 1 } align="center">
						<Input id="size" type="number" isMini min={ 0 } value={ size } onChange={ ( e, _ ) => setSize( _ ) }/>
						<Select options={ SIZES } value={ sizeUnit } onChange={ _ => setSizeUnit( _ ) }/>
					</Stack>
				</FormControl>
				<FormControl label="Best seller?" htmlFor="bests-ellers" help="Select to include in best-sellers list.">
					<Checkbox id='best-sellers' noPadding/>
				</FormControl>
				<FormControl label="Is featured?" htmlFor="featured" help="Enable if this is a featured book.">
					<Switch id="featured" noPadding checked={ isFeatured } onChange={ ( _, value ) => setIsFeatured( value ) }/>
				</FormControl>
				{ isFeatured &&
					<FormControl label="Featured from" htmlFor="featured-from" help="Choose the dates for the featured status.">
						<Stack direction="row" spacing={ 2 } align="center">
							<DatePicker id="featured-from" placeholder="Start date" allowClear maxDate={ featuredTo } value={ featuredFrom } onChange={ _ => {
								setFeaturedFrom( _ );
								if ( !!_ && !featuredToRef?.current?.value ) {
									setTimeout( () => featuredToRef?.current?.toggle(), 50 );
								}
							} }/>
							<label htmlFor="featured-to">to</label>
							<DatePicker ref={ featuredToRef } id="featured-to" placeholder="End date" allowClear minDate={ featuredFrom } value={ featuredTo } onChange={ _ => setFeaturedTo( _ ) }/>
						</Stack>
					</FormControl>
				}
			</Container>
			<Stack direction="row" spacing={ 2 } align="center">
				<Button variant="text" startIcon={ <ArrowLongLeftIcon width='1.2em'/> }>Back</Button>
				<Button>Save</Button>
				<Button variant="outlined" onClick={ () => setModalOpened( true ) }>Preview</Button>
			</Stack>
		</Stack>
		<Modal open={ modalOpened } onClose={ () => setModalOpened( false ) }>
			<ModalTitle>{ !!name ? name : 'Untitled' }</ModalTitle>
			<ModalContent>
				{ !!publishedDate ? <PublishedInfo>Published on { formatDateSameTimezone( 'M j, Y', publishedDate ) }</PublishedInfo> : <PublishedInfo>In draft</PublishedInfo> }
				{ LOREM_IPSUM }
				<FooterInfo>
					{ typeof pages !== 'undefined' && <div>{ pages } pages</div> }
					{ typeof size !== 'undefined' && <div>{ `${ size } ${ sizeUnit }` }</div> }
				</FooterInfo>
			</ModalContent>
			<ModalActions>
				<Button variant="text" onClick={ () => setModalOpened( false ) }>Close</Button>
			</ModalActions>
		</Modal>
	</Container>
}

export default SimpleForm