import { useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components/native'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

const FormCreateEvent = () => {
	const [loading, setLoading] = useState(false)
	const theme = useTheme()

	const handleCreateEvent = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
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
					Создать событие
				</StyledText>
			</Container>
			<Separator color={theme.colors.light} />
			<Container
				top={0}
				bottom={0}
				backgroundColor={theme.colors.background}
			>
				<BottomSheetTextInput
					placeholder='Название...'
					style={[
						styles.input,
						{
							borderColor: theme.colors.light,
							color: theme.colors.secondary,
							marginBottom: 15,
						},
					]}
				/>
				<StyledInput
					borderColor={theme.colors.light}
					placeholder='Тип...'
					style={{ marginBottom: 15 }}
				/>
				<StyledInput
					borderColor={theme.colors.light}
					placeholder='Дата...'
					style={{ marginBottom: 15 }}
				/>
				<BottomSheetTextInput
					placeholder='Описание...'
					multiline={true}
					numberOfLines={4}
					style={[
						styles.input,
						{
							borderColor: theme.colors.light,
							color: theme.colors.secondary,
						},
					]}
					textAlignVertical={'top'}
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
					onPress={handleCreateEvent}
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
			</Container>
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
	},
})

export default FormCreateEvent
