import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
	useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useActions } from '../../hooks/useActions'
import { useTheme } from 'styled-components/native'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import FormCreateGroup from '../forms/FormCreateGroup'
import FormJoinGroup from '../forms/FormJoinGroup'

const BottomActionsModal = () => {
	const bottomModal = useRef<BottomSheetModal>(null)
	const { sheet } = useTypedSelector(state => state.sheet)
	const { setSheet, setQRData } = useActions()
	const theme = useTheme()

	const snapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], [])

	const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout,
	} = useBottomSheetDynamicSnapPoints(snapPoints)

	useEffect(() => {
		sheet && presentBottomSheet()
	}, [sheet])

	const presentBottomSheet = useCallback(() => {
		bottomModal.current?.present()
	}, [])

	return (
		<BottomSheetModalProvider>
			<BottomSheetModal
				ref={bottomModal}
				index={1}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				snapPoints={animatedSnapPoints}
				onDismiss={() => {
					setSheet('')
					setQRData('')
				}}
				handleIndicatorStyle={{
					backgroundColor: theme.colors.dark,
				}}
				backgroundStyle={{
					backgroundColor: theme.colors.secondary,
					elevation: 5,
				}}
			>
				<BottomSheetView onLayout={handleContentLayout}>
					{sheet === 'createGroup' && <FormCreateGroup />}
					{sheet === 'joinGroup' && <FormJoinGroup />}
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	)
}

export default BottomActionsModal
