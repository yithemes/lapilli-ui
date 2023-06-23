import type { Breakpoint } from "../theme";
import useTheme from "./useTheme";

type BreakpointProps<PropValue> = {
	[key in Breakpoint]?: PropValue | null
}

export default function useBreakpointProps<PropValue>( props: Record<string, any> ) {
	const { breakpoints } = useTheme();
	const other = { ...props };
	const breakpointProps: BreakpointProps<PropValue> = {};

	( Object.keys( breakpoints.values ) as Breakpoint[] ).forEach( ( breakpoint ) => {
		if ( other[ breakpoint ] != null ) {
			breakpointProps[ breakpoint ] = other[ breakpoint ];
			delete other[ breakpoint ];
		}
	} );

	return [ breakpointProps, other ];
}