import { generateComponentClasses, styled } from '@lapilli-ui/styles';
import React, { forwardRef } from 'react';

import type { CardMediaOwnerState, CardMediaProps, CardMediaStyled } from "./types";
import classNames from "classnames";

const useComponentClasses = ( ownerState: CardMediaOwnerState ) => {
	return generateComponentClasses(
		'CardMedia',
		{
			root: [
				'root',
				ownerState.isMedia && '--media',
				ownerState.isImage && '--image'
			],
		}
	)
}

const CardMediaRoot = styled( 'div', { name: 'CardMedia', slot: 'Root' } )( ( { ownerState }: CardMediaStyled ) => ( {
	display: 'block',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	boxSizing: 'border-box',
	...( ownerState.isMedia && {
		width: '100%',
	} ),
	...( ownerState.isImage && {
		objectFit: 'cover',
	} ),

} ) );

const MEDIA_COMPONENTS: React.ElementType[] = [ 'video', 'audio', 'picture', 'iframe', 'img' ];
const IMAGE_COMPONENTS: React.ElementType[] = [ 'picture', 'img' ];

function isMediaElement( element: React.ElementType ): element is 'video' | 'audio' | 'picture' | 'iframe' | 'img' {
	return MEDIA_COMPONENTS.includes( element );
}

function isImageElement( element: React.ElementType ): element is 'picture' | 'img' {
	return IMAGE_COMPONENTS.includes( element );
}

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>( function CardMedia(
	{
		className,
		component = 'div',
		src = '',
		style: styleProp,
		children,
		...props
	},
	ref
) {

	const isMedia = isMediaElement( component );
	const isImage = isImageElement( component );
	const style = !isMedia && src ? { backgroundImage: `url("${ src }")`, ...styleProp } : styleProp;

	const ownerState: CardMediaOwnerState = { isMedia, isImage };

	const classes = useComponentClasses( ownerState );

	return <CardMediaRoot
		{ ...props }
		className={ classNames( className, classes.root ) }
		ownerState={ ownerState }
		style={ style }
		as={ component }
		role={ !isMedia && src ? 'img' : undefined }
		{ ...( isMedia && { src: src } ) }
		ref={ ref }
	>
		{ children }
	</CardMediaRoot>
} );

export default CardMedia;
