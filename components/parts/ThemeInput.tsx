import { View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Flex from '../styled/Flex.styled'
import { StyledInput } from '../styled/Input.styled'
import { AntDesign } from '@expo/vector-icons'
import { useModal } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'

const ThemeInput = ({ themeName }: { themeName: string }) => {
	const { openModal } = useModal()
	const theme = useTheme()
	return (
		<Flex
			alignItems='center'
			justifyContent='space-between'
			flexDirection='row'
			style={{ marginBottom: 10 }}
		>
			<Pressable
				onPress={() =>
					openModal('ThemeSwitcherModal', {
						theme: theme.name,
					})
				}
				style={{ width: '87%' }}
			>
				<Flex alignItems='center' style={{ position: 'relative' }}>
					<StyledInput
						borderColor={theme.colors.dark}
						placeholder='Тема'
						color={theme.colors.light}
						editable={false}
						value={themeName}
						placeholderTextColor={theme.colors.dark}
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
				</Flex>
			</Pressable>
			<TouchableOpacity
				onPress={() => {
					openModal('CodeModal')
				}}
			>
				<AntDesign name='qrcode' size={30} color={theme.colors.light} />
			</TouchableOpacity>
		</Flex>
	)
}

export default ThemeInput
