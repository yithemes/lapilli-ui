import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from "..";
import CardHeader from "../card-header";
import CardMedia from "../card-media";
import CardActions from "../card-actions";
import CardContent from "../card-content";

import IconButton from "../../icon-button";
import Collapse from "../../collapse";
import Typography from "../../typography";
import { ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import Stack from "../../stack";
import Button from "../../button";

const meta: ComponentMeta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
};

export default meta;

const SimpleCardTemplate: ComponentStory<typeof Card> = ( args ) => {
	return <Card { ...args } sx={ { width: 300 } }>
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
};

export const SimpleCard: ComponentStory<typeof Card> = SimpleCardTemplate.bind( {} );

const WithMediaTemplate: ComponentStory<typeof Card> = ( args ) => {
	return <Card { ...args } sx={ { width: 345 } }>
		<CardMedia src="images/hillton-header.jpeg" sx={ { height: 170, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' } }>
			<IconButton size="sm" fontSize="25px" sx={ { color: '#fff', margin: '8px' } }>
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
};

export const WithMedia: ComponentStory<typeof Card> = WithMediaTemplate.bind( {} );

const ComplexInteractionTemplate: ComponentStory<typeof Card> = ( args ) => {
	const [ open, setOpen ] = useState( false );
	return <Card { ...args } sx={ { width: 345 } }>
		<CardHeader
			title="Albus Dumbledore"
			subtitle="Hogwarts headmaster"
			action={
				<IconButton fontSize="xl">
					<EllipsisHorizontalIcon width="1em"/>
				</IconButton>
			}
		/>
		<CardMedia src="images/albus-silente.jpeg" sx={ { height: 150 } }/>
		<CardActions disableSpacing>
			<IconButton fontSize="xl"><HeartIcon width="1em"/></IconButton>
			<IconButton fontSize="xl"><ShareIcon width="1em"/></IconButton>
			<IconButton
				fontSize="xl"
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
};

export const ComplexInteraction: ComponentStory<typeof Card> = ComplexInteractionTemplate.bind( {} );

ComplexInteraction.args = {
	variant: 'elevation',
	raised: false
}