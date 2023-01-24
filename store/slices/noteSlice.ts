import { createSlice } from '@reduxjs/toolkit'
import { Note } from '../../constants/Types'

const initialState = {
	note: {} as Note,
}

const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		setNote(state, action) {
			state.note = action.payload
		},
	},
})

export const noteReducer = noteSlice.reducer
export const noteActions = noteSlice.actions
