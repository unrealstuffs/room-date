/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import NotFoundScreen from '../screens/NotFoundScreen'
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types'
import LoginScreen from '../screens/LoginScreen'
import UserScreen from '../screens/UserScreen'
import FeedScreen from '../screens/FeedScreen'
import EventsScreen from '../screens/EventsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import RootScreen from '../screens/RootScreen'

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName
}) {
	return (
		<NavigationContainer
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	)
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
	return (
		<Stack.Navigator initialRouteName='Root'>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Root' component={RootScreen} />
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
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='User' component={UserScreen} />
			</Stack.Group>
		</Stack.Navigator>
	)
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
	const colorScheme = useColorScheme()

	return (
		<BottomTab.Navigator
			initialRouteName='Feed'
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name='Feed'
				component={FeedScreen}
				options={({ navigation }: RootTabScreenProps<'Feed'>) => ({
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='home' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.replace('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Colors[colorScheme].text}
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
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='calendar' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.replace('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Colors[colorScheme].text}
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
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='setting' color={color} />
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.replace('Root')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name='arrowleft'
								size={25}
								color={Colors[colorScheme].text}
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
	return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />
}
