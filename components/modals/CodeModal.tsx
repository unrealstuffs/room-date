import { useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const CodeModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'CodeModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const { currentRoom } = useTypedSelector(state => state.currentRoom)

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
			<StyledInputWithIcon>
				<StyledInput
					borderColor={theme.colors.light}
					value={currentRoom.inviteCode}
				/>
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
			</StyledInputWithIcon>
		</StyledModal>
	)
}

export default CodeModal
