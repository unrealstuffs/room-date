import { Pressable, useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'

import { ModalStackParams } from '../../providers/ModalConfigProvider'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { StyledInput } from '../styled/Input.styled'

const CodeModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'CodeModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()

	return (
		<StyledModal
			backgroundColor={theme.colors.white}
			style={{ width: width * 0.85 }}
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
				style={{ marginBottom: 15 }}
			>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.secondary}
				>
					Код приглашения
				</StyledText>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
				/>
			</Flex>
			<Pressable onPress={() => {}}>
				<StyledInput
					borderColor={theme.colors.light}
					value='#27542286940'
					color={theme.colors.secondary}
					editable={false}
				/>
			</Pressable>
		</StyledModal>
	)
}

export default CodeModal
