import emotionStyled, {StyledOptions as EmotionStyledOptions} from '@emotion/styled';
import {isEmpty} from 'lodash';

import {defaultTheme, Theme} from '../theme';
import type React from 'react';
import type {CreateStyled, SxProps} from "./types";

type styledFunctionProps = {
	theme: Theme
};

interface StyledOptions extends EmotionStyledOptions {
	name?: string;
	slot?: string;
}

type StyledCommonProps = {
	theme?: Theme
	as?: React.ElementType
	sx?: SxProps
}

type Styled = CreateStyled<StyledCommonProps, StyledOptions, Theme>;

function processSx(props: { sx?: SxProps; theme?: Theme }) {
	const {sx} = props;

	if (!sx) {
		return null;
	}

	const theme = isEmpty(props.theme) ? defaultTheme : props.theme;

	if (typeof sx === 'function') {
		return sx(theme);
	} else if (typeof sx !== 'object') {
		return sx;
	}

	return sx;
}

export function shouldForwardProp(prop: string) {
	return !['ownerState', 'theme', 'sx', 'as'].includes(prop);
}

const createProcessComponentStyles = (name?: string, slot?: string) => {
	if (!name || !slot) {
		return () => ({});
	}

	return (props: { theme?: Theme }) => {
		const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
		const styles = name in theme.components && slot in theme.components[name] ? theme.components[name][slot] : {};

		if (typeof styles === 'function') {
			return styles({...props, theme});
		}
		return styles;
	};
};

// @ts-ignore
const styled: Styled = (tag, options = {}) => {
	// @ts-ignore
	const {name, slot, ...styledOptions} = options;

	const displayName = (process.env.NODE_ENV !== 'production' && name) ? `${name}${slot || ''}` : undefined;

	const defaultResolver = emotionStyled(tag as any, {shouldForwardProp, label: displayName, ...styledOptions});

	// @ts-ignore
	return (styleArg, ...expressions) => {
		const theExpressions = [...expressions, processSx, createProcessComponentStyles(name, slot)];
		let theStyleArg = styleArg;

		const expressionsWithDefaultTheme = theExpressions
			? theExpressions.map(stylesArg => {
				return typeof stylesArg === 'function'
					? ({theme: themeInput, ...other}: styledFunctionProps) => {
						return stylesArg({
							theme: isEmpty(themeInput) ? defaultTheme : themeInput,
							...other,
						});
					}
					: stylesArg;
			})
			: [];

		if (typeof styleArg === 'object') {
			theStyleArg = {
				raw: [...styleArg.raw, '', ''],
				...[...styleArg, '', ''],
			};
		} else if (typeof styleArg === 'function') {
			theStyleArg = ({theme: themeInput, ...other}: styledFunctionProps) => {
				return styleArg({theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...other});
			};
		}

		const Component = defaultResolver(theStyleArg, ...expressionsWithDefaultTheme);

		if (displayName) {
			Component.displayName = displayName;
		}

		return Component;
	}
}

export default styled;
