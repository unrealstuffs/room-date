import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'
import { StyledInput } from '../styled/Input.styled'
import Container from '../styled/Container.styled'

const FormJoinRoom = () => {
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const theme = useTheme()

	const handleJoinRoom = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			navigation.navigate('Room')
		}, 2000)
	}

	return (
		<>
			<Container
				top={0}
				bottom={0}
				backgroundColor={theme.colors.background}
			>
				<StyledText
					color={theme.colors.secondary}
					style={{ textAlign: 'center' }}
				>
					Войти по коду приглашения
				</StyledText>
			</Container>
			<Separator color={theme.colors.light} />
			<Container
				top={0}
				bottom={0}
				backgroundColor={theme.colors.background}
			>
				<StyledInput
					borderColor={theme.colors.light}
					placeholder='Код приглашения...'
				/>
			</Container>
			<Separator color={theme.colors.light} />
			<Container
				top={0}
				bottom={0}
				backgroundColor={theme.colors.background}
			>
				<StyledButton
					backgroundColor={theme.colors.primary}
					onPress={handleJoinRoom}
					disabled={loading}
				>
					<StyledText>
						{loading ? (
							<ActivityIndicator color={theme.colors.white} />
						) : (
							'Войти'
						)}
					</StyledText>
				</StyledButton>
			</Container>
		</>
	)
}

export default FormJoinRoom
