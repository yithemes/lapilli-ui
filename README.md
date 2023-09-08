# Lapilli UI

Speed up your development process by using the UI components provided by the **Lapilli UI**.

It contains different packages:

- **Components**: a library of components you can use in your app to create your layout.
- **Styles**: the styling solution used by Lapilli UI that allows you to style components with different themes.
- **Date**: a date module to easily handle dates.
- **BlockEditor**: a library to use the WordPress Gutenberg block editor through the BlockEditor component.

### Usage

Here an example of a basic app using the Button component.

```jsx
import * as React from 'react';
import Button     from '@lapilli-ui/components';

function App() {
	return <Button variant="outlined" color="secondary">Click me</Button>;
}
```

Enjoy it! ;-)