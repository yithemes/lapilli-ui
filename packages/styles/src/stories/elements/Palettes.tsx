import React from 'React';
import useTheme from "../../hooks/useTheme";


export default function Palettes() {
	const theme = useTheme();
	const { palette } = theme;

	return <div style={ { display: 'flex', flexDirection: 'column', gap: 32, marginTop: 32, background: '#fff', color: '#222' } }>
		{ Object.keys( palette ).map( color => <div key={ color } style={ { padding: '32px 0' } }>
			<div style={ { fontSize: '1.1em', marginBottom: '1.5em' } }>{ color }</div>
			<div
				style={
					{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						gap: 16,
						rowGap: 24
					}
				}>
				{ Object.keys(
					// @ts-ignore
					palette[ color ]
				).map( type => {
					const isColor = type.search( 'Opacity' ) === -1;
					// @ts-ignore
					const value = palette[ color ][ type ];

					return <div
						key={ `${ color }-${ type }` }
						style={ {
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 16
						} }
					>
						<div style={ {
							height: 50,
							width: 50,
							borderRadius: 4,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							...( isColor && {
								background: value,
								boxShadow: '0px 3px 6px -4px rgba(0,0,0,0.2), 0px 1px 8px 0px rgba(0,0,0,0.1)'
							} )
						} }>
							{ isColor ? '' : value }
						</div>
						<div
							style={ {
								display: 'flex',
								flexDirection: 'column',
								gap: 8
							} }
						>
							<div>{ type }</div>
							{ isColor && <div style={ { fontSize: '.8em', opacity: .6 } }>{ value }</div> }
						</div>
					</div>
				} ) }
			</div>
		</div> ) }
	</div>
}

