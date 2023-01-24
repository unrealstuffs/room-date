import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import RootNavigator from './navigation'
import useCachedResources from './hooks/useCachedResources'
import { store } from './store'
import AuthProvider from './providers/AuthProvider'
import ModalConfigProvider from './providers/ModalConfigProvider'
import BottomActionsModal from './components/modals/BottomSheetModal'
import GroupProvider from './providers/GroupProvider'

dayjs.locale('ru')

export default function App() {
	const isLoadingComplete = useCachedResources()

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={store}>
					<AuthProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<NavigationContainer>
								<ModalConfigProvider>
									<GroupProvider>
										<RootNavigator />
										<StatusBar />
										<BottomActionsModal />
									</GroupProvider>
								</ModalConfigProvider>
							</NavigationContainer>
						</GestureHandlerRootView>
					</AuthProvider>
				</Provider>
			</SafeAreaProvider>
		)
	}
}
