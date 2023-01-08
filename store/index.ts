import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { currentRoomReducer } from './slices/currentRoomSlice'
import { dataReducer } from './slices/dataSlice'
import { themeReducer } from './slices/themeSlice'
import { userReducer } from './slices/userSlice'

const rootReducer = combineReducers({
	data: dataReducer,
	user: userReducer,
	theme: themeReducer,
	currentRoom: currentRoomReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
