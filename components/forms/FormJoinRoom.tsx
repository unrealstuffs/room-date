import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import * as Yup from 'yup'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'
import { StyledInput } from '../styled/Input.styled'
import Container from '../styled/Container.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

interface FormFields {
	code: string
}

const JoinRoomSchema = Yup.object().shape({
	code: Yup.string().required('Код не указан'),
})

const FormJoinRoom = () => {
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const theme = useTheme()
	const [error, setError] = useState(false)
	const { user } = useTypedSelector(state => state.user)
	const { setCurrentRoom } = useActions()

	const handleJoinRoom = ({ code }: FormFields) => {
		setLoading(true)
		firestore()
			.collection('rooms')
			.where('inviteCode', '==', code)
			.get()
			.then(data => {
				setLoading(false)
				if (data.empty) {
					setError(true)
					return
				}
				firestore()
					.collection('rooms')
					.doc(data.docs[0].id)
					.update({
						members: firestore.FieldValue.arrayUnion(user?.uid),
					})
					.then(() => {
						setCurrentRoom({
							...data.docs[0].data(),
						})
						navigation.navigate('Room')
					})
					.catch(() => {
						setError(true)
					})
			})
			.catch(() => {
				setError(true)
			})
	}

	return (
		<Formik
			initialValues={{ code: '' }}
			validationSchema={JoinRoomSchema}
			onSubmit={values => handleJoinRoom(values)}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
			}) => (
				<>
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.background}
					>
						<StyledText
							color={theme.colors.secondary}
							style={{ textAlign: 'center' }}
						>
							Войти по коду приглашения
						</StyledText>
					</Container>
					<Separator color={theme.colors.light} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.background}
					>
						<StyledInput
							borderColor={
								errors.code
									? theme.colors.danger
									: theme.colors.light
							}
							placeholder='Код приглашения...'
							onChangeText={handleChange('code')}
							onBlur={handleBlur('code')}
							value={values.code}
						/>
					</Container>
					<Separator color={theme.colors.light} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.background}
					>
						<StyledButton
							backgroundColor={theme.colors.primary}
							disabled={loading}
							onPress={() => handleSubmit()}
						>
							<StyledText>
								{loading ? (
									<ActivityIndicator
										color={theme.colors.white}
									/>
								) : (
									'Войти'
								)}
							</StyledText>
						</StyledButton>
					</Container>
					{errors.code && touched.code && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.code}
						</StyledText>
					)}
					{error && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							Такой группы не существует
						</StyledText>
					)}
				</>
			)}
		</Formik>
	)
}

export default FormJoinRoom
