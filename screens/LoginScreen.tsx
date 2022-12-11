import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../types'
import Container from '../components/ui/Container'
import { AntDesign } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import {
	GoogleSignin,
	GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { useTypedSelector } from '../hooks/useTypedSelector'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
	const { user } = useTypedSelector(state => state.user)
	const [loading, setLoading] = useState(false)

	async function onGoogleButtonPress() {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		})
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn()

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken)

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential)
	}

	useEffect(() => {
		user && navigation.navigate('Root')
	}, [user])

	return (
		<Container>
			<View style={styles.login}>
				<AntDesign name='appstore-o' size={60} />
				<Text style={styles.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
					ullam nisi animi? Exercitationem, quisquam animi?
				</Text>
				<GoogleSigninButton
					color={GoogleSigninButton.Color.Dark}
					size={GoogleSigninButton.Size.Wide}
					disabled={loading}
					style={{ position: 'absolute', bottom: 15 }}
					onPress={() => {
						setLoading(true)
						onGoogleButtonPress()
							.then(() => setLoading(false))
							.catch(err => console.log(err))
					}}
				></GoogleSigninButton>
			</View>
		</Container>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	login: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	text: {
		marginTop: 10,
		marginBottom: 60,
		fontSize: 18,
		textAlign: 'center',
	},
})
