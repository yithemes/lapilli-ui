import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import classNames from "classnames";

export default function useLayoutClasses() {
	const { themeSupportsLayout } = useSelect( ( select ) => {
		// @ts-ignore This selector is available in the block editor data store.
		const _settings = select( blockEditorStore ).getSettings();
		return {
			themeSupportsLayout: _settings.supportsLayout,
		};
	}, [] );

	const layoutClasses = classNames(
		{
			'is-layout-flow': !themeSupportsLayout,
			'is-layout-constrained': !!themeSupportsLayout,
		},
	);

	return layoutClasses;
}