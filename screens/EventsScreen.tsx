import { AntDesign } from '@expo/vector-icons'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderRoom from '../components/parts/HeaderRoom'
import Centered from '../components/ui/Centered'
import Container from '../components/ui/Container'
import Title from '../components/ui/Title'
import Themes from '../constants/Themes'

const EventsScreen = () => {
	const createEventBottomModal = useRef<BottomSheetModal>(null)

	const snapPoints = useMemo(() => ['30', '50'], [])

	const handlePresentCreateEventForm = useCallback(() => {
		createEventBottomModal.current?.present()
	}, [])

	return (
		<Container>
			<HeaderRoom />
			<Title>События комнаты</Title>
			<Centered>
				<Text style={{ fontSize: 12, color: Themes.light.dark }}>
					Созданные события появятся здесь...
				</Text>
			</Centered>
			<BottomSheetModalProvider>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						onPress={handlePresentCreateEventForm}
					>
						<AntDesign name='plus' size={23} color='#fff' />
					</TouchableOpacity>

					<BottomSheetModal
						ref={createEventBottomModal}
						index={1}
						snapPoints={snapPoints}
						handleIndicatorStyle={{
							backgroundColor: Themes.light.light,
						}}
					>
						<Text>Pizda</Text>
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</Container>
	)
}

export default EventsScreen

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-reg',
		marginBottom: 10,
	},
	buttons: {
		position: 'absolute',
		bottom: 15,
		right: 15,
	},
	button: {
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Themes.light.primary,
		borderRadius: 999,
		marginTop: 15,
	},
})
