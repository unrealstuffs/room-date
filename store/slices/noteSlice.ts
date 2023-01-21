import { createSlice } from '@reduxjs/toolkit'
import { UpdateNote } from '../../constants/Types'

const initialState = {
	note: {} as UpdateNote,
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
