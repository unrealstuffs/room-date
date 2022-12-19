import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'

const FormCreateRoom = () => {
	const theme = useTheme()

	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)

	const handleCreateRoom = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setIsCreated(true)
		}, 2000)
	}

	const handleEnterRoom = () => {
		navigation.navigate('Room')
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
					Создать комнату
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
					placeholder='Название...'
					style={{ marginBottom: 15 }}
				/>
				<StyledInput
					borderColor={theme.colors.light}
					placeholder='Категория...'
				/>
			</Container>
			<Separator color={theme.colors.light} />
			<Container
				top={0}
				bottom={0}
				backgroundColor={theme.colors.background}
			>
				{isCreated ? (
					<>
						<StyledInputWithIcon>
							<StyledInput
								borderColor={theme.colors.light}
								value='#27542286940'
							/>
							<AntDesign name='copy1' size={20} />
						</StyledInputWithIcon>
						<StyledButton
							backgroundColor={theme.colors.primary}
							onPress={handleEnterRoom}
						>
							<StyledText>
								{loading ? (
									<ActivityIndicator
										color={theme.colors.white}
									/>
								) : (
									'Перейти в комнату'
								)}
							</StyledText>
						</StyledButton>
					</>
				) : (
					<StyledButton
						backgroundColor={theme.colors.primary}
						onPress={handleCreateRoom}
						disabled={loading}
					>
						<StyledText>
							{loading ? (
								<ActivityIndicator color={theme.colors.white} />
							) : (
								'Создать'
							)}
						</StyledText>
					</StyledButton>
				)}
			</Container>
		</>
	)
}

export default FormCreateRoom
