import React from 'React';
import useTheme from "../../hooks/useTheme";
// @ts-ignore
import Switch from "../../../../components/src/switch/Switch";

const listStyle = {
	listStyle: 'none'
}

const Context = React.createContext<boolean>( false );

export const useExpanded = (): boolean => React.useContext( Context );

const getType = ( obj: any ) => {
	let type: string = typeof obj;
	if ( type === 'object' && Array.isArray( obj ) ) {
		type = 'array';
	}

	return type;
}

const MaybeCollapsible = ( { label, obj }: { label: string, obj: any } ) => {
	const type: string = getType( obj );
	const expanded = useExpanded();
	const [ open, setOpen ] = React.useState( expanded );

	React.useEffect( () => {
		setOpen( expanded );
	}, [ expanded ] )

	let isCollapsible = [ 'array', 'object' ].includes( type );
	if ( isCollapsible ) {
		isCollapsible = Boolean( 'array' === type ? obj.length : Object.keys( obj ).length );
	}

	const collapsed = 'array' === type ? <><span style={ { opacity: .7 } }>{ `(${ obj.length })` }</span>{ ` [...]` }</> : '{...}';

	return <span>
		<strong
			style={ { cursor: isCollapsible ? 'pointer' : undefined, position: 'relative' } }
			onClick={ isCollapsible ? ( () => setOpen( _ => !_ ) ) : undefined }
		>
			{ isCollapsible && <span style={ { position: 'absolute', left: 0, paddingRight: '8px', transform: 'translateX(-100%)' } }>{ open ? '-' : '+' } </span> }
			{ label }
		</strong>: { ( open || !isCollapsible ) ? <PrintR obj={ obj }/> : collapsed }
	</span>
}

const PrintR = ( { obj }: { obj: any } ) => {
	const type: string = getType( obj );

	if ( 'object' === type ) {
		return <span>
			<span>{ `{` }</span>
			{ !!Object.keys( obj ).length && <ul style={ listStyle }>
				{ Object.keys( obj ).sort().map( key => <li key={ key }><MaybeCollapsible label={ key } obj={ obj[ key ] }/>,</li> ) }
			</ul> }
			<span>{ `}` }</span>
		</span>
	} else if ( 'array' === type ) {
		return <span>
			<span><span style={ { opacity: .7 } }>{ `(${ obj.length })` }</span>{ ` [` }</span>
			{ !!obj.length && <ul style={ listStyle }>
				{ ( obj as any[] ).map( ( value, idx ) => <li key={ idx }>{ idx }: <PrintR obj={ value }/>,</li> ) }
			</ul> }
			<span>{ `]` }</span>
		</span>
	} else if ( 'string' === type ) {
		return <span style={ { color: '#f2390f' } }>{ `"${ obj }"` }</span>
	} else if ( 'number' === type || 'boolean' === type ) {
		return <span style={ { color: '#066adb' } }>{ `${ obj }` }</span>
	} else if ( 'function' === type ) {
		let printableFunction = obj.toString();
		printableFunction = printableFunction.substring( 0, printableFunction.indexOf( '=>' ) ) + '=> {...}';
		return <span style={ { color: '#802787', fontStyle: 'italic' } }>{ printableFunction }</span>
	} else {
		return <span>{ `( ${ type } ) ${ obj }` }</span>
	}
}

export default function ThemeOptions() {
	const theme = useTheme();
	const [ expanded, setExpanded ] = React.useState( false );

	return <Context.Provider value={ expanded }>
		<div style={ { marginTop: 32, background: '#fff', color: '#222' } }>
			<div style={ { marginBottom: 24 } }>
				<Switch checked={ expanded } onChange={ e => setExpanded( e.target.checked ) } id='exapanded'/>
				<label htmlFor='exapanded' style={ { marginLeft: 4 } }>Expanded</label>
			</div>
			<PrintR obj={ theme }/>
		</div>
	</Context.Provider>
}

