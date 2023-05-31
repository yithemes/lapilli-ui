const CLASS_PREFIX = 'yithUI';

const globalStateClasses = [
	'active',
	'checked',
	'completed',
	'disabled',
	'error',
	'expanded',
	'focused',
	'focusVisible',
	'required',
	'selected',
];

/**
 * Get the utility class.
 *
 * @param keyOrSlot The key or the slot to use.
 * @param componentName The component name.
 */
const getUtilityClass = ( keyOrSlot: string, componentName: string ): string => (
	keyOrSlot.startsWith( '--' ) ?
		`${ CLASS_PREFIX }-${ componentName }${ keyOrSlot }` :
		(
			globalStateClasses.includes( keyOrSlot ) ?
				`${ CLASS_PREFIX }--${ keyOrSlot }` :
				`${ CLASS_PREFIX }-${ componentName }__${ keyOrSlot }`
		)
)

export function generateComponentClasses<SlotKey extends string>(
	componentName: string,
	slotClasses: Record<SlotKey, ReadonlyArray<string | false | undefined | null>>
): Record<SlotKey, string> {
	const output: Record<SlotKey, string> = {} as any;

	( Object.keys( slotClasses ) as SlotKey[] ).forEach(
		( slot ) => {
			output[ slot ] = slotClasses[ slot ]
				.reduce( ( acc, key ) => {
					if ( !!key ) {
						acc.push( getUtilityClass( key, componentName ) );
					}
					return acc;
				}, [] as string[] )
				.join( ' ' );
		},
	);

	return output;
}

export function mergeComponentClasses<SlotKey1 extends string, SlotKey2 extends string>(
	classes1: Partial<Record<SlotKey1, string>>,
	classes2: Partial<Record<SlotKey2, string>>
): Record<SlotKey1 | SlotKey2, string> {
	const output: Record<SlotKey1 | SlotKey2, string> = {} as any;

	( Object.keys( classes1 ) as SlotKey1[] ).forEach(
		( slot ) => {
			output[ slot ] = [ output[ slot ] ?? false, classes1[ slot ] ].filter( Boolean ).join( ' ' );
		},
	);

	( Object.keys( classes2 ) as SlotKey2[] ).forEach(
		( slot ) => {
			output[ slot ] = [ output[ slot ] ?? false, classes2[ slot ] ].filter( Boolean ).join( ' ' );
		},
	);

	return output;
}

export function generateComponentSlotClasses<SlotKey extends string>(
	componentName: string,
	slots: SlotKey[]
): Record<SlotKey, string> {
	const output: Record<SlotKey, string> = {} as any;

	slots.forEach( ( slot ) => {
		output[ slot ] = getUtilityClass( slot, componentName );
	} );

	return output;
}