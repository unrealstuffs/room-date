import { Theme } from './types'

export const classic: Theme = {
	name: 'classic',
	colors: {
		primary: '#4859F2',
		secondary: '#1D204B',
		background: '#101331',
		danger: '#F26164',
		dark: '#797979',
		light: '#ececec',
	},
}

export const nature: Theme = {
	name: 'nature',
	colors: {
		primary: '#6A994E',
		secondary: '#113611',
		background: '#0A2109',
		danger: '#E55E62',
		dark: '#707770',
		light: '#E7E7E7',
	},
}

export const love: Theme = {
	name: 'love',
	colors: {
		primary: '#DE369D',
		secondary: '#40142E',
		background: '#2D0C20',
		danger: '#DE5240',
		dark: '#6F5E76',
		light: '#E9DEDC',
	},
}

export const sun: Theme = {
	name: 'sun',
	colors: {
		primary: '#D4B442',
		secondary: '#402E14',
		background: '#2D1A0C',
		danger: '#FF7F63',
		dark: '#766F5E',
		light: '#E8EAD4',
	},
}

export const blood: Theme = {
	name: 'blood',
	colors: {
		primary: '#E75E5E',
		secondary: '#401414',
		background: '#2D0C0C',
		danger: '#FF3030',
		dark: '#765E5E',
		light: '#EBDFDF',
	},
}

export default { classic, nature, love, sun, blood }
