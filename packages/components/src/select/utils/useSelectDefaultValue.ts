import type { SelectProps } from "../types";
import { useMemo } from "react";

type SelectDefaultValueProps = Required<Pick<SelectProps, 'multiple' | 'allowClear' | 'getOptionValue' | 'options'>>

export const useSelectDefaultValue = ( props: SelectDefaultValueProps ) => {
	const { multiple, allowClear, getOptionValue, options } = props;

	const enabledOptions = useMemo( () => options.filter( option => !( option?.disabled ?? false ) ), [ options ] );

	if ( multiple ) {
		return [];
	}

	if ( allowClear ) {
		return '';
	}

	if ( enabledOptions.length ) {
		return getOptionValue( enabledOptions[ 0 ] );
	}
	return '';
}