import type {Theme} from "../theme";
import type * as CSS from 'csstype';
import type {StyledComponent as EmotionStyledComponent, StyledOptions as EmotionStyledOptions} from '@emotion/styled';
import type {PropsOf} from '@emotion/react';

export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
	[K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>;
};

export interface SerializedStyles {
	name: string;
	styles: string;
	map?: string;
	next?: SerializedStyles;
}

// TODO: Improve SX props!
export type SxProps = CSSProperties | ((theme: Theme) => CSSProperties);

type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

interface CSSOthersObject {
	[propertiesName: string]: unknown | CSSInterpolation;
}

interface ArrayCSSInterpolation extends Array<CSSInterpolation> {
}

interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {
}

interface ComponentSelector {
	__emotion_styles: any;
}

type Keyframes = {
	name: string;
	styles: string;
	anim: number;
	toString: () => string;
} & string;

type InterpolationPrimitive =
	| null
	| undefined
	| boolean
	| number
	| string
	| ComponentSelector
	| Keyframes
	| SerializedStyles
	| CSSObject;

type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

interface FunctionInterpolation<Props> {
	(props: Props): Interpolation<Props>;
}

interface ArrayInterpolation<Props> extends Array<Interpolation<Props>> {
}

type Interpolation<Props> =
	| InterpolationPrimitive
	| ArrayInterpolation<Props>
	| FunctionInterpolation<Props>;

interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
	label?: string;

	shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;

	target?: string;
}

export interface CreateStyledComponent<ComponentProps extends {},
	SpecificComponentProps extends {} = {},
	JSXProps extends {} = {},
	T extends object = {},
	> {
	(
		...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
	): EmotionStyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

	/**
	 * @typeparam AdditionalProps  Additional props to add to your styled component
	 */<AdditionalProps extends {}>(
		...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>>
	): EmotionStyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

	(
		template: TemplateStringsArray,
		...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
	): EmotionStyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

	/**
	 * @typeparam AdditionalProps  Additional props to add to your styled component
	 */<AdditionalProps extends {}>(
		template: TemplateStringsArray,
		...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>>
	): EmotionStyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

export interface CreateStyled<StyledCommonProps extends {},
	StyledOptions,
	Theme extends object,
	> {
	<C extends React.ComponentClass<React.ComponentProps<C>>,
		ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
		>(
		component: C,
		options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & StyledOptions,
	): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & StyledCommonProps,
		{},
		{
			ref?: React.Ref<InstanceType<C>>;
		},
		Theme>;

	<C extends React.ComponentClass<React.ComponentProps<C>>>(
		component: C,
		options?: EmotionStyledOptions<PropsOf<C> & StyledCommonProps> & StyledOptions,
	): CreateStyledComponent<PropsOf<C> & StyledCommonProps,
		{},
		{
			ref?: React.Ref<InstanceType<C>>;
		},
		Theme>;

	<C extends React.JSXElementConstructor<React.ComponentProps<C>>,
		ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
		>(
		component: C,
		options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & StyledOptions,
	): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & StyledCommonProps, {}, {}, Theme>;

	<C extends React.JSXElementConstructor<React.ComponentProps<C>>>(
		component: C,
		options?: EmotionStyledOptions<PropsOf<C> & StyledCommonProps> & StyledOptions,
	): CreateStyledComponent<PropsOf<C> & StyledCommonProps, {}, {}, Theme>;

	<Tag extends keyof JSX.IntrinsicElements,
		ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag],
		>(
		tag: Tag,
		options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps> & StyledOptions,
	): CreateStyledComponent<StyledCommonProps,
		Pick<JSX.IntrinsicElements[Tag], ForwardedProps>,
		{},
		Theme>;

	<Tag extends keyof JSX.IntrinsicElements>(
		tag: Tag,
		options?: EmotionStyledOptions<StyledCommonProps> & StyledOptions,
	): CreateStyledComponent<StyledCommonProps, JSX.IntrinsicElements[Tag], {}, Theme>;
}