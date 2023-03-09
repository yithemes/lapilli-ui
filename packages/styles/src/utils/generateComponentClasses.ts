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

const getUtilityClass = ( keyOrSlot: string, componentName: string ): string => (
	keyOrSlot.startsWith( '--' ) ?
		`${ CLASS_PREFIX }-${ componentName }${ keyOrSlot }` :
		(
			globalStateClasses.includes( keyOrSlot ) ?
				`${ CLASS_PREFIX }-${ keyOrSlot }` :
				`${ CLASS_PREFIX }-${ componentName }__${ keyOrSlot }`
		)
)

export function generateComponentClasses<ClassKey extends string>(
	componentName: string,
	slotClasses: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
	customClasses?: Record<string, string>,
): Record<ClassKey, string> {
	const output: Record<ClassKey, string> = {} as any;

	Object.keys( slotClasses ).forEach(
		// @ts-ignore
		( slot: ClassKey ) => {
			output[ slot ] = slotClasses[ slot ]
				.reduce( ( acc, key ) => {
					if ( !!key ) {
						acc.push( getUtilityClass( key, componentName ) );
						if ( customClasses && customClasses[ key ] ) {
							acc.push( customClasses[ key ] );
						}
					}
					return acc;
				}, [] as string[] )
				.join( ' ' );
		},
	);

	return output;
}