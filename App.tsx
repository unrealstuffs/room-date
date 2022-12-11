import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import {
	ModalProvider,
	createModalStack,
	ModalStackConfig,
	ModalOptions,
} from 'react-native-modalfy'
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native'

import RootNavigator from './navigation'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { store } from './store'
import UserModal from './components/modals/UserModal'
import MemberModal from './components/modals/MemberModal'
import AuthProvider from './providers/AuthProvider'

export interface ModalStackParams {
	UserModal: undefined
	MemberModal: undefined
}

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()

	const modalConfig: ModalStackConfig = { UserModal, MemberModal }
	const defaultOptions: ModalOptions = {
		backdropOpacity: 0.6,
	}

	const stack = createModalStack(modalConfig, defaultOptions)

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={store}>
					<AuthProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<NavigationContainer
								theme={
									colorScheme === 'dark'
										? DarkTheme
										: DefaultTheme
								}
							>
								<ModalProvider stack={stack}>
									<RootNavigator />
									<StatusBar />
								</ModalProvider>
							</NavigationContainer>
						</GestureHandlerRootView>
					</AuthProvider>
				</Provider>
			</SafeAreaProvider>
		)
	}
}
