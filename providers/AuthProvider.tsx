import { useEffect, useState, ReactNode, FC } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import firestore from '@react-native-firebase/firestore'
import { useActions } from '../hooks/useActions'

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [initializing, setInitializing] = useState(true)
	const { setUser } = useActions()

	GoogleSignin.configure({
		webClientId:
			'322609659802-88fcb778q393qpu6hfff0esj8i435nqr.apps.googleusercontent.com',
	})

	useEffect(() => {
		const unsubscriber = auth().onAuthStateChanged(async user => {
			if (user) {
				const userRef = firestore().collection('users').doc(user.uid)
				const snapshot = await userRef.get()
				if (snapshot.exists) {
					setUser({ uid: snapshot.id, ...snapshot.data() })
				} else {
					console.error(
						`User with ID ${user.uid} not found in Firestore`
					)
				}
			} else {
				setUser(null)
			}
			if (initializing) setInitializing(false)
		})

		return () => unsubscriber()
	}, [])

	if (initializing) return null

	return <>{children}</>
}

export default AuthProvider
