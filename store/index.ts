import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { dataReducer } from './slices/dataSlice'
import { userReducer } from './slices/userSlice'

const rootReducer = combineReducers({
	data: dataReducer,
	user: userReducer,
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
