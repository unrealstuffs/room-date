import { AntDesign } from '@expo/vector-icons'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormCreateRoom from '../components/forms/FormCreateRoom'
import FormJoinRoom from '../components/forms/FormJoinRoom'
import Room from '../components/parts/Room'
import Container from '../components/ui/Container'
import Title from '../components/ui/Title'
import Themes from '../constants/Themes'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RootStackScreenProps } from '../types'

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	const { user } = useTypedSelector(state => state.user)
	const { rooms } = useTypedSelector(state => state.data)

	const snapPoints = useMemo(() => ['30', '50'], [])

	const createRoomBottomModal = useRef<BottomSheetModal>(null)
	const joinRoomBottomModal = useRef<BottomSheetModal>(null)

	const handlePresentCreateRoomForm = useCallback(() => {
		createRoomBottomModal.current?.present()
	}, [])

	const handlePresentJoinRoomForm = useCallback(() => {
		joinRoomBottomModal.current?.present()
	}, [])

	useEffect(() => {
		!user && navigation.navigate('Login')
	}, [user])

	return (
		<Container backgroundColor={Themes.light.background}>
			<Title>Список комнат</Title>
			{rooms.map(room => (
				<Room
					key={room.id}
					onPress={() => navigation.navigate('Room')}
					{...room}
				/>
			))}

			<BottomSheetModalProvider>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						onPress={handlePresentJoinRoomForm}
					>
						<AntDesign name='addusergroup' size={23} color='#fff' />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={handlePresentCreateRoomForm}
					>
						<AntDesign name='plus' size={23} color='#fff' />
					</TouchableOpacity>

					<BottomSheetModal
						ref={joinRoomBottomModal}
						index={1}
						snapPoints={snapPoints}
						handleIndicatorStyle={{
							backgroundColor: Themes.light.light,
						}}
					>
						<FormJoinRoom />
					</BottomSheetModal>

					<BottomSheetModal
						ref={createRoomBottomModal}
						index={1}
						snapPoints={snapPoints}
						handleIndicatorStyle={{
							backgroundColor: Themes.light.light,
						}}
					>
						<FormCreateRoom />
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</Container>
	)
}

export default RootScreen

const styles = StyleSheet.create({
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
