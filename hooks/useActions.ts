import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { dataActions } from '../store/slices/dataSlice'
import { roomActions } from '../store/slices/roomSlice'
import { themeActions } from '../store/slices/themeSlice'
import { userActions } from '../store/slices/userSlice'

const allActions = {
	...dataActions,
	...roomActions,
	...userActions,
	...themeActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
