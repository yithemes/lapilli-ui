import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { addDays, endOfMonth, format, getDateFormat, isSameDay, startOfMonth } from "@lapilli-ui/date";

import DatePicker from '../';
import VStack from "../../v-stack";
import Paper from "../../paper";
import Box from "../../box";
import HStack from "../../h-stack";
import type { PickerDayProps } from "@lapilli-ui/components";
import { alpha, styled } from "@lapilli-ui/styles";
import type { PickerDayOwnerState } from "@lapilli-ui/components";
import { useDatePickerContext } from "../context";

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker/WIP',
	component: DatePicker,
	argTypes: {
		value: {
			control: 'date'
		},
		shouldDisableDate: { control: false },
		startAdornment: { control: false }
	}
};

export default meta;

type Story = StoryObj<typeof DatePicker>

const formatDate = ( date: Date ) => format( getDateFormat( 'fullDate' ), date );

const DAY_SIZE = 40;
const DAY_MARGIN = '1px 0';

const RangeDayPickerDayFiller = styled( 'div', { name: 'RangeDayPicker', slot: 'DayFiller' } )( () => ( {
	width: DAY_SIZE,
	height: DAY_SIZE,
	margin: DAY_MARGIN,
	textAlign: 'center',
	display: 'flex',
} ) );

type RangePickerDayOwnerState = PickerDayOwnerState & {
	currentDateType: false | 'start' | 'inside' | 'end' | 'inside-month-start' | 'inside-month-end'
}

const RangeDayPickerDayRoot = styled( 'div', { name: 'RangeDayPicker', slot: 'Day' } )<{ ownerState: RangePickerDayOwnerState }>( ( { ownerState, theme } ) => {
	return {
		width: DAY_SIZE,
		height: DAY_SIZE,
		margin: DAY_MARGIN,
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		border: 0,
		cursor: 'pointer',
		lineHeight: '1em',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		userSelect: 'none',
		outline: 0,
		background: alpha( theme.palette.primary.main, 0 ),
		'&:first-of-type': {
			borderTopLeftRadius: '50%',
			borderBottomLeftRadius: '50%',
		},
		'&:last-of-type': {
			borderTopRightRadius: '50%',
			borderBottomRightRadius: '50%',
		},
		...( !!ownerState.currentDateType && {
			...( ( ownerState.currentDateType === 'start' || !ownerState.isDisabled ) && {
				background: alpha( theme.palette.primary.main, theme.palette.action.hoverOpacity ),
			} ),
			...( ( ownerState.currentDateType === 'start' || ownerState.currentDateType === 'inside-month-start' ) && {
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
			} ),
			...( ( ownerState.currentDateType === 'end' || ownerState.currentDateType === 'inside-month-end' ) && {
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
			} ),
			...( ownerState.currentDateType === 'inside' && {
				borderRadius: 0,
			} )
		} ),
	}
} );

const RangeDayPickerDayNumber = styled( 'div', { name: 'RangeDayPicker', slot: 'DayNumber' } )<{ ownerState: RangePickerDayOwnerState }>( ( { ownerState, theme } ) => {
	const backgroundColor = ( ownerState.isSelected && !ownerState.isDisabled ? theme.palette.primary.main : theme.palette.action.active ) ?? '#000';

	return {
		width: '100%',
		height: '100%',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		border: 0,
		cursor: 'pointer',
		lineHeight: '1em',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		userSelect: 'none',
		outline: 0,
		background: alpha( backgroundColor, 0 ),
		...( ownerState.isDisabled && {
			opacity: theme.palette.action.disabledOpacity,
			cursor: 'default',
			pointerEvents: 'none'
		} ),
		...( !ownerState.isDisabled && ownerState.isSelected && {
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			fontWeight: 600,
			...( !ownerState.isDatePickerDisabled && {
				'&:hover, &:focus': {
					background: theme.palette.primary.light,
				},
			} )
		} ),
		...( !ownerState.isDatePickerDisabled && ( ownerState.isDisabled || !ownerState.isSelected ) && {
			'&:hover': {
				background: alpha( backgroundColor, theme.palette.action.hoverOpacity ),
			},
			'&:focus': {
				background: alpha( backgroundColor, theme.palette.action.focusOpacity ),
				'&:hover': {
					background: alpha( backgroundColor, theme.palette.action.hoverOpacity + theme.palette.action.focusOpacity ),
				},
			},
		} ),
		...( ownerState.isDatePickerDisabled && {
			cursor: 'not-allowed'
		} ),
		...( ( ownerState.currentDateType === 'start' || ( !ownerState.isDisabled && ownerState.currentDateType === 'end' ) ) && {
			opacity: 1,
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			fontWeight: 600,
			'&:hover,&:focus': {
				background: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
				fontWeight: 600,
				opacity: 1
			},
		} )
	}
} );

const RangeDayPickerDay = ( props: PickerDayProps ) => {
	const ref = useRef<HTMLDivElement>( null );
	const {
		className,
		autoFocus = false,
		day,
		isOutsideCurrentMonth,
		isSelected,
		isDisabled,
		onClick,
		onDaySelect,
		onKeyDown,
		onFocus,
		onBlur,
		...other
	} = props;

	const { isDatePickerDisabled } = useDatePickerContext();
	const { from, to, hoverDate, setHoverDate } = React.useContext( Context );

	const ownerState: RangePickerDayOwnerState = {
		isDisabled,
		isSelected,
		isOutsideCurrentMonth,
		isDatePickerDisabled,
		currentDateType: false
	};

	const currentTo = to || hoverDate;

	if ( from ) {
		if ( from && isSameDay( from, day ) ) {
			ownerState.currentDateType = 'start'
		} else if ( currentTo && isSameDay( currentTo, day ) ) {
			ownerState.currentDateType = 'end'
		} else if ( from && currentTo && day < currentTo && day > from ) {
			ownerState.currentDateType = 'inside'
			if ( isSameDay( day, startOfMonth( day ) ) ) {
				ownerState.currentDateType = 'inside-month-start'
			} else if ( isSameDay( day, endOfMonth( day ) ) ) {
				ownerState.currentDateType = 'inside-month-end'
			}
		}
	}

	useEffect( () => {
		// Use timeout to prevent issues with screen-readers when moving to next/prev month/year.
		setTimeout( () => {
			autoFocus && !isOutsideCurrentMonth && ref.current && ref.current.focus()
		}, 10 )
	}, [ autoFocus, isOutsideCurrentMonth ] )

	if ( isOutsideCurrentMonth ) {
		return <RangeDayPickerDayFiller role="gridcell"/>
	}

	return <RangeDayPickerDayRoot
		className={ className }
		ownerState={ ownerState }
		onClick={ ( e ) => {
			if ( isDatePickerDisabled ) {
				return;
			}
			!isDisabled && onDaySelect?.( day );
			onClick?.( e, day );
		} }
		onKeyDown={ ( e ) => !isDatePickerDisabled && onKeyDown?.( e, day ) }
		onFocus={ ( e ) => !isDatePickerDisabled && onFocus?.( e, day ) }
		onBlur={ ( e ) => !isDatePickerDisabled && onBlur?.( e, day ) }
		onMouseEnter={ _ => setHoverDate( day ) }
		onMouseLeave={ _ => setHoverDate( null ) }
		ref={ ref }
		aria-selected={ isSelected }
		// @ts-ignore
		autoFocus={ autoFocus }
		{ ...( ( isDisabled || isDatePickerDisabled ) && { 'aria-disabled': true, disabled: true } ) }
		{ ...other }
	>
		<RangeDayPickerDayNumber ownerState={ ownerState }>
			{ format( getDateFormat( 'dayOfMonth' ), day ) }
		</RangeDayPickerDayNumber>
	</RangeDayPickerDayRoot>

};


type ContextValue = {
	from: Date | null
	to: Date | null
	hoverDate: Date | null
	setHoverDate: React.Dispatch<React.SetStateAction<Date | null>>
}

const Context = React.createContext<ContextValue>( {} as ContextValue );

export const Range: Story = {
	args: {},
	render: () => {
		const [ from, setFrom ] = useState<Date | null>( null );
		const [ to, setTo ] = useState<Date | null>( null );
		const [ hoverDate, setHoverDate ] = useState<Date | null>( null );

		const handleChange = ( date: Date | null ) => {
			if ( !from || to ) {
				setFrom( date );
				setTo( null );
			} else {
				setTo( date );
			}
		}

		const minDate = !to && from ? addDays( from, 1 ) : null;

		return <Context.Provider value={ { from, to, hoverDate, setHoverDate } }>
			<VStack spacing={ 2 }>
				<Paper variant='outlined' sx={ ( theme ) => ( { width: 306, fontSize: theme.fields.fontSize } ) }>
					<HStack>
						<VStack sx={ ( theme ) => ( { padding: theme.fields.padding.md, flex: 1, borderRightColor: theme.palette.border.primary, borderRightStyle: 'solid', borderRightWidth: 1 } ) } spacing={ .5 }>
							<Box sx={ { fontSize: '.9em', fontWeight: 600 } }>From</Box>
							<Box>{ from ? formatDate( from ) : '-' }</Box>
						</VStack>
						<VStack sx={ ( theme ) => ( { padding: theme.fields.padding.md, flex: 1 } ) } spacing={ .5 }>
							<Box sx={ { fontSize: '.9em', fontWeight: 600 } }>To</Box>
							<Box>{ to ? formatDate( to ) : '-' }</Box>
						</VStack>
					</HStack>
				</Paper>
				<DatePicker
					value={ !to ? from : to }
					onChange={ handleChange }
					minDate={ minDate }
					allowClear
					isStatic
					slots={ {
						Day: RangeDayPickerDay
					} }
				/>
			</VStack>
		</Context.Provider>
	}
}