import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { addDays, endOfMonth, format, getDateFormat, isAfter, isSameDay, startOfMonth } from "@lapilli-ui/date";

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
	title: 'Components/Experimental/DatePicker',
	component: DatePicker,
	parameters:{
		docs:{
			description:{
				story: 'By using the experimental `slots` prop of the DatePicker, you can customize its behavior, for example, to create a DateRangePicker component.',
			}
		}
	},
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
	currentDateType: false | 'start' | 'start-only' | 'inside' | 'end' | 'inside-month-start' | 'inside-month-end'
	isSelecting: boolean
}

const RangeDayPickerDayRoot = styled( 'div', { name: 'RangeDayPicker', slot: 'Day' } )<{ ownerState: RangePickerDayOwnerState }>( ( { ownerState, theme } ) => {
	const selectingBorder: CSSProperties['border'] = `1px dashed ${ theme.palette.primary.main }`
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

			...( !ownerState.isSelecting && ( ownerState.currentDateType === 'start' || ownerState.currentDateType === 'start-only' || !ownerState.isDisabled ) && {
				background: alpha( theme.palette.primary.main, theme.palette.action.selectedOpacity ),
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
				borderRadius: 0
			} ),
			...( ownerState.isSelecting && {
				position: 'relative',
				'&:after': {
					content: '""',
					display: 'block',
					position: 'absolute',
					top: 0,
					left: 0,
					width: 'calc(100% - 1px)',
					height: 'calc(100% - 1px)',
					borderRadius: 'inherit',
					border: selectingBorder,
					margin: -1,
					...( ( ownerState.currentDateType === 'start' || ownerState.currentDateType === 'inside-month-start' ) && {
						borderRight: 0
					} ),
					...( ( ownerState.currentDateType === 'end' || ownerState.currentDateType === 'inside-month-end' ) && {
						borderLeft: 0
					} ),
					...( ownerState.currentDateType === 'inside' && {
						borderRight: 0,
						borderLeft: 0,
					} )
				},
				'&:first-of-type:after': {
					borderLeft: selectingBorder,
				},
				'&:last-of-type:after': {
					borderRight: selectingBorder,
				},

			} ),
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
		...( ownerState.isDisabled && {
			opacity: theme.palette.action.disabledOpacity,
			cursor: 'default',
			pointerEvents: 'none'
		} ),
		...( !ownerState.isSelecting && {
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
			...( ownerState.isDatePickerDisabled && {
				cursor: 'not-allowed'
			} ),
			...( ( ( ownerState.currentDateType === 'start' || ownerState.currentDateType === 'start-only' ) || ( !ownerState.isDisabled && ownerState.currentDateType === 'end' ) ) && {
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
		} )
	}
} );

/**
 * RangePicker :-D
 */
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
		currentDateType: false,
		isSelecting: Boolean( !to && ( from || hoverDate ) )
	};

	const currentTo = to || hoverDate;

	if ( from ) {
		const isSelectingOrSelected = ( hoverDate && isAfter( hoverDate, from ) ) || to;
		if ( from && isSameDay( from, day ) ) {
			ownerState.currentDateType = isSelectingOrSelected ? 'start' : 'start-only';
		} else if ( currentTo && isSameDay( currentTo, day ) && ( to || ( hoverDate && isAfter( hoverDate, from ) ) ) ) {
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
		data-data-type-debug={ ownerState.currentDateType }
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

export const DateRangePicker: Story = {
	args: {},
	render: () => {
		const [ from, setFrom ] = useState<Date | null>( null );
		const [ to, setTo ] = useState<Date | null>( null );
		const [ hoverDate, setHoverDate ] = useState<Date | null>( null );
		const [ isLoading, setIsLoading ] = useState( false );
		const timeout = useRef<any>( null );

		const handleChange = ( date: Date | null ) => {
			if ( !from || to ) {
				setFrom( date );
				setTo( null );
			} else {
				setTo( date );
			}
		}

		const handleMonthChange = () => {
			if ( timeout.current ) {
				clearTimeout( timeout.current );
			}
			setIsLoading( true );
			timeout.current = setTimeout( () => setIsLoading( false ), 300 )
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
					onMonthChange={ handleMonthChange }
					isLoading={ isLoading }
				/>
			</VStack>
		</Context.Provider>
	}
}