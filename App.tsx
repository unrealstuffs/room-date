import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import RootNavigator from './navigation'
import useCachedResources from './hooks/useCachedResources'
import { store } from './store'
import AuthProvider from './providers/AuthProvider'
import ModalConfigProvider from './providers/ModalConfigProvider'
import ThemeConfigProvider from './providers/ThemeConfigProvider'

export default function App() {
	const isLoadingComplete = useCachedResources()

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={store}>
					<ThemeConfigProvider>
						<AuthProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<NavigationContainer>
									<ModalConfigProvider>
										<RootNavigator />
										<StatusBar />
									</ModalConfigProvider>
								</NavigationContainer>
							</GestureHandlerRootView>
						</AuthProvider>
					</ThemeConfigProvider>
				</Provider>
			</SafeAreaProvider>
		)
	}
}
