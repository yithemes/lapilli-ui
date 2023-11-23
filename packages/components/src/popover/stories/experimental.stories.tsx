import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Popover from "..";
import Paper from "../../paper";
import HStack from "../../h-stack";
import Typography from "../../typography";
import Button from "../../button";

const meta: Meta<typeof Popover> = {
	title: 'Components/Experimental/Popover',
	component: Popover,
	argTypes: {
		forceInView: {
			control: { type: 'radio' },
			options: [ false, true, 'horizontally', 'vertically' ],
		}
	}
};

export default meta;
type Story = StoryObj<typeof Popover>

export const Default: Story = {
	args: {
		position: 'bottom left',
		verticalMargin: 8,
		forceMinWidth: false,
		forceInView: true,
		fixed: false,
		disablePortal: false,
	},
	render: ( args ) => {
		const anchorRef = useRef<HTMLButtonElement | null>( null );
		const [ anchorRefValue, setAnchorRefValue ] = useState<HTMLElement | undefined>( undefined )

		useEffect( () => {
			setAnchorRefValue( anchorRef?.current ?? undefined )
		}, [] )

		return <>
			<HStack align='center' justify='center' sx={ { height: '300px' } }>
				<Button ref={ anchorRef } >I'm the anchor element</Button>
				<Popover { ...args } anchorRef={ anchorRefValue }>
					<Paper elevation={ 3 } variant='outlined' sx={ { padding: 16 } }>
						<Typography>
							I'm the Popover!
						</Typography>
					</Paper>
				</Popover>
			</HStack>
		</>
	}
}