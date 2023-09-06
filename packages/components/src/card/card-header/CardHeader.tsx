import { generateComponentSlotClasses, styled } from '@lapilli-ui/styles';
import React, { forwardRef } from 'react';

import type { CardHeaderOwnerState, CardHeaderProps, CardHeaderStyled } from "./types";
import Typography from "../../typography";
import classNames from "classnames";
import { useCard } from "../context";

const classes = generateComponentSlotClasses(
	'CardHeader',
	[ 'root', 'content', 'startAdornment', 'endAdornment', 'action' ]
);

const CardHeaderRoot = styled( 'div', { name: 'CardHeader', slot: 'Root' } )<CardHeaderStyled>( ( { ownerState } ) => ( {
	display: 'flex',
	alignItems: 'center',
	padding: ownerState.card.sizing( 1 ),
	boxSizing: 'border-box',
} ) );

const CardHeaderContent = styled( 'div', { name: 'CardHeader', slot: 'Content' } )<CardHeaderStyled>( () => ( {
	flex: '1 1 auto',
} ) );

const CardHeaderStartAdornment = styled( 'div', { name: 'CardHeader', slot: 'StartAdornment' } )<CardHeaderStyled>( ( { ownerState } ) => ( {
	display: 'flex',
	flex: '0 0 auto',
	marginRight: ownerState.card.sizing( 1 ),
} ) );

const CardHeaderEndAdornment = styled( 'div', { name: 'CardHeader', slot: 'EndAdornment' } )<CardHeaderStyled>( ( { ownerState } ) => ( {
	display: 'flex',
	flex: '0 0 auto',
	marginLeft: ownerState.card.sizing( 1 ),
} ) );

const CardHeaderAction = styled( 'div', { name: 'CardHeader', slot: 'Action' } )<CardHeaderStyled>( ( { ownerState } ) => ( {
	flex: '0 0 auto',
	display: 'flex',
	alignItems: 'center',
	marginTop: -ownerState.card.sizing( 1 / 4 ),
	marginRight: -ownerState.card.sizing( 1 / 2 ),
	marginBottom: -ownerState.card.sizing( 1 / 4 ),
} ) );

const isTypography = ( element: React.ReactNode ) => {
	return element != null && typeof element === 'object' && "type" in element && element.type === Typography;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>( function CardHeader(
	{
		className,
		title: titleProp,
		subtitle: subtitleProp,
		startAdornment,
		endAdornment,
		titleTypographyProps,
		subtitleTypographyProps,
		startAdornmentProps,
		endAdornmentProps,
		action,
		disableTypography = false,
		...props
	},
	ref
) {

	let title = titleProp;

	if ( title != null && !isTypography( title ) && !disableTypography ) {
		title = <Typography
			variant="h5"
			color="text.primary"
			{ ...titleTypographyProps }
		>
			{ title }
		</Typography>
	}

	let subtitle = subtitleProp;
	if ( subtitle != null && !isTypography( subtitle ) && !disableTypography ) {
		subtitle = <Typography
			variant="h6"
			color="text.secondary"
			{ ...subtitleTypographyProps }
		>
			{ subtitle }
		</Typography>
	}

	const card = useCard();
	const ownerState: CardHeaderOwnerState = { card };

	return <CardHeaderRoot { ...props } ownerState={ ownerState } className={ classNames( className, classes.root ) } ref={ ref }>
		{ startAdornment && <CardHeaderStartAdornment { ...startAdornmentProps } ownerState={ ownerState } className={ classNames( startAdornmentProps?.className, classes.startAdornment ) }>{ startAdornment }</CardHeaderStartAdornment> }
		<CardHeaderContent ownerState={ ownerState } className={ classes.content }>
			{ title }
			{ subtitle }
		</CardHeaderContent>
		{ endAdornment && <CardHeaderEndAdornment { ...endAdornmentProps } ownerState={ ownerState } className={ classNames( endAdornmentProps?.className, classes.endAdornment ) }>{ endAdornment }</CardHeaderEndAdornment> }
		{ action && <CardHeaderAction ownerState={ ownerState } className={ classes.action }>{ action }</CardHeaderAction> }
	</CardHeaderRoot>
} );

export default CardHeader;
