import { useCallback, useMemo, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useTheme } from 'styled-components/native'

import FormCreateRoom from '../forms/FormCreateRoom'
import FormJoinRoom from '../forms/FormJoinRoom'
import { StyledAction, StyledActions } from '../styled/Actions.styled'

const RootActionsModal = () => {
	const theme = useTheme()
	const snapPoints = useMemo(() => ['30', '50'], [])

	const createRoomBottomModal = useRef<BottomSheetModal>(null)
	const joinRoomBottomModal = useRef<BottomSheetModal>(null)

	const handlePresentCreateRoomForm = useCallback(() => {
		createRoomBottomModal.current?.present()
	}, [])

	const handlePresentJoinRoomForm = useCallback(() => {
		joinRoomBottomModal.current?.present()
	}, [])

	return (
		<BottomSheetModalProvider>
			<StyledActions>
				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={handlePresentJoinRoomForm}
				>
					<AntDesign
						name='addusergroup'
						size={23}
						color={theme.colors.white}
					/>
				</StyledAction>

				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={handlePresentCreateRoomForm}
				>
					<AntDesign
						name='plus'
						size={23}
						color={theme.colors.white}
					/>
				</StyledAction>

				<BottomSheetModal
					ref={joinRoomBottomModal}
					index={1}
					snapPoints={snapPoints}
					handleIndicatorStyle={{
						backgroundColor: theme.colors.light,
					}}
					backgroundStyle={{
						backgroundColor: theme.colors.background,
						elevation: 5,
					}}
				>
					<FormJoinRoom />
				</BottomSheetModal>

				<BottomSheetModal
					ref={createRoomBottomModal}
					index={1}
					snapPoints={snapPoints}
					handleIndicatorStyle={{
						backgroundColor: theme.colors.light,
					}}
					backgroundStyle={{
						backgroundColor: theme.colors.background,
						elevation: 5,
					}}
				>
					<FormCreateRoom />
				</BottomSheetModal>
			</StyledActions>
		</BottomSheetModalProvider>
	)
}

export default RootActionsModal
