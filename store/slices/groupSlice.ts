import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	groupId: '',
	noteId: '',
}

const groupSlice = createSlice({
	name: 'dataIds',
	initialState,
	reducers: {
		setGroupId(state, action: PayloadAction<string>) {
			state.groupId = action.payload
		},
		setNoteId(state, action: PayloadAction<string>) {
			state.noteId = action.payload
		},
		removeIds(state) {
			;(state.groupId = ''), (state.noteId = '')
		},
	},
})

export const groupReducer = groupSlice.reducer
export const groupActions = groupSlice.actions
