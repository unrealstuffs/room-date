import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentRoom: {
		id: '',
		title: '',
		inviteCode: '',
		category: '',
		members: [],
		theme: '',
	},
}

const currentRoomSlice = createSlice({
	name: 'currentRoom',
	initialState,
	reducers: {
		setCurrentRoom(state, action) {
			state.currentRoom = action.payload
		},
	},
})

export const currentRoomReducer = currentRoomSlice.reducer
export const currentRoomActions = currentRoomSlice.actions
