import { styled, SxProps } from '@yith/styles';
import React, { forwardRef } from 'react';

type FormControlProps = React.ComponentProps<'div'> & {
	label: string;
	htmlFor?: string;
	help?: React.ReactNode;
	sx?: SxProps;
};

const FormControlRoot = styled( 'div', { name: 'FormControl', slot: 'Root' } )`
	display: flex;
	align-items: baseline;
	margin: 15px 0 35px;
`;

const FormControlLabel = styled( 'label', { name: 'FormControl', slot: 'Label' } )`
	width: 135px;
	margin-right: 10px;
	flex: 0 0 135px;
`;

const FormControlContent = styled( 'div', { name: 'FormControl', slot: 'Content' } )`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const FormControlHelp = styled( 'div', { name: 'FormControl', slot: 'Help' } )`
	font-size: 0.95em;
	margin-top: 7px;
`;

const FormControl = forwardRef<HTMLDivElement, FormControlProps>( function FormControl(
	{
		children,
		label,
		htmlFor = '',
		help = '',
		...other
	},
	ref
) {
	return (
		<FormControlRoot ref={ ref } { ...other }>
			<FormControlLabel htmlFor={ htmlFor }>{ label }</FormControlLabel>
			<FormControlContent>
				{ children }
				{ !!help && <FormControlHelp>{ help }</FormControlHelp> }
			</FormControlContent>
		</FormControlRoot>
	);
} );

export default FormControl;
