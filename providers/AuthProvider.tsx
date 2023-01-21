import { useEffect, useState, ReactNode, FC } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useActions } from '../hooks/useActions'

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [initializing, setInitializing] = useState(true)
	const { setUser } = useActions()

	GoogleSignin.configure({
		webClientId:
			'322609659802-88fcb778q393qpu6hfff0esj8i435nqr.apps.googleusercontent.com',
	})

	function onAuthStateChanged(user: any) {
		setUser(user)
		if (initializing) setInitializing(false)
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
		return subscriber
	}, [])

	if (initializing) return null
	return <>{children}</>
}

export default AuthProvider
