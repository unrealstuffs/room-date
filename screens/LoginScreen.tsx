import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

import Container from '../components/styled/Container.styled'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { Image, View } from 'react-native'
import Flex from '../components/styled/Flex.styled'
import { StyledButton } from '../components/styled/Button.styled'
import { useModal } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'
import { useAuth } from '../hooks/useAuth'

const LoginScreen = () => {
	const { openModal } = useModal()
	const theme = useTheme()
	const { signInWithGoogle, status } = useAuth()

	return (
		<Container fullHeight={true} backgroundColor={theme.colors.background}>
			<Centered>
				<Flex
					justifyContent='center'
					flexDirection='column'
					alignItems='center'
				>
					<Image
						source={require('../assets/images/logo.png')}
						style={{ width: 70, height: 70, marginBottom: 30 }}
					/>
					<StyledText
						fontSize={16}
						color={theme.colors.light}
						style={{
							marginBottom: 60,
							textAlign: 'center',
						}}
					>
						Добро пожаловать в Note in Groups! Начните создавать
						групповые заметки с друзьями, коллегами или партнерами
						прямо сейчас!
					</StyledText>
				</Flex>
				<View style={{ position: 'absolute', bottom: 15 }}>
					<StyledButton
						backgroundColor={theme.colors.primary}
						onPress={() => openModal('LoginModal')}
						style={{ marginBottom: 10 }}
					>
						<StyledText>Войти</StyledText>
					</StyledButton>
					<StyledButton
						backgroundColor='transparent'
						onPress={() => openModal('SignupModal')}
						style={{ marginBottom: 10 }}
					>
						<StyledText>Зарегистрироваться</StyledText>
					</StyledButton>

					<GoogleSigninButton
						color={GoogleSigninButton.Color.Dark}
						size={GoogleSigninButton.Size.Wide}
						disabled={status === 'loading'}
						onPress={() => signInWithGoogle()}
					></GoogleSigninButton>
				</View>
			</Centered>
		</Container>
	)
}

export default LoginScreen
