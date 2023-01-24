import { FlatList, View } from 'react-native'
import { useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons'

import GroupItem from '../components/parts/GroupItem'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { RootStackScreenProps } from '../navigation/types'
import { useGroups } from '../hooks/useGroups'
import { Group } from '../constants/Types'
import { useActions } from '../hooks/useActions'
import {
	StyledAction,
	StyledActions,
} from '../components/styled/Actions.styled'
import { useFocusEffect } from '@react-navigation/native'
import themes from '../themes'
import { useTypedSelector } from '../hooks/useTypedSelector'

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	const { groups } = useTypedSelector(state => state.data)
	const { setGroupId, setSheet, removeData } = useActions()
	const { qrData } = useTypedSelector(state => state.qr)

	useFocusEffect(
		useCallback(() => {
			setGroupId('')
			removeData()
			qrData && setSheet('joinGroup')
		}, [])
	)

	return (
		<>
			<Container backgroundColor={themes.classic.colors.background}>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={themes.classic.colors.light}
				>
					Список групп
				</StyledText>
			</Container>
			<View
				style={{
					flex: 1,
					backgroundColor: themes.classic.colors.background,
					height: '100%',
				}}
			>
				{groups.length ? (
					<FlatList
						contentContainerStyle={{
							padding: 15,
						}}
						data={groups}
						renderItem={({ item }: { item: Group }) => (
							<GroupItem
								onPress={() => {
									setGroupId(item.id)
									navigation.navigate('Group')
								}}
								group={item}
								loading={false}
							/>
						)}
						keyExtractor={group => group.id}
					/>
				) : (
					<Centered
						backgroundColor={themes.classic.colors.background}
					>
						<StyledText
							fontSize={12}
							color={themes.classic.colors.dark}
						>
							Созданные группы появятся здесь...
						</StyledText>
					</Centered>
				)}
			</View>

			<StyledActions>
				<StyledAction
					backgroundColor={themes.classic.colors.primary}
					onPress={() => {
						setSheet('joinGroup')
					}}
				>
					<AntDesign
						name='addusergroup'
						size={23}
						color={themes.classic.colors.light}
					/>
				</StyledAction>

				<StyledAction
					backgroundColor={themes.classic.colors.primary}
					onPress={() => {
						setSheet('createGroup')
					}}
				>
					<AntDesign
						name='plus'
						size={23}
						color={themes.classic.colors.light}
					/>
				</StyledAction>
			</StyledActions>
		</>
	)
}

export default RootScreen
