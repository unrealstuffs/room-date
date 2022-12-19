import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import {
	GoogleSignin,
	GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

import { RootStackScreenProps } from '../types'
import Container from '../components/styled/Container.styled'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
	const { user } = useTypedSelector(state => state.user)
	const [loading, setLoading] = useState(false)
	const theme = useTheme()

	async function onGoogleButtonPress() {
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		})
		const { idToken } = await GoogleSignin.signIn()

		const googleCredential = auth.GoogleAuthProvider.credential(idToken)

		return auth().signInWithCredential(googleCredential)
	}

	useEffect(() => {
		user && navigation.navigate('Root')
	}, [user])

	return (
		<Container fullHeight={true} backgroundColor={theme.colors.background}>
			<Centered>
				<AntDesign name='appstore-o' size={60} />
				<StyledText
					fontSize={18}
					color={theme.colors.secondary}
					style={{
						marginTop: 10,
						marginBottom: 60,
						textAlign: 'center',
					}}
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
					ullam nisi animi? Exercitationem, quisquam animi?
				</StyledText>
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
			</Centered>
		</Container>
	)
}

export default LoginScreen
