import { alpha, styled } from "@yith/styles";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { forwardRef, useState } from "react";

import IconButton from "../../icon-button";
import { ZeroWidthSpace } from "../../utils";
import Spinner from "../../spinner";
import type { SelectToggleOwnerState, SelectToggleProps, SelectToggleStyled } from "../types";
import { useSelectContext } from "../context";

const ACTION_SPACING = '6px'; // spacing between actions.

const SelectToggleRoot = styled( 'div', { name: 'Select', slot: 'Toggle' } )<SelectToggleStyled>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	user-select: none;
	width: 100%;

	& > :not( style ) + :not( style ) {
		margin-left: 4px;
		margin-right: -2px;
	}

	${ ( { theme, ownerState } ) => {
		const { isOpen } = ownerState;
		const style: any = {
			borderRadius: theme.fields.borderRadius,
			padding: theme.fields.padding[ ownerState.size ],
			fontSize: theme.fields.fontSize,
			lineHeight: 1.5,
			background: theme.fields.background,
			color: theme.fields.color,
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: theme.fields.borderColor,
			'&:focus, &:focus-visible': {
				borderColor: theme.fields.focusedBorderColor,
				boxShadow: theme.fields.focusedBoxShadow,
				outline: 'none'
			},
		};

		if ( isOpen ) {
			style.borderColor = theme.fields.focusedBorderColor;
			style.boxShadow = theme.fields.focusedBoxShadow;
		}

		return style;
	} };
`;
const SelectToggleLabel = styled( 'span', { name: 'Select', slot: 'ToggleLabel' } )`
	flex: 1;
	min-width: 0;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const SelectTogglePlaceholder = styled( 'span', { name: 'Select', slot: 'TogglePlaceholder' } )( ( { theme } ) => ( {
	flex: 1,
	minWidth: 0,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	color: theme.fields.placeholderColor
} ) );

const SelectToggleTags = styled( 'div', { name: 'Select', slot: 'ToggleTags' } )`
	flex: 1;
	display: inline-flex;
	flex-wrap: wrap;
	align-items: center;
	margin: -5px 0 -5px -9px;
`;

const SelectToggleTag = styled( 'div', { name: 'Select', slot: 'ToggleTag' } )( ( { theme } ) => ( {
	display: 'inline-flex',
	alignItems: 'center',
	borderRadius: '50px',
	background: theme.palette.action.selected,
	margin: '4px',
	height: '23px',
} ) );

const SelectToggleHiddenTagsCount = styled( 'div', { name: 'Select', slot: 'ToggleHiddenTagsCount' } )( () => ( {
	margin: '4px',
} ) );

const SelectToggleTagLabel = styled( 'span', { name: 'Select', slot: 'ToggleTagLabel' } )`
	padding: 0 8px 0 12px;
	font-size: 0.9em;
`;

const SelectToggleTagRemove = styled( XMarkIcon, { name: 'Select', slot: 'ToggleTagRemove' } )(
	( { theme } ) => ( {
		width: '1em',
		fontSize: '17px',
		borderRadius: '50%',
		padding: '2px',
		marginRight: '5px',
		background: theme.palette.action.selected,
		boxSizing: 'border-box',
		'&:hover': {
			background: alpha(
				theme.palette.action.selected!,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
			),
		},
	} )
);

const SelectToggleActions = styled( 'div', { name: 'Select', slot: 'Toggle' } )`
	display: flex;
	align-items: center;
	box-sizing: border-box;
`;

const SelectToggleSpinner = styled( 'span', { name: 'Select', slot: 'ToggleSpinner' } )`
	display: inline-flex;
	margin-right: ${ ACTION_SPACING };
`;

const SelectToggleClear = styled( IconButton, { name: 'Select', slot: 'ToggleClear' } )`
	font-size: 15px;
	padding: 4px;
	margin: -4px;

	& > svg {
		width: 1em;
	}
`;

const SelectToggleExpand = styled( 'span', { name: 'Select', slot: 'ToggleExpand' } )<SelectToggleStyled>(
	( { theme, ownerState } ) => ( {
		display: 'inline-flex',
		fontSize: '20px',
		opacity: 0.4,
		marginLeft: ACTION_SPACING,
		marginRight: -4,
		...( ownerState.isOpen && {
			opacity: 1,
			color: theme.fields.focusedBorderColor,
		} ),
		'& > svg': {
			width: '1em',
		}
	} )
);

const SelectToggle = forwardRef<HTMLDivElement, SelectToggleProps>(
	(
		{ label, placeholder, onToggle, isEmpty, allowClear, onClear, isOpen }, ref ) => {
		const [ isFocused, setIsFocused ] = useState( false );
		const { size, showTags, limitTags, getOptionValue, getOptionLabel, selectedOptions, deselectOption, isLoading } = useSelectContext();
		const ownerState: SelectToggleOwnerState = {
			isOpen,
			isEmpty,
			isFocused,
			size
		};

		let display = <SelectToggleLabel>{ label }</SelectToggleLabel>;
		if ( isEmpty ) {
			display = <SelectTogglePlaceholder>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>;
		}
		if ( showTags ) {
			const tagsToShow = !isFocused && !isOpen && limitTags > 0 ? selectedOptions.slice( 0, limitTags ) : selectedOptions;
			const hiddenTags = selectedOptions.length - tagsToShow.length;
			display = (
				<>
					{ !!selectedOptions.length ? (
						<SelectToggleTags>
							{ tagsToShow.map( ( option ) => {
								const tagKey = getOptionValue( option );
								const tagLabel = getOptionLabel( option );
								return (
									<SelectToggleTag key={ tagKey }>
										<SelectToggleTagLabel>{ tagLabel }</SelectToggleTagLabel>
										<SelectToggleTagRemove
											onClick={ ( e: React.MouseEvent ) => {
												e.stopPropagation();
												deselectOption( option );
											} }
										/>
									</SelectToggleTag>
								);
							} ) }
							{ !!hiddenTags && <SelectToggleHiddenTagsCount>{ ` +${ hiddenTags }` }</SelectToggleHiddenTagsCount> }
						</SelectToggleTags>
					) : (
						<SelectTogglePlaceholder>{ !!placeholder ? placeholder : <ZeroWidthSpace/> }</SelectTogglePlaceholder>
					) }
				</>
			);
		}

		return (
			<SelectToggleRoot
				ref={ ref }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ () => setIsFocused( false ) }
				onClick={ onToggle }
				ownerState={ ownerState }
				aria-expanded={ isOpen ? 'true' : 'false' }
				aria-haspopup="listbox"
				role="combobox"
				tabIndex={ 0 }
			>
				{ !!display ? display : <ZeroWidthSpace/> }

				<SelectToggleActions>
					{ isLoading && (
						<SelectToggleSpinner>
							<Spinner size={ 16 }/>
						</SelectToggleSpinner>
					) }

					{ allowClear && !isEmpty && !showTags && (
						<SelectToggleClear
							onClick={ ( e: React.MouseEvent ) => {
								e.stopPropagation();
								onClear();
							} }
						>
							<XMarkIcon/>
						</SelectToggleClear>
					) }

					<SelectToggleExpand ownerState={ ownerState }>
						<ChevronUpDownIcon/>
					</SelectToggleExpand>
				</SelectToggleActions>
			</SelectToggleRoot>
		);
	}
);

export default SelectToggle;