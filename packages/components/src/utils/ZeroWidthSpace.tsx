import React from 'react';

const ZeroWidthSpace = () => {
	// Use notranslate to prevent Google Translate will remove the ZeroWidthSpace char.
	return <span className="notranslate" aria-hidden={ true }>&#8203;</span>;
};

export default ZeroWidthSpace;