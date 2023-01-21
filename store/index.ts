import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { sheetReducer } from './slices/sheetSlice'
import { groupReducer } from './slices/groupSlice'
import { userReducer } from './slices/userSlice'
import { noteReducer } from './slices/noteSlice'
import { qrReducer } from './slices/qrSlice'

const rootReducer = combineReducers({
	user: userReducer,
	group: groupReducer,
	sheet: sheetReducer,
	note: noteReducer,
	qr: qrReducer,
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
