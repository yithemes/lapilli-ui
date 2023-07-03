<?php
/**
 * Plugin Name: YITH UI - feature plugin
 * Description: Allows to use the YITH UI React packages.
 * Version: 0.3.0
 * Author: Leanza Francesco
 *
 * @package YITH\UI
 */

namespace YITH\UI;

defined( 'ABSPATH' ) || exit;

class Feature_Plugin {
	/**
	 * @var self
	 */
	private static $instance;

	/**
	 * Singleton implementation
	 *
	 * @return Feature_Plugin
	 */
	public static function get_instance() {
		return ! is_null( self::$instance ) ? self::$instance : self::$instance = new self();
	}

	/**
	 * The constructor.
	 */
	private function __construct() {
		add_action( 'plugins_loaded', array( $this, 'on_plugins_loaded' ), 20 );
	}

	/**
	 * On plugins loaded.
	 */
	public function on_plugins_loaded() {
		add_action( 'should_load_block_editor_scripts_and_styles', array( $this, 'should_load_block_editor_scripts_and_styles' ), 10 );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ), 10 );
	}

	public function should_load_block_editor_scripts_and_styles( $should_load ) {
		if ( ! $should_load ) {
			$should_load = wp_script_is( 'yith-block-editor', 'enqueued' );
		}


		return $should_load;
	}

	/**
	 * Register scripts.
	 */
	public function register_scripts() {
		$base_url = untrailingslashit( plugin_dir_url( __FILE__ ) );
		$assets   = array(
			'yith-block-editor' => array(
				'path' => '/dist/block-editor/',
			),
			'yith-components'   => array(
				'path' => '/dist/components/',
			),
			'yith-styles'       => array(
				'path' => '/dist/styles/',
			),
			'yith-date'         => array(
				'path' => '/dist/date/',
			),
		);

		foreach ( $assets as $handle => $asset ) {
			$path         = $asset['path'];
			$script_asset = include __DIR__ . $path . 'index.asset.php';
			$dependencies = $script_asset['dependencies'] ?? array();
			$version      = $script_asset['version'] ?? '1.0.0';

			$script = $base_url . $path . 'index.js';
			$style  = $base_url . $path . 'style.css';

			if ( 'yith-date' === $handle ) {
				$dependencies[] = 'wp-date';
			}

			wp_register_script( $handle, $script, $dependencies, $version, true );
		}

		$locale_options = array(
			'options' => array(
				'weekStartsOn' => (int) get_option( 'start_of_week', 0 ),
			),
		);

		$date_formats = array(
			'year'         => 'Y',
			'month'        => 'F',
			'dayOfMonth'   => 'j',
			'monthShort'   => 'M',
			'weekday'      => 'l',
			'weekdayShort' => 'D',
			'fullDate'     => get_option( 'date_format', __( 'F j, Y' ) ),
			'inputDate'    => 'Y-m-d',
			'monthAndDate' => 'F j',
			'monthAndYear' => 'F Y',
		);

		wp_add_inline_script(
			'yith-date',
			'yith.date.setLocale( ' . wp_json_encode( $locale_options ) . ' );
			yith.date.setDateFormats( ' . wp_json_encode( $date_formats ) . ' );
			yith.date.setFormatDate( wp.date.format );'
		);

	}
}

Feature_Plugin::get_instance();