import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'

import { StyledInput } from '../styled/Input.styled'
import Flex from '../styled/Flex.styled'
import { AntDesign } from '@expo/vector-icons'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from 'styled-components/native'
import { useModal } from 'react-native-modalfy'
import showToast from '../../utils/showToast'
import openExternalLink from '../../utils/openExternalLink'

const signupSchema = Yup.object().shape({
	name: Yup.string().required('Имя не указано'),
	email: Yup.string().email().required('Email не указан'),
	password: Yup.string().required('Пароль не указан'),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Пароли не совпадают!')
		.required('Пароль не указан'),
	policy: Yup.boolean().oneOf([true], 'ПК'),
})

const privacyLink =
	'https://doc-hosting.flycricket.io/note-in-groups-privacy-policy/bcb3ba7b-6142-453d-b3a8-2f1128633ca0/privacy'

const FormSignup = () => {
	const { signUp, status } = useAuth()
	const theme = useTheme()
	const { closeAllModals } = useModal()
	const [showPass, setShowPass] = useState(false)

	useEffect(() => {
		status === 'success' && closeAllModals()
		status === 'auth/email-already-in-use' &&
			showToast('Этот Email уже занят')
		status === 'auth/weak-password' && showToast('Пароль слишком слабый')
		status === 'error' && showToast('Ошибка сервера. Повторите позже')
	}, [status])

	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				repeatPassword: '',
				policy: false,
			}}
			onSubmit={signUp}
			validationSchema={signupSchema}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
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
								errors.name && touched.name
									? theme.colors.danger
									: theme.colors.dark
							}
							placeholder='Отображаемое имя...'
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
							placeholderTextColor={theme.colors.dark}
						/>
					</Flex>
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
						style={{ marginBottom: 10, position: 'relative' }}
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
					<Flex
						justifyContent='space-between'
						alignItems='center'
						style={{ marginBottom: 20, position: 'relative' }}
					>
						<StyledInput
							borderColor={
								errors.repeatPassword && touched.repeatPassword
									? theme.colors.danger
									: theme.colors.dark
							}
							secureTextEntry={!showPass}
							placeholder='Повторите пароль...'
							onChangeText={handleChange('repeatPassword')}
							onBlur={handleBlur('repeatPassword')}
							value={values.repeatPassword}
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
					<Flex style={{ marginBottom: 20 }} alignItems='center'>
						<Checkbox
							value={values.policy}
							onValueChange={checked =>
								setFieldValue('policy', checked)
							}
							color={
								values.policy
									? theme.colors.primary
									: errors.policy
									? theme.colors.danger
									: theme.colors.dark
							}
							style={{
								marginRight: 10,
							}}
						/>
						<StyledText color={theme.colors.dark} fontSize={12}>
							Активируя этот переключатель, вы соглашаетесь с{' '}
							<StyledText
								color={theme.colors.primary}
								fontSize={12}
								style={{ textDecorationLine: 'underline' }}
								onPress={() => openExternalLink(privacyLink)}
							>
								политикой конфиденциальности
							</StyledText>
						</StyledText>
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
									'Зарегистрироваться'
								)}
							</StyledText>
						</StyledButton>
					</Flex>
				</>
			)}
		</Formik>
	)
}

export default FormSignup
