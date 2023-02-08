import { useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { Status } from '../constants/Types'
import { useActions } from './useActions'

type AuthStatus =
	| Status
	| 'auth/email-already-in-use'
	| 'auth/weak-password'
	| 'auth/user-not-found'
	| 'auth/wrong-password'

export const useAuth = () => {
	const [status, setStatus] = useState<AuthStatus>('init')
	const { setUser } = useActions()

	const signUp = async ({
		name,
		email,
		password,
	}: {
		name: string
		email: string
		password: string
	}) => {
		setStatus('loading')
		try {
			const { user } = await auth().createUserWithEmailAndPassword(
				email,
				password
			)
			const userRef = firestore().collection('users').doc(user.uid)
			await userRef.set({
				email: user?.email,
				displayName: name,
			})
			setStatus('success')
		} catch (error: any) {
			setStatus(error.code)
		}
	}

	const signIn = async ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		try {
			setStatus('loading')
			const { user } = await auth().signInWithEmailAndPassword(
				email,
				password
			)
			user && setStatus('success')
		} catch (error: any) {
			setStatus(error.code)
		}
	}

	const signInWithGoogle = async () => {
		setStatus('loading')
		const { idToken } = await GoogleSignin.signIn()
		const googleCredential = auth.GoogleAuthProvider.credential(idToken)
		const { user } = await auth().signInWithCredential(googleCredential)

		if (user) {
			const userRef = firestore().collection('users').doc(user.uid)
			const snapshot = await userRef.get()
			if (!snapshot.exists) {
				await userRef.set({
					email: user.email,
					displayName: user.displayName,
				})
			}
		}
	}

	const signOut = () => {
		setStatus('loading')
		auth()
			.signOut()
			.then(() => {
				setStatus('success')
				setUser(null)
			})
			.catch(() => setStatus('error'))
	}

	return { status, signIn, signUp, signInWithGoogle, signOut }
}
