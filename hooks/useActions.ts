import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { sheetActions } from '../store/slices/sheetSlice'
import { groupActions } from '../store/slices/groupSlice'
import { userActions } from '../store/slices/userSlice'
import { noteActions } from '../store/slices/noteSlice'
import { qrActions } from '../store/slices/qrSlice'

const allActions = {
	...userActions,
	...groupActions,
	...sheetActions,
	...noteActions,
	...qrActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
