# Block Editor

You can use the Gutenberg block editor through the BlockEditor component.

## Requirements

### Enqueue styles and scripts

To use it in WordPress, you need to enqueue the following styles and scripts:

```php
wp_enqueue_style( 'wp-edit-blocks' );
wp_enqueue_style( 'wp-format-library' );

wp_enqueue_editor();
wp_enqueue_media();

do_action( 'enqueue_block_editor_assets' );
```

### Register blocks

Before using it, you need to register the blocks you want to use.

For example, you can register all WordPress blocks with the following code:

```jsx
import { registerCoreBlocks } from '@wordpress/block-library';

registerCoreBlocks();
```

Please note: the `core/paragraph` block is required.

### Set block editor settings

You should also set the settings for the BlockEditor, by using its `settings` prop.

You could use `wp_localize_script` to pass the settings to your React code, as follows:

```php
$block_editor_context = new \WP_Block_Editor_Context( array( 'name' => 'yith/my-plugin/panel' ) );

$editor_settings = get_block_editor_settings(
	array(
		'styles'            => get_block_editor_theme_styles(),
		'allowedBlockTypes' => array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/list-item',
			'core/quote',
			'core/image',
		),
	),
	$block_editor_context
);

wp_localize_script(
	'yith-my-plugin-panel',
	'yithMyPluginPanel',
	array(
		'blockEditorSettings' => $editor_settings,
	)
);
```

### Media Library

In addition, if you want to enable the WordPress media library, you need to add the following filter to your React code:

```jsx
import { addFilter }   from '@wordpress/hooks';
import { MediaUpload } from '@wordpress/media-utils';

const replaceMediaUpload = () => MediaUpload;

addFilter(
	'editor.MediaUpload',
	'yith-my-plugin/panel/replace-media-upload',
	replaceMediaUpload
);
```

## Use the block editor

To use the block editor, you need to add the BlockEditor component to your React code, as follows:

```jsx
import { useState }         from 'react';
import { BlockEditor }      from '@yith/block-editor';
import { parse, serialize } from '@wordpress/blocks';

export default function MyOptions() {
	const [description, setDescription] = useState(
		parse( `
			<!-- wp:paragraph -->
			<p>This is an example!</p>
			<!-- /wp:paragraph -->
			`
		)
	);

	return (
		<div>
			<BlockEditor
				blocks={description}
				onChange={setDescription}
				settings={yithMyPluginPanel.blockEditorSettings}
			/>
		</div>
	);
}
```

You can use the `parse` and `serialize` functions from `@wordpress/blocks` to convert the blocks to HTML and vice versa.