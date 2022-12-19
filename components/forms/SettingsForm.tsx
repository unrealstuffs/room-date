import { Pressable, View } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'

const Settings = () => {
	const { openModal } = useModal()
	const theme = useTheme()

	return (
		<>
			<StyledInput
				borderColor={theme.colors.light}
				placeholder='Название'
				style={{ marginBottom: 10 }}
				color={theme.colors.secondary}
			/>
			<StyledInput
				borderColor={theme.colors.light}
				placeholder='Категория'
				style={{ marginBottom: 10 }}
				color={theme.colors.secondary}
			/>
			<Pressable onPress={() => openModal('ThemeSwitcherModal')}>
				<StyledInputWithIcon>
					<StyledInput
						borderColor={theme.colors.light}
						placeholder='Тема'
						style={{ marginBottom: 10 }}
						color={theme.colors.secondary}
						editable={false}
					/>

					<View
						style={{
							position: 'absolute',
							right: 10,
							top: 15,
							width: 20,
							height: 20,
							backgroundColor: theme.colors.primary,
							borderRadius: 999,
						}}
					/>
				</StyledInputWithIcon>
			</Pressable>

			<Pressable onPress={() => {}}>
				<StyledInputWithIcon>
					<StyledInput
						borderColor={theme.colors.light}
						value='#27542286940'
						color={theme.colors.secondary}
						style={{ marginBottom: 30 }}
						editable={false}
					/>
					<AntDesign
						name='copy1'
						size={20}
						color={theme.colors.dark}
						style={{ position: 'absolute', right: 10, top: 15 }}
					/>
				</StyledInputWithIcon>
			</Pressable>

			<StyledButton
				backgroundColor={theme.colors.primary}
				style={{ marginBottom: 10 }}
			>
				<StyledText>Сохранить</StyledText>
			</StyledButton>
			<StyledButton
				backgroundColor={theme.colors.secondary}
				style={{ marginBottom: 10 }}
			>
				<StyledText>Выйти из комнаты</StyledText>
			</StyledButton>
			<StyledButton
				backgroundColor={theme.colors.danger}
				style={{ marginBottom: 10 }}
			>
				<StyledText>Удалить комнату</StyledText>
			</StyledButton>
		</>
	)
}

export default Settings
