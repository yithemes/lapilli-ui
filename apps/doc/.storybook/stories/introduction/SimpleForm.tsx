import { Button, Container, DatePicker, FormControl, FwIcon, IconButton, Input, Modal, ModalActions, ModalContent, ModalTitle, RadioGroup, Select, Stack, Switch } from '@yith/components';
import type { DatePickerRef } from '@yith/components';
import { useRef, useState } from 'react';
import { formatDateSameTimezone } from "@yith/date";

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
	{ value: 'public', label: 'Public', description: 'Visible to everyone.' },
	{ value: 'private', label: 'Private', description: 'Only visible to site admins and editors.' },
	{ value: 'password-protected', label: 'Password protected', description: 'Protected with a password.' }
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

function FeaturedCrown() {
	const style = {
		color: '#fff',
		background: '#e08f29',
		borderRadius: '50%',
		width: '30px',
		height: '30px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '20px'
	}
	return <div style={ style }><FwIcon icon="crown"/></div>
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
		marginBottom: '-24px',
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
				<IconButton variant="shadowed" color="primary" title="View"><FwIcon icon="eye"/></IconButton>
				<IconButton variant="shadowed" color="primary" title="Clone"><FwIcon icon="clone"/></IconButton>
				<IconButton variant="shadowed" color="error" title="Delete"><FwIcon icon="trash"/></IconButton>
			</Stack>
			<Stack direction="row" spacing={ 1 } align="center" style={ { height: '30px', fontSize: 13, marginTop: -15 } }>
				{ isFeatured && <>
					<FeaturedCrown/>
					{ !!featuredFrom && <span>from { formatDateSameTimezone( 'M j, Y', featuredFrom ) }</span> }
					{ !!featuredTo && <span>to { formatDateSameTimezone( 'M j, Y', featuredTo ) }</span> }
				</> }
			</Stack>
			<Container>
				<FormControl label="Book name" htmlFor="name" help="Enter the book name.">
					<Input id="name" fullWidth placeholder="Enter the book name" value={ name } onChange={ ( _, theName ) => setName( theName ) }/>
				</FormControl>
				<FormControl label="Categories" htmlFor="categories" help="Choose the categories related to your book.">
					<Select id="categories" options={ CATEGORIES } multiple showTags width={ 400 } limitTags={ 2 } allowClear allowSearch hideSelectedOptions/>
				</FormControl>
				<FormControl label="Visibility" help="Choose the visibility.">
					<RadioGroup options={ VISIBILITY } value={ visibility } onChange={ ( _, theVisibility ) => setVisibility( theVisibility ) }/>
				</FormControl>
				{
					visibility === 'password-protected' &&
					<FormControl label="Password" htmlFor="my-pass" help="Choose the password.">
						<Input id="my-pass" type={ showPassword ? 'text' : 'password' } autoComplete="one-time-code"
							endAdornment={
								<IconButton onClick={ _ => setShowPassword( _show => !_show ) } size="sm">
									<FwIcon icon={ showPassword ? 'eye-closed' : 'eye' }/>
								</IconButton>
							}
						/>
					</FormControl>
				}
				<FormControl label="Publish date" htmlFor="date" help="Choose the date of the publication.">
					<DatePicker id="date" placeholder="Select a date" value={ publishedDate } onChange={ _ => setPublishedDate( _ ) }/>
				</FormControl>
				<FormControl label="Pages" htmlFor="pages" help="Enter the number of pages.">
					<Input id="pages" type="number" isMini min={ 0 } value={ pages } onChange={ ( e, _ ) => setPages( _ ) }/>
				</FormControl>
				<FormControl label="File size" htmlFor="size" help="Choose the file size">
					<Stack direction="row" spacing={ 1 } align="center">
						<Input id="size" type="number" isMini min={ 0 } value={ size } onChange={ ( e, _ ) => setSize( _ ) }/>
						<Select options={ SIZES } width="auto" value={ sizeUnit } onChange={ _ => setSizeUnit( _ ) }/>
					</Stack>
				</FormControl>
				<FormControl label="Is featured?" htmlFor="featured" help="Enable if this is a featured book.">
					<Switch id="featured" checked={ isFeatured } onChange={ ( _, value ) => setIsFeatured( value ) }/>
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
				<Button variant="text" startIcon={ <FwIcon icon="arrow-left-long-alt"/> }>Back</Button>
				<Button>Save</Button>
				<Button variant="outlined" onClick={ () => setModalOpened( true ) }>Preview</Button>
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
			</Stack>
		</Stack>
	</Container>
}

export default SimpleForm