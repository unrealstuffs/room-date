import { Pressable, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { StyledInput } from '../styled/Input.styled'
import { AntDesign } from '@expo/vector-icons'
import copyToClipboard from '../../utils/copyToClipboard'
import { useTheme } from 'styled-components/native'
import showToast from '../../utils/showToast'
import Flex from '../styled/Flex.styled'

const InviteInput = ({
	inviteCode,
	style,
}: {
	inviteCode: string
	style?: StyleProp<ViewStyle>
}) => {
	const theme = useTheme()
	const [copied, setCopied] = useState(false)

	return (
		<Pressable
			onPress={() => {
				copyToClipboard(inviteCode)
				setCopied(true)
				showToast('Скопировано!')

				setTimeout(() => {
					setCopied(false)
				}, 2000)
			}}
			style={style}
		>
			<Flex alignItems='center' style={{ position: 'relative' }}>
				<StyledInput
					borderColor={
						copied ? theme.colors.primary : theme.colors.dark
					}
					value={inviteCode}
					color={theme.colors.light}
					editable={false}
				/>
				{copied ? (
					<AntDesign
						name='checkcircleo'
						size={20}
						color={theme.colors.primary}
						style={{
							position: 'absolute',
							right: 10,
							top: 15,
						}}
					/>
				) : (
					<AntDesign
						name='copy1'
						size={20}
						color={theme.colors.dark}
						style={{
							position: 'absolute',
							right: 10,
							top: 15,
						}}
					/>
				)}
			</Flex>
		</Pressable>
	)
}

export default InviteInput
