import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { currentRoomActions } from '../store/slices/currentRoomSlice'
import { dataActions } from '../store/slices/dataSlice'
import { themeActions } from '../store/slices/themeSlice'
import { userActions } from '../store/slices/userSlice'

const allActions = {
	...dataActions,
	...userActions,
	...themeActions,
	...currentRoomActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
