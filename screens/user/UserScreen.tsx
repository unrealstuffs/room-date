import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import Container from '../../components/styled/Container.styled'
import Flex from '../../components/styled/Flex.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { RootStackScreenProps } from '../../navigation/types'
import UserPic from './components/UserPic'
import FormUpdateUser from '../../components/forms/FormUpdateUser'
import { useAuth } from '../../hooks/useAuth'
import showToast from '../../utils/showToast'

const UserScreen = ({ navigation }: RootStackScreenProps<'User'>) => {
	const { user } = useTypedSelector(state => state.user)
	const { signOut, status } = useAuth()
	const theme = useTheme()

	useEffect(() => {
		navigation.setOptions({
			title: 'Профиль',
			headerShadowVisible: false,
			headerStyle: {
				backgroundColor: theme.colors.background,
			},
			headerRight: () => (
				<TouchableOpacity onPress={signOut}>
					{status === 'loading' ? (
						<ActivityIndicator
							size={25}
							color={theme.colors.light}
						/>
					) : (
						<AntDesign
							name='logout'
							size={25}
							color={theme.colors.light}
						/>
					)}
				</TouchableOpacity>
			),
		})
	}, [])

	useEffect(() => {
		status === 'error' && showToast('Ошибка сервера')
	}, [status])

	return (
		<Container fullHeight={true} backgroundColor={theme.colors.background}>
			<Flex justifyContent='center' style={{ marginBottom: 15 }}>
				<UserPic />
			</Flex>

			<FormUpdateUser />
		</Container>
	)
}

export default UserScreen
