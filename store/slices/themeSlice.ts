import { createSlice } from '@reduxjs/toolkit'
import { classic } from '../../themes'
import { Theme } from '../../themes/types'

interface InitialState {
	theme: Theme
}

const initialState: InitialState = {
	theme: classic,
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload
		},
	},
})

export const themeReducer = themeSlice.reducer
export const themeActions = themeSlice.actions
