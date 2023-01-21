import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	qrData: '' as string,
}

const qrSlice = createSlice({
	name: 'qrData',
	initialState,
	reducers: {
		setQRData(state, action: PayloadAction<string>) {
			state.qrData = action.payload
		},
	},
})

export const qrReducer = qrSlice.reducer
export const qrActions = qrSlice.actions
