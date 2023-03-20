/**
 * External dependencies
 */
const path         = require( 'path' );
const glob         = require( 'fast-glob' );
const ProgressBar  = require( 'progress' );
const workerFarm   = require( 'worker-farm' );
const { Readable } = require( 'stream' );

const files = process.argv.slice( 2 );

/**
 * Path to packages directory.
 *
 * @type {string}
 */
const PACKAGES_DIR = path
	.resolve( __dirname, '../../packages' )
	.replace( /\\/g, '/' );

/**
 * Get the package name for a specified file
 *
 * @param {string} file File name.
 *
 * @return {string} Package name.
 */
function getPackageName( file ) {
	return path.relative( PACKAGES_DIR, file ).split( path.sep )[ 0 ];
}

let onFileComplete = () => {
};

let stream;

if ( files.length ) {
	stream = new Readable( { encoding: 'utf8' } );
	files.forEach( ( file ) => {
		stream.push( file );
	} );

	stream.push( null );
} else {
	const bar = new ProgressBar( 'Build Progress: [:bar] :percent', {
		width     : 30,
		incomplete: ' ',
		total     : 1
	} );

	bar.tick( 0 );

	stream = glob.stream(
		[
			`${PACKAGES_DIR}/*/src/**/*.{js,ts,tsx}`
		],
		{
			ignore   : [
				`**/benchmark/**`,
				`**/{__mocks__,__tests__,test}/**`,
				`**/{storybook,stories}/**`,
				`**/e2e-test-utils-playwright/**`
			],
			onlyFiles: true
		}
	);

	// Pause to avoid data flow which would begin on the `data` event binding,
	// but should wait until worker processing below.
	//
	// See: https://nodejs.org/api/stream.html#stream_two_reading_modes
	stream.pause().on( 'data', ( file ) => {
		bar.total = files.push( file );
	} );

	onFileComplete = () => {
		bar.tick();
	};
}

const worker = workerFarm( require.resolve( './build-worker' ) );

let ended    = false,
	complete = 0;

stream
	.on( 'data', ( file ) =>
		worker( file, ( error ) => {
			onFileComplete();

			if ( error ) {
				// If an error occurs, the process can't be ended immediately since
				// other workers are likely pending. Optimally, it would end at the
				// earliest opportunity (after the current round of workers has had
				// the chance to complete), but this is not made directly possible
				// through `worker-farm`. Instead, ensure at least that when the
				// process does exit, it exits with a non-zero code to reflect the
				// fact that an error had occurred.
				process.exitCode = 1;

				console.error( error );
			}

			++complete;
			if ( ended && complete === files.length ) {
				workerFarm.end( worker );
			}
		} )
	)
	.on( 'end', () => ( ended = true ) )
	.resume();
