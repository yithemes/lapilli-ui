import { useTheme as emotionUseTheme } from "@emotion/react";
import type { Theme } from "../theme";
import { defaultTheme } from "../theme";

const isValidTheme = ( theme: any ): theme is Theme => {
	return theme && '__mayaUI' in theme && theme.__mayaUI;
}

const useTheme = (): Theme => {
	const theme = emotionUseTheme();

	return isValidTheme( theme ) ? theme : defaultTheme;
}

export default useTheme;