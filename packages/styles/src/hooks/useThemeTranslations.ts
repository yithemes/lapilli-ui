import useTheme from "./useTheme";

export default function useThemeTranslations() {
	const { translations } = useTheme();

	const __ = ( text: string ) => translations[ text ] ?? text;

	return { __ };
}