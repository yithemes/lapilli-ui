const PREFIX = 'lpl:';
let globalId = 0;
export default function useId( idOverride?: string ) {
	if ( idOverride ) {
		return idOverride;
	}
	globalId++;
	return PREFIX + globalId.toString( 32 );
}