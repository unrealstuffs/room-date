import { useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
	GoogleSignin,
	GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

import Container from '../components/styled/Container.styled'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { Image } from 'react-native'
import themes from '../themes'

const LoginScreen = () => {
	const [loading, setLoading] = useState(false)

	async function onGoogleButtonPress() {
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		})
		const { idToken } = await GoogleSignin.signIn()

		const googleCredential = auth.GoogleAuthProvider.credential(idToken)

		return auth().signInWithCredential(googleCredential)
	}

	return (
		<Container
			fullHeight={true}
			backgroundColor={themes.classic.colors.background}
		>
			<Centered>
				<Image
					source={require('../assets/images/logo.png')}
					style={{ width: 70, height: 70, marginBottom: 30 }}
				/>
				<StyledText
					fontSize={16}
					color={themes.classic.colors.light}
					style={{
						marginBottom: 60,
						textAlign: 'center',
					}}
				>
					Добро пожаловать в Note in Groups! Начните создавать
					групповые заметки с друзьями, коллегами или партнерами прямо
					сейчас!
				</StyledText>
				<GoogleSigninButton
					color={GoogleSigninButton.Color.Dark}
					size={GoogleSigninButton.Size.Wide}
					disabled={loading}
					style={{ position: 'absolute', bottom: 15 }}
					onPress={() => {
						setLoading(true)
						onGoogleButtonPress()
							.then(({ user }) => {
								setLoading(false)

								firestore()
									.collection('users')
									.doc(user.uid)
									.set({
										displayName: user.displayName,
										photoURL: user.photoURL,
									})
							})
							.catch(err => console.log(err))
					}}
				></GoogleSigninButton>
			</Centered>
		</Container>
	)
}

export default LoginScreen
