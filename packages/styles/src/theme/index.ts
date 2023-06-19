import { merge, cloneDeep } from 'lodash';
import type React from 'react';
import { useTheme as emotionUseTheme } from "@emotion/react";
import { createGlows, createShadows } from "../utils";

export type PaletteClass = 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success';
export type FieldSize = 'sm' | 'md' | 'lg' | 'xl';

type StandardPalette = {
	main: NonNullable<React.CSSProperties[ 'color' ]>;
	light: NonNullable<React.CSSProperties[ 'color' ]>;
	contrastText: NonNullable<React.CSSProperties[ 'color' ]>;
};

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveStyleValue<T> = T | Partial<Record<Breakpoint | string, T>>;

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body2';

export interface DefaultThemeOptions {
	vars?: object;
	mode: 'light' | 'dark',
	breakpoints: {
		values: Record<Breakpoint, number>;
		unit: string;
	};
	palette: Record<PaletteClass, StandardPalette> & {
		border: {
			primary: NonNullable<React.CSSProperties[ 'borderColor' ]>
			secondary: NonNullable<React.CSSProperties[ 'borderColor' ]>;
		};
		action: {
			active: NonNullable<React.CSSProperties[ 'color' ]>;
			hoverOpacity: number;
			selected: NonNullable<React.CSSProperties[ 'color' ]>;
			selectedOpacity: number;
			disabled: NonNullable<React.CSSProperties[ 'color' ]>;
			disabledBackground: NonNullable<React.CSSProperties[ 'color' ]>;
			disabledOpacity: number;
			focusOpacity: number;
		};
		background: {
			default: NonNullable<React.CSSProperties[ 'backgroundColor' ]>;
			dropdown: NonNullable<React.CSSProperties[ 'backgroundColor' ]>;
			paper: NonNullable<React.CSSProperties[ 'backgroundColor' ]>;
			backdrop: NonNullable<React.CSSProperties[ 'backgroundColor' ]>;
		};
		text: {
			primary: NonNullable<React.CSSProperties[ 'color' ]>
			secondary: NonNullable<React.CSSProperties[ 'color' ]>
		},
		grey: Record<number, NonNullable<React.CSSProperties['color']>>
	};
	shape: {
		borderRadius: NonNullable<React.CSSProperties[ 'borderRadius' ]>;
	};
	baseSpacing: number;
	fields: {
		borderRadius: NonNullable<React.CSSProperties[ 'borderRadius' ]>;
		borderColor: NonNullable<React.CSSProperties[ 'borderColor' ]>;
		padding: Record<FieldSize, NonNullable<React.CSSProperties[ 'padding' ]>>;
		fontFamily: NonNullable<React.CSSProperties[ 'fontFamily' ]>
		fontSize: NonNullable<React.CSSProperties[ 'fontSize' ]>;
		background: NonNullable<React.CSSProperties[ 'background' ]>;
		color: NonNullable<React.CSSProperties[ 'color' ]>;
		placeholderColor: NonNullable<React.CSSProperties[ 'color' ]>;
		focusedBorderColor: NonNullable<React.CSSProperties[ 'borderColor' ]>;
		focusedBoxShadow: NonNullable<React.CSSProperties[ 'boxShadow' ]>;
	};
	zIndex: {
		modal: number
	}
	typography: Record<TypographyVariant, React.CSSProperties> & {
		fontFamily: NonNullable<React.CSSProperties[ 'fontFamily' ]>
	}
	shadows: {
		primary: React.CSSProperties[ 'boxShadow' ][ ],
		secondary: React.CSSProperties[ 'boxShadow' ][ ],
		primaryGlow: React.CSSProperties[ 'boxShadow' ][ ],
		secondaryGlow: React.CSSProperties[ 'boxShadow' ][ ],
	}
	components: {
		[ component: string ]: {
			[ slot: string ]: React.CSSProperties | ( ( props: any ) => React.CSSProperties );
		};
	};

	__yithUI: boolean
}

export interface Theme extends DefaultThemeOptions {
	spacing: ( theSpacing: string | number ) => string
	color: ( themeColor: ThemeColor ) => string
	breakpoints: DefaultThemeOptions[ 'breakpoints' ] & {
		up: ( key: Breakpoint ) => string
		stylize: <T extends any>( value: ResponsiveStyleValue<T>, stylize: ( value: T, breakpoint?: Breakpoint ) => any ) => any
		isBreakpoint: ( breakpoint: any ) => breakpoint is Breakpoint
	}
}

type PathOf<T, Key extends keyof T = keyof T> = Key extends string ? T[Key] extends Record<string, any> ? `${ Key }.${ PathOf<T[Key]> }` : `${ Key }` : never;
type CompletePathOf<T, Key extends keyof T = keyof T> = Key extends string ? ( T[Key] extends Record<string, any> ? `${ Key }.${ PathOf<T[Key]> }` : `${ Key }` ) | Key : never;

type AvailableColors = PaletteClass | 'background' | 'text' | 'border';
export type ThemeColor = PathOf<Theme['palette'], AvailableColors>

const primaryRgbShadow = [ 24, 53, 62 ];
const secondaryRgbShadow = [ 145, 191, 227 ];

export const defaultThemeOptions: DefaultThemeOptions = {
	mode: 'light',
	breakpoints: {
		values: {
			xs: 0, // Phone
			sm: 600, // Tablet
			md: 900, // Small laptop
			lg: 1200, // Desktop
			xl: 1536, // Large screen
		},
		unit: 'px',
	},
	palette: {
		primary: {
			main: '#00779b',
			light: '#0094c4',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#a7ab06',
			light: '#d0d515',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#e58a05',
			light: '#f8a429',
			contrastText: '#ffffff',
		},
		error: {
			main: '#c41d04',
			light: '#dd2105',
			contrastText: '#ffffff',
		},
		info: {
			main: '#0087b3',
			light: '#0094c4',
			contrastText: '#ffffff',
		},
		success: {
			main: '#94aa09',
			light: '#7f9208',
			contrastText: '#ffffff',
		},
		border: {
			primary: '#cbd5e1',
			secondary: '#d7e3e7',
		},
		action: {
			active: 'rgba( 0, 0, 0, 0.5 )', // Color of active action (ex: icon button).
			hoverOpacity: 0.04, // Opacity of hovered action background.
			selected: 'rgba( 48, 80, 124, 0.08 )', // Color of selected action (ex: background in tags in select multiple).
			selectedOpacity: 0.08, // Opacity of selected action background (ex: option in select field).
			disabled: 'rgba(0, 0, 0, 0.26)', // Color of disabled action.
			disabledBackground: 'rgba(0, 0, 0, 0.12)', // Background of disabled action.
			disabledOpacity: 0.38,
			focusOpacity: 0.12,
		},
		background: {
			default: '#ffffff',
			dropdown: '#ffffff',
			paper: '#ffffff',
			backdrop: 'rgba(29, 52, 70, 0.64)',
		},
		text: {
			primary: 'rgba(0,0,0,0.87)',
			secondary: 'rgba(0,0,0,0.6)',
		},
		grey: {
			50: '#f2f5f8',
			100: '#edf1f4',
			200: '#e2e8f0',
			300: '#a8c8e1',
			400: '#9db4c8',
			500: '#94a3b8',
			600: '#7b8fa0',
			700: '#607382',
			800: '#455361',
			900: '#2b353e',
		}
	},
	shape: {
		borderRadius: '8px',
	},
	baseSpacing: 8,
	fields: {
		borderRadius: '8px',
		borderColor: '#cbd5e1',
		padding: {
			sm: '5px 14px',
			md: '8.5px 15px',
			lg: '13px 18px',
			xl: '16.5px 20px',
		},
		fontFamily: 'inherit',
		fontSize: '14px',
		background: '#ffffff',
		color: '#333333',
		focusedBorderColor: '#00779b',
		focusedBoxShadow: 'none',
		placeholderColor: 'rgba(30, 30, 30, 0.62)'
	},
	zIndex: {
		modal: 100000
	},
	typography: {
		fontFamily: 'inherit',
		h1: {
			fontWeight: 400,
			fontSize: '2.5rem',
			lineHeight: 1.3
		},
		h2: {
			fontWeight: 400,
			fontSize: '2rem',
			lineHeight: 1.3
		},
		h3: {
			fontWeight: 400,
			fontSize: '1.75rem',
			lineHeight: 1.3
		},
		h4: {
			fontWeight: 400,
			fontSize: '1.50rem',
			lineHeight: 1.5
		},
		h5: {
			fontWeight: 500,
			fontSize: '1.25rem',
			lineHeight: 1.5
		},
		h6: {
			fontWeight: 500,
			fontSize: '1rem',
			lineHeight: 1.5
		},
		body: {
			fontWeight: 400,
			fontSize: '1rem',
			lineHeight: 1.5
		},
		body2: {
			fontWeight: 400,
			fontSize: '0.875rem',
			lineHeight: 1.5
		}
	},
	shadows: {
		primary: createShadows( primaryRgbShadow ),
		secondary: createShadows( secondaryRgbShadow ),
		primaryGlow: createGlows( primaryRgbShadow ),
		secondaryGlow: createGlows( secondaryRgbShadow ),
	},
	components: {
		Button: {
			Root: {
				borderRadius: '7px',
			},
		},
	},
	__yithUI: true
};

type ThemeOptions = {
	vars?: object;
	color?: object;
	shape?: object;
	baseSpacing?: number;
};

function getPath<T extends {}>( obj: T, path: CompletePathOf<T> | string, checkVars: boolean = true ) {
	if ( !path || typeof path !== 'string' ) {
		return null;
	}

	const reducePath = ( acc: any, item: string ) => ( acc && acc[ item ] ? acc[ item ] : null );

	// Check if CSS variables are used
	if ( obj && 'vars' in obj && checkVars ) {
		const val = `vars.${ path }`.split( '.' ).reduce( reducePath, obj );

		if ( val != null ) {
			return val;
		}
	}

	return path.split( '.' ).reduce( reducePath, obj );
}

export const createTheme = ( options: ThemeOptions ): Theme => {
	const themeSpacing = getPath( options, 'baseSpacing', false ) ?? 4;
	const theTheme: DefaultThemeOptions = merge( cloneDeep( defaultThemeOptions ), options );
	const spacing = ( theSpacing: string | number ): string => {
		if ( typeof theSpacing === 'string' ) {
			return theSpacing;
		}
		return `${ themeSpacing * theSpacing }px`;
	};

	const { breakpoints: themeBreakpoints } = theTheme;
	const breakpoints = {
		...themeBreakpoints,
		up: ( key: Breakpoint ) => `@media (min-width:${ themeBreakpoints.values[ key ] }${ themeBreakpoints.unit })`,
		stylize: <T extends any>( value: ResponsiveStyleValue<T>, stylize: ( value: T, breakpoint?: Breakpoint ) => any ) => {
			if ( value instanceof Object ) {
				const keys = Object.keys( value );
				return keys.reduce( ( acc: any, breakpoint ) => {
					if ( Object.keys( breakpoints.values ).indexOf( breakpoint ) !== -1 ) {
						const mediaKey = breakpoints.up( breakpoint as Breakpoint );
						acc[ mediaKey ] = stylize( value[ breakpoint ]!, breakpoint as Breakpoint );
					} else {
						acc[ breakpoint ] = value[ breakpoint ];
					}
					return acc;
				}, {} );
			}

			return stylize( value );
		},
		isBreakpoint: ( key: any ): key is Breakpoint => {
			return typeof key === 'string' && key in themeBreakpoints.values;
		}
	};
	const color = ( themeColor: ThemeColor ) => {
		return getPath( theTheme.palette, themeColor );
	}

	return { ...theTheme, breakpoints, spacing, color };
};

export const defaultTheme = createTheme( defaultThemeOptions );

export const breakpointStylize = <T extends any>( theme: Theme, value: ResponsiveStyleValue<T>, stylize: ( value: T, breakpoint?: Breakpoint ) => any ) => {
	if ( value instanceof Object ) {
		const themeBreakpoints = theme.breakpoints;
		const keys = Object.keys( value );
		return keys.reduce( ( acc: any, breakpoint ) => {
			if ( Object.keys( themeBreakpoints.values ).indexOf( breakpoint ) !== -1 ) {
				const mediaKey = themeBreakpoints.up( breakpoint as Breakpoint );
				acc[ mediaKey ] = stylize( value[ breakpoint ]!, breakpoint as Breakpoint );
			} else {
				acc[ breakpoint ] = value[ breakpoint ];
			}
			return acc;
		}, {} );
	}

	return stylize( value );
}

const isValidTheme = ( theme: any ): theme is Theme => {
	return theme && '__yithUI' in theme && theme.__yithUI;
}

export const useTheme = (): Theme => {
	const theme = emotionUseTheme();

	return isValidTheme( theme ) ? theme : defaultTheme;
}

type BreakpointProps<PropValue> = {
	[key in Breakpoint]?: PropValue | null
}

export function useBreakpointProps<PropValue>( props: Record<string, any> ) {
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