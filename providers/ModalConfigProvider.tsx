import { ReactNode, FC } from 'react'
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

export interface ModalStackParams {
	UserModal: undefined
	MemberModal: {
		name: string
		photoURL: string
	}
	ThemeSwitcherModal: undefined
	CodeModal: undefined
}

const ModalConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const modalConfig: ModalStackConfig = {
		UserModal,
		MemberModal,
		ThemeSwitcherModal,
		CodeModal,
	}
	const defaultOptions: ModalOptions = {
		backdropOpacity: 0.6,
	}

	const stack = createModalStack(modalConfig, defaultOptions)

	return <ModalProvider stack={stack}>{children}</ModalProvider>
}

export default ModalConfigProvider
