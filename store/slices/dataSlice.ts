import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group, Note } from '../../constants/Types'

const initialState = {
	group: {} as Group,
	notes: [] as Note[],
}

const dataSlice = createSlice({
	name: 'groupId',
	initialState,
	reducers: {
		setDataGroups(state, action: PayloadAction<Group>) {
			state.group = action.payload
		},
		setDataNotes(state, action: PayloadAction<Note[]>) {
			state.notes = action.payload
		},
		removeData(state) {
			state.group = {} as Group
			state.notes = [] as Note[]
		},
	},
})

export const dataReducer = dataSlice.reducer
export const dataActions = dataSlice.actions
