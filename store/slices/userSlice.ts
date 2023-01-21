import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../constants/Types'

const initialState = {
	user: {} as User,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		removeUser(state) {
			state.user = initialState.user
		},
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
