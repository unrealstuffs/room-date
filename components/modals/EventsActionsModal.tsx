import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import { StyledAction, StyledActions } from '../styled/Actions.styled'
import FormCreateEvent from '../forms/FormCreateEvent'

const EventsActionsModal = () => {
	const theme = useTheme()
	const createEventBottomModal = useRef<BottomSheetModal>(null)

	const snapPoints = useMemo(() => ['30', '70'], [])

	const handlePresentCreateEventForm = useCallback(() => {
		createEventBottomModal.current?.present()
	}, [])

	return (
		<BottomSheetModalProvider>
			<StyledActions>
				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={handlePresentCreateEventForm}
				>
					<AntDesign
						name='plus'
						size={23}
						color={theme.colors.white}
					/>
				</StyledAction>

				<BottomSheetModal
					ref={createEventBottomModal}
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
					<FormCreateEvent />
				</BottomSheetModal>
			</StyledActions>
		</BottomSheetModalProvider>
	)
}

export default EventsActionsModal
