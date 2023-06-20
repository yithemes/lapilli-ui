import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from "..";
import CardHeader from "../card-header";
import CardMedia from "../card-media";
import CardActions from "../card-actions";
import CardContent from "../card-content";

import { Default as PaperStoryDefault } from "../../paper/stories/index.stories"

import IconButton from "../../icon-button";
import Collapse from "../../collapse";
import Typography from "../../typography";
import { ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, StarIcon, PlayIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import Stack from "../../stack";
import Switch from "../../switch/Switch";
import Button from "../../button";
import Grid from "../../grid";

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>

export const SimpleCard: Story = {
	args: {
		raised: false,
		...PaperStoryDefault.args
	},
	render: ( args ) => <Card { ...args } sx={ { width: 300 } }>
		<CardContent>
			<Typography sx={ { fontSize: 14 } } color="text.secondary">
				Best company of the year
			</Typography>
			<Typography variant="h5" component='div'>
				YITH
			</Typography>
			<Stack sx={ { color: '#caa200', fontSize: '20px' } } direction="row">
				<StarIcon width="1em"/>
				<StarIcon width="1em"/>
				<StarIcon width="1em"/>
				<StarIcon width="1em"/>
				<StarIcon width="1em"/>
			</Stack>
			<Typography sx={ { marginTop: '2em' } } variant="body2">
				YITH is the world's leading independent company in the development of WooCommerce plugins.
			</Typography>
		</CardContent>
		<CardActions>
			<Button variant="text" short size="sm">Learn more</Button>
		</CardActions>
	</Card>
}

export const WithMedia: Story = {
	args: SimpleCard.args,
	render: ( args ) => <Card { ...args } sx={ { width: 345 } }>
		<CardMedia src="images/hillton-header.jpeg" sx={ { height: 170, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' } }>
			<IconButton fontSize="lg" sx={ { color: '#fff', margin: '4px' } }>
				<OutlinedHeartIcon width="1em"/>
			</IconButton>
		</CardMedia>
		<CardHeader
			title="Hillton room"
			endAdornment={
				<div style={ { display: "flex", alignItems: "center" } }>
					<Typography sx={ { fontSize: '20px', fontWeight: 500 } }>150 $</Typography>
					<Typography sx={ { fontSize: '12px', marginLeft: '8px' } }>/ day</Typography>
				</div>
			}
		/>
		<CardContent>
			<Typography variant="body2" color="text.secondary" align="center">
				Book a beautiful room in one Hillton's hotel!
			</Typography>
		</CardContent>
		<CardActions sx={ { justifyContent: 'center' } }>
			<Button variant="text" fullWidth>Book now</Button>
		</CardActions>
	</Card>
}
export const ComplexInteraction: Story = {
	args: SimpleCard.args,
	render: ( args ) => {
		const [ open, setOpen ] = useState( false );
		return <Card { ...args } sx={ { width: 345 } }>
			<CardHeader
				title="Albus Dumbledore"
				subtitle="Hogwarts headmaster"
				action={
					<IconButton size="lg">
						<EllipsisHorizontalIcon width="1em"/>
					</IconButton>
				}
			/>
			<CardMedia src="images/albus-silente.jpeg" sx={ { height: 150 } }/>
			<CardActions disableSpacing>
				<IconButton><HeartIcon width="1em"/></IconButton>
				<IconButton><ShareIcon width="1em"/></IconButton>
				<IconButton
					onClick={ () => setOpen( _ => !_ ) }
					sx={ { marginLeft: 'auto' } }
				>{ open ? <ChevronUpIcon width="1em"/> : <ChevronDownIcon width="1em"/> }</IconButton>
			</CardActions>
			<Collapse open={ open }>
				<CardContent>
					<Typography variant="body2" color="text.secondary" align="justify">
						Considered the most powerful wizard in the world, Dumbledore is benevolent and wise, a good wizard in the style of Merlin.
						He exudes an aura of serenity and composure, rarely displaying intense emotions of anger or fear.
						Yet despite his benign nature, it is said that Dumbledore is the only wizard Lord Voldemort ever truly feared.
					</Typography>
				</CardContent>
			</Collapse>

		</Card>
	}
}

export const HorizontalLayout: Story = {
	args: SimpleCard.args,
	render: ( args ) => {
		return <Card { ...args } sx={ { width: 400 } }>
			<Stack direction='row'>
				<CardMedia src="images/hozier.jpeg" sx={ { width: 150 } }/>
				<Stack direction='column' sx={ { flex: 1 } }>
					<CardHeader
						title="Take Me to Church"
						subtitle="Hozier"
					/>
					<CardActions sx={ { justifyContent: 'center' } } disableSpacing>
						<IconButton><BackwardIcon width="1.1em"/></IconButton>
						<IconButton size='lg'><PlayIcon width="1.2em"/></IconButton>
						<IconButton><ForwardIcon width="1.1em"/></IconButton>
					</CardActions>
				</Stack>
			</Stack>
		</Card>
	}
}

export const Custom: Story = {
	args: {
		...SimpleCard.args,
		variant: 'outlined',
		elevation: 2,
		size: 'lg',
		shadowColor: 'secondary'
	},
	render: ( args ) => {
		return <Grid gap={ 3 } sx={ { gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )' } }>
			{ [ 1, 2, 3, 4, 5, 6 ].map( _ => <Card { ...args }>
				<CardContent>
					<Stack direction='column' sx={ { flex: 1 } } spacing={ 4 }>
						<Stack direction='column' spacing={ 2 }>
							<Typography variant='h6' component='h3'>Feature { _ }</Typography>
							<Typography variant='body2' align='justify' sx={ { fontSize: '.85em' } }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
								aliquip ex ea commodo consequat.</Typography>
						</Stack>
						<Stack direction='row' align='center' justify='space-between' sx={ ( theme ) => ( { borderTop: '1px solid', borderColor: theme.palette.border.primary, paddingTop: theme.spacing( 2 ) } ) }>
							<label style={ { fontWeight: 500 } } htmlFor={ `enable-feature-${ _ }` }>Enable feature</label>
							<Switch id={ `enable-feature-${ _ }` } color='secondary'/>
						</Stack>
					</Stack>
				</CardContent>
			</Card> ) }
		</Grid>
	}
}
