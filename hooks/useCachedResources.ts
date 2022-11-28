import { AntDesign } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false)

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync()

				// Load fonts
				await Font.loadAsync({
					...AntDesign.font,
					'open-sans-reg': require('../assets/fonts/OpenSans-Regular.ttf'),
					'open-sans-lg': require('../assets/fonts/OpenSans-Light.ttf'),
				})
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e)
			} finally {
				setLoadingComplete(true)
				SplashScreen.hideAsync()
			}
		}

		loadResourcesAndDataAsync()
	}, [])

	return isLoadingComplete
}
