import { useTheme as emotionUseTheme } from "@emotion/react";
import type { Theme } from "../theme";
import { defaultTheme } from "../theme";

const isValidTheme = ( theme: any ): theme is Theme => {
	return theme && '__yithUI' in theme && theme.__yithUI;
}

const useTheme = (): Theme => {
	const theme = emotionUseTheme();

	return isValidTheme( theme ) ? theme : defaultTheme;
}

export default useTheme;