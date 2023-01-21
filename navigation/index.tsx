import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'
import { useModal } from 'react-native-modalfy'

import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from './types'
import LoginScreen from '../screens/LoginScreen'
import FeedScreen from '../screens/FeedScreen'
import NotesScreen from '../screens/NotesScreen'
import SettingsScreen from '../screens/SettingsScreen'
import RootScreen from '../screens/RootScreen'
import Avatar from '../components/parts/Avatar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import HeaderRoot from '../components/parts/HeaderRoot'
import { useTheme } from '../hooks/useTheme'
import themes from '../themes'
import { useGroup } from '../hooks/useGroup'
import ScannerScreen from '../screens/ScannerScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
	const { user } = useTypedSelector(state => state.user)
	const { openModal } = useModal()

	return (
		<Stack.Navigator initialRouteName='Root'>
			{!user ? (
				<>
					<Stack.Screen
						name='Login'
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name='Root'
						component={RootScreen}
						options={() => ({
							headerTitle: () => <HeaderRoot />,
							headerRight: () => (
								<Avatar
									size={30}
									uri={user?.photoURL}
									onPress={() => openModal('UserModal')}
								/>
							),
							headerShadowVisible: false,
							headerStyle: {
								backgroundColor:
									themes.classic.colors.background,
							},
						})}
					/>
					<Stack.Screen
						name='Group'
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Scanner'
						component={ScannerScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
	const { openModal } = useModal()
	const theme = useTheme()
	const { group } = useGroup()

	return (
		<BottomTab.Navigator
			initialRouteName='Feed'
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				headerTitleAlign: 'center',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: theme.colors.background },
				tabBarStyle: {
					backgroundColor: theme.colors.background,
					borderTopWidth: 0,
				},
				headerTitleStyle: { color: theme.colors.light },
				headerTitle: group.title || 'Загрузка...',
			}}
		>
			<BottomTab.Screen
				name='Feed'
				component={FeedScreen}
				options={({ navigation }: RootTabScreenProps<'Feed'>) => ({
					title: 'Лента',

					tabBarIcon: ({ color }) => (
						<TabBarIcon name='home' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => {
								navigation.navigate('Root')
							}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => openModal('CodeModal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name='Notes'
				component={NotesScreen}
				options={({ navigation }: RootTabScreenProps<'Notes'>) => ({
					title: 'Заметки',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='calendar' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => {
								navigation.navigate('Root')
							}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => openModal('CodeModal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name='Settings'
				component={SettingsScreen}
				options={({ navigation }: RootTabScreenProps<'Settings'>) => ({
					title: 'Настройки',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='setting' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => {
								navigation.navigate('Root')
							}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => openModal('CodeModal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={theme.colors.light}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
		</BottomTab.Navigator>
	)
}

function TabBarIcon(props: {
	name: React.ComponentProps<typeof AntDesign>['name']
	color: string
}) {
	return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />
}
