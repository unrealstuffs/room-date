import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components/native'
import firestore from '@react-native-firebase/firestore'

import RootActionsModal from '../components/modals/RootActionsModal'
import Room from '../components/parts/Room'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { RoomTypes } from '../constants/Data'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RootStackScreenProps } from '../types'

import { useActions } from '../hooks/useActions'

interface RenderItemProps {
	item: RoomTypes
}

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	const theme = useTheme()
	const { user } = useTypedSelector(state => state.user)
	const { rooms } = useTypedSelector(state => state.rooms)
	const { setRooms } = useActions()

	useEffect(() => {
		const subscriber = firestore()
			.collection('rooms')
			.onSnapshot(querySnapshot => {
				const list: any = []
				querySnapshot.forEach(doc => {
					const data = doc.data()
					list.push({
						id: doc.id,
						...data,
					})
				})

				setRooms(list)
			})
		return () => subscriber()
	}, [])

	useEffect(() => {
		!user && navigation.navigate('Login')
	}, [user])

	return (
		<>
			<Container backgroundColor={theme.colors.background}>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.secondary}
				>
					Список комнат
				</StyledText>
			</Container>
			{rooms?.length ? (
				<FlatList
					contentContainerStyle={{
						flex: 1,
						padding: 15,
						backgroundColor: theme.colors.background,
					}}
					data={rooms}
					renderItem={({ item }: RenderItemProps) => (
						<Room
							onPress={() => navigation.navigate('Room')}
							room={item}
						/>
					)}
					keyExtractor={room => room.id}
				/>
			) : (
				<Centered backgroundColor={theme.colors.background}>
					<StyledText fontSize={12} color={theme.colors.dark}>
						Созданные комнаты появятся здесь...
					</StyledText>
				</Centered>
			)}

			<RootActionsModal />
		</>
	)
}

export default RootScreen
