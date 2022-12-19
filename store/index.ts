import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { dataReducer } from './slices/dataSlice'
import { roomReducer } from './slices/roomSlice'
import { themeReducer } from './slices/themeSlice'
import { userReducer } from './slices/userSlice'

const rootReducer = combineReducers({
	data: dataReducer,
	rooms: roomReducer,
	user: userReducer,
	theme: themeReducer,
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
