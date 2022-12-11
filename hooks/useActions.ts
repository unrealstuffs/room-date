import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { dataActions } from '../store/slices/dataSlice'
import { userActions } from '../store/slices/userSlice'

const allActions = {
	...dataActions,
	...userActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
