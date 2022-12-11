import { createSlice } from '@reduxjs/toolkit'

interface User {
	uid: string
	displayName: string
	email: string
	photoURL: string
}

interface InitialState {
	user: User | null
}

const initialState: InitialState = {
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		removeUser(state) {
			state.user = null
		},
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
