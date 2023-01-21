import { createSlice } from '@reduxjs/toolkit'

type Sheets = 'createNote' | 'createGroup' | 'joinGroup' | 'editNote' | null

const initialState = {
	sheet: null as Sheets,
}

const sheetSlice = createSlice({
	name: 'sheet',
	initialState,
	reducers: {
		setSheet(state, action) {
			state.sheet = action.payload
		},
	},
})

export const sheetReducer = sheetSlice.reducer
export const sheetActions = sheetSlice.actions
