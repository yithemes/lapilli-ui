import ownerDocument from "../utils/ownerDocument";

const focusableSelector = [
	'input',
	'select',
	'textarea',
	'a[href]',
	'button',
	'[tabindex]',
	'audio[controls]',
	'video[controls]',
	'[contenteditable]:not([contenteditable="false"])',
].join( ',' );

interface CustomSortedNode {
	documentOrder: number;
	tabIndex: number;
	node: HTMLElement;
}

function getTabIndex( node: HTMLElement ): number {
	const tabIndexAttribute = parseInt( node.getAttribute( 'tabindex' ) || '', 10 );

	if ( !Number.isNaN( tabIndexAttribute ) ) {
		return tabIndexAttribute;
	}

	// Browsers do not return `tabIndex` correctly for contentEditable nodes;
	// https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
	// so if they don't have a tabindex attribute specifically set, assume it's 0.
	// in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
	//  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
	//  yet they are still part of the regular tab order; in FF, they get a default
	//  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
	//  order, consider their tab index to be 0.
	if (
		node.contentEditable === 'true' ||
		( ( node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS' ) && node.getAttribute( 'tabindex' ) === null )
	) {
		return 0;
	}

	return node.tabIndex;
}

/**
 * Returns true if the element is not focusable and is part of a radio group.
 * For radio groups, the focusable one is the first or checked one.
 * @param node
 */
function isNonFocusableRadio( node: HTMLInputElement ): boolean {
	if ( node.tagName !== 'INPUT' || node.type !== 'radio' || !node.name ) {
		return false;
	}

	const getRadio = ( selector: string ) => ownerDocument( node ).querySelector( `input[type="radio"]${ selector }` );

	// If there is a checked radio button, get it; on the contrary, get the first one of the group.
	let radio = getRadio( `[name="${ node.name }"]:checked` );
	radio = !!radio ? radio : getRadio( `[name="${ node.name }"]` );

	return radio !== node;
}

function isFocusableNode( node: HTMLInputElement ): boolean {
	return !( node.disabled || ( node.tagName === 'INPUT' && node.type === 'hidden' ) || isNonFocusableRadio( node ) );
}

export function getFocusable( root: HTMLElement ): HTMLElement[] {
	const defaultSortedNodes: HTMLElement[] = [];
	const customSortedNodes: CustomSortedNode[] = [];

	Array.from( root.querySelectorAll( focusableSelector ) ).forEach( ( node, i ) => {
		const nodeTabIndex = getTabIndex( node as HTMLElement );

		if ( nodeTabIndex === -1 || !isFocusableNode( node as HTMLInputElement ) ) {
			return;
		}

		if ( nodeTabIndex === 0 ) {
			defaultSortedNodes.push( node as HTMLElement );
		} else {
			customSortedNodes.push( {
				documentOrder: i,
				tabIndex: nodeTabIndex,
				node: node as HTMLElement,
			} );
		}
	} );

	return customSortedNodes
		.sort( ( a, b ) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex, )
		.map( ( a ) => a.node )
		.concat( defaultSortedNodes );
}