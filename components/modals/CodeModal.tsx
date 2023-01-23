import { useWindowDimensions, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'
import QRCode from 'react-native-qrcode-svg'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { useTheme } from '../../hooks/useTheme'
import InviteInput from '../parts/InviteInput'
import { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const CodeModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'CodeModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const { group } = useTypedSelector(state => state.data)
	const [qrSize, setQRSize] = useState(0)

	return (
		<StyledModal
			backgroundColor={theme.colors.secondary}
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
					color={theme.colors.light}
				>
					Код приглашения
				</StyledText>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
					color={theme.colors.light}
				/>
			</Flex>
			<View
				style={{ marginBottom: 15 }}
				onLayout={event => {
					const { width } = event.nativeEvent.layout
					setQRSize(width)
				}}
			>
				<QRCode
					value={group.inviteCode}
					size={qrSize}
					quietZone={15}
					backgroundColor={theme.colors.light}
				/>
			</View>
			<InviteInput inviteCode={group.inviteCode} />
		</StyledModal>
	)
}

export default CodeModal
