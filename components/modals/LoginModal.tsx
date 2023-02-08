import { useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { useTheme } from 'styled-components/native'
import FormLogin from '../forms/FormLogin'

const LoginModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'LoginModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()

	return (
		<StyledModal
			backgroundColor={theme.colors.secondary}
			style={{ width: width * 0.95 }}
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
				style={{ marginBottom: 15 }}
			>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.light}
				>
					Вход
				</StyledText>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
					color={theme.colors.light}
				/>
			</Flex>
			<FormLogin />
		</StyledModal>
	)
}

export default LoginModal
