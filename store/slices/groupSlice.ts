import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	groupId: '' as string,
}

const groupSlice = createSlice({
	name: 'groupId',
	initialState,
	reducers: {
		setGroupId(state, action: PayloadAction<string>) {
			state.groupId = action.payload
		},
	},
})

export const groupReducer = groupSlice.reducer
export const groupActions = groupSlice.actions
