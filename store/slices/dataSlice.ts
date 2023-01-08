import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rooms: [],
	members: [],
	events: [],
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setRooms(state, action) {
			state.rooms = action.payload
		},
		setEvents(state, action) {
			state.events = action.payload
		},
	},
})

export const dataReducer = dataSlice.reducer
export const dataActions = dataSlice.actions
