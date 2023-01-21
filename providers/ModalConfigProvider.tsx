import { ReactNode, FC } from 'react'
import { useWindowDimensions } from 'react-native'
import {
	ModalProvider,
	createModalStack,
	ModalStackConfig,
	ModalOptions,
} from 'react-native-modalfy'
import UserModal from '../components/modals/UserModal'
import MemberModal from '../components/modals/MemberModal'
import ThemeSwitcherModal from '../components/modals/ThemeSwitcherModal'
import CodeModal from '../components/modals/CodeModal'
import { Easing } from 'react-native-reanimated'

export interface ModalStackParams {
	UserModal: undefined
	MemberModal: {
		uid: string
		name: string
		photoURL: string
		isCurrentUser: boolean
	}
	ThemeSwitcherModal: { theme: string }
	CodeModal: undefined
}

const ModalConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { height } = useWindowDimensions()
	const modalConfig: ModalStackConfig = {
		UserModal,
		MemberModal,
		ThemeSwitcherModal,
		CodeModal,
	}
	const defaultOptions: ModalOptions = {
		animateInConfig: {
			easing: Easing.inOut(Easing.exp),
			duration: 400,
		},
		animateOutConfig: {
			easing: Easing.inOut(Easing.exp),
			duration: 400,
		},
		backdropOpacity: 0.6,
		position: 'center',
		transitionOptions: animatedValue => ({
			transform: [
				{
					translateY: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [height, 0, height],
					}),
				},
				{
					scale: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, 1, 0.9],
					}),
				},
			],
		}),
	}

	const stack = createModalStack(modalConfig, defaultOptions)

	return <ModalProvider stack={stack}>{children}</ModalProvider>
}

export default ModalConfigProvider
