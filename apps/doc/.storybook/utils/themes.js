import { defaultThemeOptions } from '@yith/styles';

export const themes = {
	'Default'  : defaultThemeOptions,
	'Purple' : {
		palette    : {
			primary  : {
				main        : '#8864b9',
				light       : '#aa86dc',
				contrastText: '#ffffff'
			},
			secondary: {
				main        : '#cb46aa',
				light       : '#e572c2',
				contrastText: '#ffffff'
			}
		},
		baseSpacing: 8,
		fields     : {
			borderRadius      : '22px',
			focusedBorderColor: '#a983de'
		},
		components : {
			Button: {
				Root: {
					borderRadius: '50px'
				}
			}
		}
	},
	'Squared': {
		palette    : {
			primary  : {
				main        : '#191d25',
				light       : '#313e5a',
				contrastText: '#ffffff'
			},
			secondary: {
				main        : '#377555',
				light       : '#50926f',
				contrastText: '#ffffff'
			}
		},
		baseSpacing: 8,
		shape      : { borderRadius: 0 },
		fields     : {
			borderRadius      : 0,
			focusedBorderColor: '#191d25'
		},
		components : {
			Button: {
				Root: {
					borderRadius: 0
				}
			}
		}
	},
	'Dark'   : {
		mode       : 'dark',
		palette    : {
			primary   : {
				main        : '#2490e5',
				light       : '#4396d8',
				contrastText: '#ffffff'
			},
			border    : {
				normal: '#344656'
			},
			action    : {
				active            : 'rgba( 255, 255, 255, 0.5 )', // Color of active action (ex: icon button).
				hoverOpacity      : 0.04, // Opacity of hovered action background.
				selected          : 'rgba( 255, 255, 255, 0.08 )', // Color of selected action (ex: background in tags in select multiple).
				selectedOpacity   : 0.08, // Opacity of selected action background (ex: option in select field).
				disabled          : 'rgba(255, 255, 255, 0.26)', // Color of disabled action.
				disabledBackground: 'rgba(255, 255, 255, 0.12)', // Background of disabled action.
				disabledOpacity   : 0.38,
				focusOpacity      : 0.12
			},
			background: {
				default : '#131c24',
				dropdown: '#131c24'
			},
			text      : {
				default: 'rgba(255,255,255,0.9)'
			}
		},
		baseSpacing: 8,
		fields     : {
			borderColor       : '#344656',
			background        : '#131c24',
			color             : '#d5e0ea',
			focusedBorderColor: '#30506b',
			focusedBoxShadow  : '0',
			placeholderColor  : 'rgba(235, 235, 235, 0.62)'
		},
		components : {
			Dropdown: {
				Popover: {
					color    : '#d5e0ea',
					boxShadow: '0 2px 8px 0 rgba(0, 8, 20, .48)'
				}
			}
		}
	}
}