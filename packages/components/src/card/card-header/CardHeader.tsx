import { generateComponentSlotClasses, styled } from '@yith/styles';
import React, { forwardRef } from 'react';

import type { CardHeaderProps } from "./types";
import Typography from "../../typography";
import classNames from "classnames";

const classes = generateComponentSlotClasses(
	'CardHeader',
	[ 'root', 'content', 'startAdornment', 'endAdornment', 'action' ]
);

const CardHeaderRoot = styled( 'div', { name: 'CardHeader', slot: 'Root' } )( () => ( {
	display: 'flex',
	alignItems: 'center',
	padding: 16,
} ) );

const CardHeaderContent = styled( 'div', { name: 'CardHeader', slot: 'Content' } )( () => ( {
	flex: '1 1 auto',
} ) );

const CardHeaderStartAdornment = styled( 'div', { name: 'CardHeader', slot: 'StartAdornment' } )( () => ( {
	display: 'flex',
	flex: '0 0 auto',
	marginRight: 16,
} ) );

const CardHeaderEndAdornment = styled( 'div', { name: 'CardHeader', slot: 'EndAdornment' } )( () => ( {
	display: 'flex',
	flex: '0 0 auto',
	marginLeft: 16,
} ) );

const CardHeaderAction = styled( 'div', { name: 'CardHeader', slot: 'Action' } )( () => ( {
	flex: '0 0 auto',
	display: 'flex',
	alignItems: 'center',
	marginTop: -4,
	marginRight: -8,
	marginBottom: -4,
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

	return <CardHeaderRoot { ...props } className={ classNames( className, classes.root ) } ref={ ref }>
		{ startAdornment && <CardHeaderStartAdornment { ...startAdornmentProps } className={ classNames( startAdornmentProps?.className, classes.startAdornment ) }>{ startAdornment }</CardHeaderStartAdornment> }
		<CardHeaderContent className={ classes.content }>
			{ title }
			{ subtitle }
		</CardHeaderContent>
		{ endAdornment && <CardHeaderEndAdornment { ...endAdornmentProps } className={ classNames( endAdornmentProps?.className, classes.endAdornment ) }>{ endAdornment }</CardHeaderEndAdornment> }
		{ action && <CardHeaderAction className={ classes.action }>{ action }</CardHeaderAction> }
	</CardHeaderRoot>
} );

export default CardHeader;
