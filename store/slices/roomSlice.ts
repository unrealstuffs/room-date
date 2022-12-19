import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rooms: [],
}

const roomSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		setRooms(state, action) {
			state.rooms = action.payload
		},
	},
})

export const roomReducer = roomSlice.reducer
export const roomActions = roomSlice.actions
