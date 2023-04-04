import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { uploadMedia } from "@wordpress/media-utils";

export default function useMediaUpload() {
	const { hasUploadPermissions } = useSelect(
		( select ) => {
			// @ts-ignore
			const { canUser } = select( coreStore );

			// @ts-ignore
			return { hasUploadPermissions: canUser( 'create', 'media' ) ?? true };
		}, [] );

	return hasUploadPermissions
		? ( {
				onError,
				...rest
			}: {
			onError: ( message: string ) => void;
		} ) => {
			uploadMedia(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore The upload function passes the remaining required props.
				{
					onError: ( { message } ) => onError( message ),
					...rest,
				}
			);
		}
		: undefined;
}