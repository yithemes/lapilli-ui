import { styled } from '@yith/styles';
import React, { forwardRef } from 'react';

import type { CardHeaderProps } from "./types";
import Typography from "../../typography";

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
			variant="body"
			color="text.primary"
			component="div"
			{ ...titleTypographyProps }
		>
			{ title }
		</Typography>
	}

	let subtitle = subtitleProp;
	if ( subtitle != null && !isTypography( subtitle ) && !disableTypography ) {
		subtitle = <Typography
			variant="body2"
			color="text.secondary"
			component="div"
			{ ...subtitleTypographyProps }
		>
			{ subtitle }
		</Typography>
	}

	return <CardHeaderRoot { ...props } ref={ ref }>
		{ startAdornment && <CardHeaderStartAdornment { ...startAdornmentProps }>{ startAdornment }</CardHeaderStartAdornment> }
		<CardHeaderContent>
			{ title }
			{ subtitle }
		</CardHeaderContent>
		{ endAdornment && <CardHeaderEndAdornment { ...endAdornmentProps }>{ endAdornment }</CardHeaderEndAdornment> }
		{ action && <CardHeaderAction>{ action }</CardHeaderAction> }
	</CardHeaderRoot>
} );

export default CardHeader;
