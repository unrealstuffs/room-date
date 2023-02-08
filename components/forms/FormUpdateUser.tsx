import * as Yup from 'yup'
import { Formik } from 'formik'
import { ActivityIndicator } from 'react-native'

import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import { useTheme } from 'styled-components/native'
import { useEffect } from 'react'
import showToast from '../../utils/showToast'

const UpdateUserSchema = Yup.object().shape({
	displayName: Yup.string().required('Название не указано'),
})

const FormUpdateUser = () => {
	const { user } = useTypedSelector(state => state.user)
	const { status, updateProfile } = useUpdateProfile()
	const theme = useTheme()

	useEffect(() => {
		status === 'success' && showToast('Профиль обновлен!')
	}, [status])

	return (
		<Formik
			initialValues={{
				displayName: user.displayName,
			}}
			enableReinitialize
			validationSchema={UpdateUserSchema}
			onSubmit={values => updateProfile(values)}
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
					<StyledInput
						borderColor={
							errors.displayName && touched.displayName
								? theme.colors.danger
								: theme.colors.dark
						}
						placeholder='Отображаемое имя...'
						style={{ marginBottom: 10 }}
						color={theme.colors.light}
						onChangeText={handleChange('displayName')}
						onBlur={handleBlur('displayName')}
						value={values.displayName}
						placeholderTextColor={theme.colors.dark}
					/>

					<StyledButton
						backgroundColor={theme.colors.primary}
						style={{
							marginBottom: 10,
							opacity: status === 'loading' ? 0.6 : 1,
						}}
						onPress={() => {
							handleSubmit()
						}}
						disabled={status === 'loading'}
					>
						<StyledText>
							{status === 'loading' ? (
								<ActivityIndicator color={theme.colors.light} />
							) : (
								'Сохранить'
							)}
						</StyledText>
					</StyledButton>
					{status === 'error' && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							Ошибка сервера, повторите попытку позже
						</StyledText>
					)}
				</>
			)}
		</Formik>
	)
}

export default FormUpdateUser
