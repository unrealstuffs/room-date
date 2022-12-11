import { createSlice } from '@reduxjs/toolkit'
import { members, rooms, events } from '../../constants/Data'

const initialState = {
	rooms,
	members,
	events,
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
})

export const dataReducer = dataSlice.reducer
export const dataActions = dataSlice.actions
