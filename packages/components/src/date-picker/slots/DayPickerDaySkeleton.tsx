import { styled } from "@lapilli-ui/styles";
import React from "react";

import Skeleton from "../../skeleton";

const DAY_SIZE = 36;
const DAY_MARGIN = 2;

const DayPickerDaySkeletonRoot = styled( 'div', { name: 'DayPicker', slot: 'DaySkeleton' } )( () => ( {
	width: DAY_SIZE,
	height: DAY_SIZE,
	margin: DAY_MARGIN,
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	border: 0,
	lineHeight: '1em',
	userSelect: 'none',
	outline: 0,
} ) );


const DayPickerDaySkeleton = ( { visible }: { visible: boolean } ) => {
	return <DayPickerDaySkeletonRoot>
		{ visible && <Skeleton variant='circular' width={ 8 } height={ 8 }/> }
	</DayPickerDaySkeletonRoot>

};

export default DayPickerDaySkeleton;
