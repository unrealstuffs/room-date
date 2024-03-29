/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Note } from '../constants/Types'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Login: undefined
	Root: undefined
	Note: Omit<Note, 'groupId' | 'date' | 'createdAt'> | undefined
	User: undefined
	Group: NavigatorScreenParams<RootTabParamList> | undefined
	Scanner: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
	Feed: undefined
	Notes: undefined
	Settings: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>
