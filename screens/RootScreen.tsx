import { FlatList, View } from 'react-native'
import { useCallback, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import GroupItem from '../components/parts/GroupItem'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { RootStackScreenProps } from '../navigation/types'
import { Group } from '../constants/Types'
import { useActions } from '../hooks/useActions'
import {
	StyledAction,
	StyledActions,
} from '../components/styled/Actions.styled'
import { useFocusEffect } from '@react-navigation/native'
import { useTypedSelector } from '../hooks/useTypedSelector'
import HeaderRoot from '../components/parts/HeaderRoot'
import Avatar from '../components/parts/Avatar'

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	const { groups } = useTypedSelector(state => state.data)
	const { setGroupId, setSheet, removeData } = useActions()
	const { qrData } = useTypedSelector(state => state.qr)
	const { user } = useTypedSelector(state => state.user)
	const theme = useTheme()

	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => <HeaderRoot />,
			headerRight: () => (
				<Avatar
					size={30}
					uri={user.photoURL}
					name={user.displayName || 'Не известно'}
					onPress={() => navigation.navigate('User')}
				/>
			),
			headerShadowVisible: false,
			headerStyle: {
				backgroundColor: theme.colors.background,
			},
		})
	}, [theme, user])

	useFocusEffect(
		useCallback(() => {
			setGroupId('')
			removeData()
			qrData && setSheet('joinGroup')
		}, [])
	)

	return (
		<>
			<Container backgroundColor={theme.colors.background}>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.light}
				>
					Список групп
				</StyledText>
			</Container>
			<View
				style={{
					flex: 1,
					backgroundColor: theme.colors.background,
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
					<Centered backgroundColor={theme.colors.background}>
						<StyledText fontSize={12} color={theme.colors.dark}>
							Созданные группы появятся здесь...
						</StyledText>
					</Centered>
				)}
			</View>

			<StyledActions>
				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={() => {
						setSheet('joinGroup')
					}}
				>
					<AntDesign
						name='addusergroup'
						size={23}
						color={theme.colors.light}
					/>
				</StyledAction>

				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={() => {
						setSheet('createGroup')
					}}
				>
					<AntDesign
						name='plus'
						size={23}
						color={theme.colors.light}
					/>
				</StyledAction>
			</StyledActions>
		</>
	)
}

export default RootScreen
