import { useState } from 'react'
import { useWindowDimensions, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { ModalComponentProp } from 'react-native-modalfy'

import Avatar from '../parts/Avatar'
import { ModalStackParams } from '../../providers/ModalConfigProvider'

import StyledModal from '../styled/Modal.styled'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'

const MemberModal = ({
	modal: { closeModal, params },
}: ModalComponentProp<ModalStackParams, void, 'MemberModal'>) => {
	const { width } = useWindowDimensions()
	const [loading, setLoading] = useState(false)
	const theme = useTheme()

	return (
		<StyledModal
			backgroundColor={theme.colors.white}
			style={{ width: width * 0.85 }}
		>
			<Flex justifyContent='space-between' style={{ marginBottom: 20 }}>
				<Flex justifyContent='space-between' alignItems='center'>
					<Avatar size={45} uri={params?.photoURL} />
					<StyledText
						style={{ marginLeft: 10 }}
						color={theme.colors.secondary}
					>
						{params?.name}
					</StyledText>
				</Flex>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
				/>
			</Flex>
			<StyledButton
				activeOpacity={0.6}
				disabled={loading}
				opacity={loading ? 0.6 : 1}
				onPress={() => {}}
				backgroundColor={theme.colors.primary}
			>
				<StyledText color={theme.colors.white}>
					{loading ? (
						<ActivityIndicator color={theme.colors.white} />
					) : (
						'Исключить пользователя'
					)}
				</StyledText>
			</StyledButton>
		</StyledModal>
	)
}

export default MemberModal
