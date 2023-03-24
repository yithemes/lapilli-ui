#! /usr/bin/env node
/* jshint ignore: start */
/**
 * This script builds the ZIP package
 *
 * @version 1.1.0
 * @author Leanza Francesco <leanzafrancesco@gmail.com>
 */

const chalk       = require( 'chalk' );
const fs          = require( 'fs-extra' );
const path        = require( 'path' );
const archiver    = require( 'archiver' );
const { program } = require( 'commander' );
const log         = {
	log   : ( message ) => console.log( message ),
	status: ( message ) => log.log( chalk.blue.bold( message ) ),
	done  : ( message ) => log.log( chalk.blue.green( message ) + chalk.reset.inverse.bold.green( ' DONE ' ) ),
	error : ( message ) => log.log( chalk.blue.red( message ) + chalk.reset.inverse.bold.red( ' ERROR ' ) ),
	br    : () => log.log( '' )
}

const packageInfo = require( '../package.json' );

program
	.option( '--ri, --root-ignore-file <file>', 'choose a specific root ignore file', '.distignore' )
	.option( '--folder <folder>', 'choose a specific folder', process.env.npm_package_name )
	.parse( process.argv );

const options = program.opts();

const PLUGIN_FOLDER    = options.folder;
const ROOT_IGNORE_FILE = options.rootIgnoreFile;
const PLUGIN_NAME      = ( packageInfo.title || packageInfo.description || packageInfo.name );

function is_dir( path ) {
	try {
		var stat = fs.lstatSync( path );
		return stat.isDirectory();
	} catch ( e ) {
		// lstatSync throws an error if path doesn't exist
		return false;
	}
}

const getExcluded = ( dir, ignoreFile ) => {
	dir          = typeof dir !== 'undefined' ? dir : false;
	ignoreFile   = typeof ignoreFile !== 'undefined' && ignoreFile ? ignoreFile : '.distignore';
	const file   = dir ? path.resolve( dir, ignoreFile ) : ignoreFile;
	const prefix = !!dir ? ( dir.replace( /\\/g, '\\\\' ) + '\\\\' ) : '';
	let excluded = fs.existsSync( file ) ? fs.readFileSync( file ).toString().split( "\n" ) : [];

	excluded = excluded.filter( ( ex ) => {
		return !!ex && '#' !== ex.substring( 0, 1 );
	} );
	return excluded.map( ( ex ) => {
		return '^' + prefix +
			   ex.replace( /\//g, '\\' ).replace( /\\/g, '\\\\' ).replace( /\./g, '\\.' ).replace( /\*/g, '.+' )
			   + '$';
	} );
}

( async () => {
	const TEMP_PLUGIN_PATH = path.resolve( '/', 'tmp', PLUGIN_FOLDER );
	const BUILD_PATH       = path.resolve( '..' );
	const ZIP_PATH         = path.resolve( BUILD_PATH, `${PLUGIN_FOLDER}.zip` );
	const archive          = archiver( 'zip', { zlib: { level: 9 } } );

	log.status( 'Generating temp directory...' );
	fs.existsSync( TEMP_PLUGIN_PATH ) && fs.rmdirSync( TEMP_PLUGIN_PATH, { recursive: true } );
	fs.mkdirSync( TEMP_PLUGIN_PATH, { recursive: true } );

	log.status( 'Building package...' );

	let excluded = getExcluded( false, ROOT_IGNORE_FILE );

	fs.copySync( '.', TEMP_PLUGIN_PATH, {
		filter: ( src, dest ) => {
			if ( is_dir( src ) ) {
				let specificExcluded = getExcluded( src );
				if ( specificExcluded.length ) {
					excluded = excluded.concat( specificExcluded );
				}
			}

			const isExcluded = excluded.filter( ( ex ) => {
				// Replace slashes to be equal to the excluded ones (MacOS fix).
				const parsedSrc = src.replace( /\//g, '\\' );

				return parsedSrc.match( new RegExp( ex ) );
			} ).length;

			return !isExcluded;
		}
	} );

	// Let's start with zip.
	fs.existsSync( ZIP_PATH ) && fs.unlinkSync( ZIP_PATH );
	const output = fs.createWriteStream( ZIP_PATH );

	output.on( 'close', function () {
		const sizeKb = ( parseInt( archive.pointer() ) / 1024 ).toFixed( 2 );
		log.log( '> ' + sizeKb + ' Kb' );
		log.br();
		log.done( `You've built ${PLUGIN_NAME}!` );
	} );

	archive.on( 'error', function ( err ) {
		log.error( err );
		process.exit( 102 );
	} );

	archive.pipe( output );
	archive.directory( TEMP_PLUGIN_PATH, PLUGIN_FOLDER );

	archive.finalize();
} )();
