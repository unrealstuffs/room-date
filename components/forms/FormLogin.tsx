import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { StyledInput } from '../styled/Input.styled'
import Flex from '../styled/Flex.styled'
import { AntDesign } from '@expo/vector-icons'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from 'styled-components/native'
import { useModal } from 'react-native-modalfy'
import showToast from '../../utils/showToast'

const loginSchema = Yup.object().shape({
	email: Yup.string().email().required('Email не указан'),
	password: Yup.string().required('Пароль не указан'),
})

const FormLogin = () => {
	const { signIn, status } = useAuth()
	const theme = useTheme()
	const { closeAllModals } = useModal()
	const [showPass, setShowPass] = useState(false)

	useEffect(() => {
		status === 'success' && closeAllModals()
		status === 'auth/user-not-found' &&
			showToast('Пользователь с таким email не найден')
		status === 'auth/wrong-password' && showToast('Неверный пароль')
		status === 'error' && showToast('Ошибка сервера. Повторите позже')
	}, [status])

	return (
		<Formik
			initialValues={{ email: '', password: '', policy: false }}
			onSubmit={values => signIn(values)}
			validationSchema={loginSchema}
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
					<Flex
						justifyContent='space-between'
						alignItems='center'
						style={{ marginBottom: 10 }}
					>
						<StyledInput
							borderColor={
								errors.email && touched.email
									? theme.colors.danger
									: theme.colors.dark
							}
							placeholder='Email...'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							placeholderTextColor={theme.colors.dark}
							keyboardType='email-address'
							autoCapitalize='none'
						/>
					</Flex>
					<Flex
						justifyContent='space-between'
						alignItems='center'
						style={{ marginBottom: 20, position: 'relative' }}
					>
						<StyledInput
							borderColor={
								errors.password && touched.password
									? theme.colors.danger
									: theme.colors.dark
							}
							secureTextEntry={!showPass}
							placeholder='Пароль...'
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							placeholderTextColor={theme.colors.dark}
						/>
						<TouchableOpacity
							onPressIn={() => setShowPass(!showPass)}
							style={{ position: 'absolute', right: 10 }}
						>
							<AntDesign
								name='eyeo'
								size={30}
								color={
									showPass
										? theme.colors.light
										: theme.colors.dark
								}
							/>
						</TouchableOpacity>
					</Flex>

					<Flex>
						<StyledButton
							backgroundColor={theme.colors.primary}
							disabled={status === 'loading'}
							onPress={() => {
								handleSubmit()
							}}
							style={{
								opacity: status === 'loading' ? 0.6 : 1,
							}}
						>
							<StyledText>
								{status === 'loading' ? (
									<ActivityIndicator
										color={theme.colors.light}
									/>
								) : (
									'Войти'
								)}
							</StyledText>
						</StyledButton>
					</Flex>
				</>
			)}
		</Formik>
	)
}

export default FormLogin
