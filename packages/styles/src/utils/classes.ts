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

/**
 * Generate the component classes.
 * @param componentName The name of the component.
 * @param slotClasses Object of slot classes.
 */
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

export function mergeComponentClasses<Target extends {}, A extends {}>( target: Target, other: A ): Record<keyof Target | keyof A, string>
export function mergeComponentClasses<Target extends {}, A extends {}, B extends {}>( target: Target, other1: A, other2: B ): Record<keyof Target | keyof A | keyof B, string>
export function mergeComponentClasses<Target extends {}, A extends {}, B extends {}, C extends {}>( target: Target, other1: A, other2: B, other3: C ): Record<keyof Target | keyof A | keyof B | keyof C, string>
export function mergeComponentClasses<Target extends {}, A extends {}, B extends {}, C extends {}, D extends {}>( target: Target, other1: A, other2: B, other3: C, other4: D ): Record<keyof Target | keyof A | keyof B | keyof C | keyof D, string>
export function mergeComponentClasses<Target extends {}, A extends {}, B extends {}, C extends {}, D extends {}, Other extends {}>( target: Target, other1: A, other2: B, other3: C, other4: D, ...extra: Other[] ): Record<keyof Target | keyof A | keyof B | keyof C | keyof D | string, string>
/**
 * Merge component classes.
 * @param target The target object classes.
 * @param others The others object classes.
 */
export function mergeComponentClasses<Target extends {}, Other extends {}>(
	target: Target,
	...others: Other[]
): Record<keyof Target | string, string> {
	const output = { ...target } as any;

	others.forEach( ( source ) => {
		if ( source ) {
			( Object.keys( source ) ).forEach(
				( slot ) => {
					output[ slot ] = [ output[ slot ] ?? false, source[ slot as ( keyof typeof source ) ] ].filter( Boolean ).join( ' ' );
				},
			);
		}
	} );

	return output;
}

/**
 * Generate classes of component slots.
 * @param componentName The name of the component.
 * @param slots The list of the slot names.
 */
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