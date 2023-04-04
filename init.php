<?php
/**
 * Plugin Name: YITH Monorepo - feature plugin
 * Description: Allows to use the YITH UI React packages.
 * Version: 0.3.0
 * Author: Leanza Francesco
 *
 * @package YITH\Framework\UI
 */

namespace YITH\Framework\UI;

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
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ), 20 );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ), 20 );
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

			wp_register_script( $handle, $script, $dependencies, $version, true );
		}

		wp_enqueue_style( 'wp-edit-blocks' );
		wp_enqueue_style( 'wp-format-library' );

		wp_enqueue_editor();
		wp_enqueue_media();

		/**
		 * Enqueue any block editor related assets.
		 *
		 * @since 7.1.0
		 */
		do_action( 'enqueue_block_editor_assets' );
	}
}

Feature_Plugin::get_instance();
