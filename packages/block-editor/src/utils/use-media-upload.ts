import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { uploadMedia } from "@wordpress/media-utils";

type UploadMediaParams = Parameters<typeof uploadMedia>[0] & {
	onError: ( message: string ) => void;
};

export default function useMediaUpload() {
	const { hasUploadPermissions } = useSelect(
		( select ) => {
			// @ts-ignore This selector is available in the core store.
			const { canUser } = select( coreStore );

			// @ts-ignore
			return { hasUploadPermissions: canUser( 'create', 'media' ) ?? true };
		}, [] );

	return hasUploadPermissions
		? ( { onError, ...other }: UploadMediaParams ) => {
			uploadMedia( {
				onError: ( { message } ) => onError( message ),
				...other
			} );
		}
		: undefined;
}
