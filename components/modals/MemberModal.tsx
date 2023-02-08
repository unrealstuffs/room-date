import { useWindowDimensions, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'

import Avatar from '../parts/Avatar'
import { ModalStackParams } from '../../providers/ModalConfigProvider'

import StyledModal from '../styled/Modal.styled'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'
import { useGroupsActions } from '../../hooks/useGroupsActions'
import { useTheme } from 'styled-components/native'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const MemberModal = ({
	modal: { closeModal, params },
}: ModalComponentProp<ModalStackParams, void, 'MemberModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const { group } = useTypedSelector(state => state.data)

	const { exitGroup, deleteGroup, status } = useGroupsActions()

	return (
		<StyledModal
			backgroundColor={theme.colors.secondary}
			style={{ width: width * 0.95 }}
		>
			<Flex justifyContent='space-between' style={{ marginBottom: 20 }}>
				<Flex justifyContent='space-between' alignItems='center'>
					<Avatar
						size={45}
						uri={params?.photoURL}
						name={params?.name || 'Не известно'}
					/>
					<StyledText
						style={{ marginLeft: 10 }}
						color={theme.colors.light}
					>
						{params?.name}
					</StyledText>
				</Flex>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
					color={theme.colors.light}
				/>
			</Flex>
			<StyledButton
				activeOpacity={0.6}
				disabled={status === 'loading'}
				opacity={status === 'loading' ? 0.6 : 1}
				onPress={() => {
					if (group.members.length > 1 && params) {
						exitGroup(params?.uid)
					} else {
						deleteGroup()
					}
					closeModal()
				}}
				backgroundColor={theme.colors.primary}
			>
				<StyledText color={theme.colors.light}>
					{status === 'loading' ? (
						<ActivityIndicator color={theme.colors.light} />
					) : (
						`${
							params?.isCurrentUser
								? 'Выйти из группы'
								: 'Исключить пользователя'
						}`
					)}
					{status === 'error' && 'Ошибка'}
				</StyledText>
			</StyledButton>
		</StyledModal>
	)
}

export default MemberModal
