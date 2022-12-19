import { Theme } from './types'

export const classic: Theme = {
	name: 'classic',
	colors: {
		primary: '#4859F2',
		secondary: '#0A0C24',
		background: '#fafafa',
		danger: '#D64545',
		dark: '#909090',
		light: '#ececec',
		white: '#fff',
	},
}

export const nature: Theme = {
	name: 'nature',
	colors: {
		primary: '#6A994E',
		secondary: '#041304',
		background: '#F5FAFF',
		danger: '#BC4749',
		dark: '#909090',
		light: '#F2E8CF',
		white: '#fff',
	},
}

export const love: Theme = {
	name: 'love',
	colors: {
		primary: '#DE369D',
		secondary: '#170606',
		background: '#FFEFF1',
		danger: '#FF6663',
		dark: '#6F5E76',
		light: '#EFD6D2',
		white: '#fff',
	},
}

export default { classic, nature, love }
