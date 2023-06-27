import React from 'React';
import useTheme from "../../hooks/useTheme";

export default function Shadows() {
	const theme = useTheme();
	const { shadows } = theme;

	return <div style={ { display: 'flex', flexDirection: 'column', gap: 32, marginTop: 32, background: '#fff', color: '#222' } }>
		{ Object.keys( shadows ).map( color => <div key={ color } style={ { padding: '32px 0' } }>
			<div style={ { fontSize: '1.1em', marginBottom: '1.5em' } }>{ color }</div>
			<div
				style={
					{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 48,
					}
				}>
				{ Object.keys(
					// @ts-ignore
					shadows[ color ]
				).map( type => {
					// @ts-ignore
					const value = shadows[ color ][ type ];

					return <div
						key={ `${ color }-${ type }` }
						style={ {
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							height: 100,
							width: 100,
							borderRadius: 4,
							boxShadow: value,
						} }
					>{ type }
					</div>
				} ) }
			</div>
		</div> ) }
	</div>
}

