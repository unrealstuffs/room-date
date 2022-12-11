import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Pressable } from 'react-native'
import { useModal } from 'react-native-modalfy'

import NotFoundScreen from '../screens/NotFoundScreen'
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types'
import LoginScreen from '../screens/LoginScreen'
import FeedScreen from '../screens/FeedScreen'
import EventsScreen from '../screens/EventsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import RootScreen from '../screens/RootScreen'
import Avatar from '../components/parts/Avatar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Themes from '../constants/Themes'
import HeaderRoot from '../components/parts/HeaderRoot'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
	const { user } = useTypedSelector(state => state.user)
	const { openModal } = useModal()
	return (
		<Stack.Navigator initialRouteName='Root'>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
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
					headerStyle: { backgroundColor: Themes.light.background },
				})}
			/>
			<Stack.Screen
				name='Room'
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
		</Stack.Navigator>
	)
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName='Feed'
			screenOptions={{
				tabBarActiveTintColor: Themes.light.primary,
				headerTitle: '#133769420',
				headerTitleAlign: 'center',
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
							onPress={() => navigation.navigate('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Themes.light.secondary}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => {}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={Themes.light.secondary}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name='Events'
				component={EventsScreen}
				options={({ navigation }: RootTabScreenProps<'Events'>) => ({
					title: 'События',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='calendar' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.navigate('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Themes.light.secondary}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => {}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={Themes.light.secondary}
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
					title: 'События',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='setting' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.navigate('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Themes.light.secondary}
								style={{ marginHorizontal: 15 }}
							/>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => {}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='qrcode'
								size={25}
								color={Themes.light.secondary}
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
