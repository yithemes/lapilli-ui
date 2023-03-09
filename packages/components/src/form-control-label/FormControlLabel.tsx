import { generateComponentClasses, styled } from '@yith/styles';
import { forwardRef } from 'react';
import type { FormControlLabelOwnerState, FormControlLabelProps, FormControlLabelStyled } from "./types";
import Typography from "../typography";
import { capitalize } from "lodash";
import classNames from "classnames";
import React from 'react';

const useComponentClasses = ( ownerState: FormControlLabelOwnerState ) => {
	return generateComponentClasses(
		'FormControlLabel',
		{
			root: [ 'root', `--labelPlacement${ capitalize( ownerState.labelPlacement ) }` ],
			wrap: [ 'wrap' ],
			label: [ 'label' ],
			help: [ 'help' ]
		}
	)
}

const FormControlLabelRoot = styled( 'div', { name: 'FormControlLabel', slot: 'Root' } )<FormControlLabelStyled>( ( { ownerState } ) => ( {
	display: 'inline-flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	...( ownerState.fullWidth && {
		display: 'flex',
		width: '100%'
	} ),
} ) );

const FormControlLabelWrap = styled( 'label', { name: 'FormControlLabel', slot: 'Wrap' } )<FormControlLabelStyled>( ( { ownerState } ) => ( {
	display: 'inline-flex',
	alignItems: 'center',
	cursor: 'pointer',
	verticalAlign: 'middle',
	gap: 8,
	...( ownerState.fullWidth && {
		display: 'flex',
		width: '100%'
	} ),
	...( ownerState.labelPlacement === 'top' && {
		flexDirection: 'column',
		alignItems: 'flex-start'
	} ),
	...( ownerState.labelPlacement === 'bottom' && {
		flexDirection: 'column-reverse',
		alignItems: 'flex-start',
	} ),
	...( ownerState.labelPlacement === 'end' && {
		flexDirection: 'row-reverse',
	} ),
	...( ownerState.fullWidth && [ 'start', 'end' ].includes( ownerState.labelPlacement ) && {
		justifyContent: 'space-between'
	} ),
} ) );

const isTypography = ( element: React.ReactNode ) => {
	return element != null && typeof element === 'object' && "type" in element && element.type === Typography;
}

const FormControlLabel = forwardRef<HTMLDivElement, FormControlLabelProps>( function FormControlLabel(
	{
		children,
		className,
		label: labelProp,
		labelPlacement = 'start',
		labelTypographyProps,
		help: helpProp,
		helpTypographyProps,
		disableTypography = false,
		fullWidth = false,
		control,
		...other
	}, ref ) {

	const ownerState: FormControlLabelOwnerState = {
		labelPlacement,
		fullWidth
	};

	const classes = useComponentClasses( ownerState );

	let label = labelProp;

	if ( label != null && !isTypography( label ) && !disableTypography ) {
		label = <Typography
			variant="body"
			component="span"
			className={ classes.label }
			{ ...labelTypographyProps }
		>
			{ label }
		</Typography>
	}

	let help = helpProp;

	if ( help != null && !isTypography( help ) && !disableTypography ) {
		help = <Typography
			variant="body2"
			component="div"
			className={ classes.help }
			{ ...helpTypographyProps }
		>
			{ help }
		</Typography>
	}

	return <FormControlLabelRoot { ...other } ownerState={ ownerState } className={ classNames( classes.root, className ) } ref={ ref }>
		<FormControlLabelWrap ownerState={ ownerState } className={ classes.wrap }>
			{ label }
			{ control }
		</FormControlLabelWrap>
		{ help }
	</FormControlLabelRoot>
} );

export default FormControlLabel;
