import React from 'React';
import useTheme from "../../hooks/useTheme";
const listStyle = {
	listStyle: 'none'
}

type ExpandContext = {
	expanded: boolean
	trigger: number
}

const Context = React.createContext<ExpandContext>( { expanded: false, trigger: 0 } );

export const useExpanded = (): ExpandContext => React.useContext( Context );

const getType = ( obj: any ) => {
	let type: string = typeof obj;
	if ( type === 'object' && Array.isArray( obj ) ) {
		type = 'array';
	}

	return type;
}

const MaybeCollapsible = ( { label, obj }: { label: string, obj: any } ) => {
	const type: string = getType( obj );
	const { expanded, trigger } = useExpanded();
	const [ open, setOpen ] = React.useState( expanded );

	React.useEffect( () => {
		setOpen( expanded );
	}, [ trigger ] )

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

const styles: Record<string, React.CSSProperties> = {
	container: {
		marginTop: 32,
		background: '#fff',
		color: '#222'
	},
	actions: {
		marginBottom: 24,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 16
	},
	action: {
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		textDecoration: 'none',
		borderRadius: '8px',
		background: '#f1f1f1',
		color: 'inherit',
		padding: '4px 12px',
		cursor: 'pointer',
		fontSize: '.9em'
	},
	actionIcon: {
		transform: 'rotate(45deg)'
	}
}

export default function ThemeOptions() {
	const theme = useTheme();
	const [ expanded, setExpandedState ] = React.useState( false );
	const [ trigger, setTrigger ] = React.useState( 0 );
	const setExpanded = ( expandedValue: boolean ) => {
		setExpandedState( expandedValue );
		setTrigger( _ => _ + 1 );
	}

	const handleExpand = ( event: React.MouseEvent ) => {
		event.preventDefault();
		setExpanded( true );
	}

	const handleCollapse = ( event: React.MouseEvent ) => {
		event.preventDefault();
		setExpanded( false );
	}

	return <Context.Provider value={ { expanded, trigger } }>
		<div style={ styles.container }>
			<div style={ styles.actions }>
				<a
					onClick={ handleExpand }
					style={ styles.action }
				>
					<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width='1em' height='1em' style={styles.actionIcon}>
						<path d="M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
					</svg>
					Expand all
				</a>
				<a
					onClick={ handleCollapse }
					style={ styles.action }
				>
					<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width='1em' height='1em' style={styles.actionIcon}>
						<path d="M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path>
					</svg>
					Collapse all
				</a>
			</div>
			<PrintR obj={ theme }/>
		</div>
	</Context.Provider>
}

