import { useState } from 'react'
import { useWindowDimensions, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'
import auth from '@react-native-firebase/auth'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Avatar from '../parts/Avatar'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'
import StyledModal from '../styled/Modal.styled'

const UserModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'UserModal'>) => {
	const { width } = useWindowDimensions()
	const { setUser } = useActions()
	const { user } = useTypedSelector(state => state.user)
	const [loading, setLoading] = useState(false)
	const theme = useTheme()

	const googleSignOut = async () => {
		setLoading(true)
		auth()
			.signOut()
			.then(() => {
				setLoading(false)
				closeModal()
				setUser(null)
			})
			.catch(err => console.log(err))
	}

	return (
		<StyledModal
			backgroundColor={theme.colors.white}
			style={{ width: width * 0.85 }}
		>
			<Flex justifyContent='space-between' style={{ marginBottom: 20 }}>
				<Flex justifyContent='space-between' alignItems='center'>
					<Avatar size={45} uri={user?.photoURL} />
					<StyledText
						fontSize={14}
						style={{ marginLeft: 10 }}
						color={theme.colors.secondary}
					>
						{user ? user.displayName : 'Не доступно'}
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
				onPress={googleSignOut}
				backgroundColor={theme.colors.primary}
			>
				<StyledText color={theme.colors.white}>
					{loading ? (
						<ActivityIndicator color={theme.colors.white} />
					) : (
						'Выйти из аккаунта'
					)}
				</StyledText>
			</StyledButton>
		</StyledModal>
	)
}

export default UserModal
