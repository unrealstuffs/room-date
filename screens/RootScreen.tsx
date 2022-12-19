import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components/native'

import RootActionsModal from '../components/modals/RootActionsModal'
import Room from '../components/parts/Room'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { Rooms } from '../constants/Data'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RootStackScreenProps } from '../types'

interface RenderItemProps {
	item: Rooms
}

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	const theme = useTheme()
	const { user } = useTypedSelector(state => state.user)
	const { rooms } = useTypedSelector(state => state.data)

	useEffect(() => {
		!user && navigation.navigate('Login')
	}, [user])

	const renderItem = ({ item }: RenderItemProps) => (
		<Room onPress={() => navigation.navigate('Room')} room={item} />
	)

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
			{rooms.length ? (
				<FlatList
					contentContainerStyle={{
						padding: 15,
						backgroundColor: theme.colors.background,
					}}
					data={rooms}
					renderItem={renderItem}
					keyExtractor={event => event.id}
				/>
			) : (
				<Centered>
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
