import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import InviteInput from '../parts/InviteInput'
import { useCreateGroup } from '../../hooks/useCreateGroup'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import showToast from '../../utils/showToast'
import { useTheme } from 'styled-components/native'

const CreateGroupSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
})

const FormCreateGroup = () => {
	const theme = useTheme()
	const { createGroup, inviteCode, status } = useCreateGroup()

	const { dismiss } = useBottomSheetModal()

	useEffect(() => {
		if (status === 'success') {
			dismiss()
			showToast('Группа создана!')
		}
	}, [status])

	return (
		<Formik
			initialValues={{ title: '' }}
			validationSchema={CreateGroupSchema}
			onSubmit={values => createGroup(values.title)}
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
						backgroundColor={theme.colors.secondary}
					>
						<StyledText
							color={theme.colors.light}
							style={{ textAlign: 'center' }}
						>
							Создать группу
						</StyledText>
					</Container>
					<Separator color={theme.colors.dark} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.secondary}
					>
						<StyledInput
							borderColor={
								errors.title && touched.title
									? theme.colors.danger
									: theme.colors.dark
							}
							color={theme.colors.light}
							placeholder='Название...'
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							value={values.title}
							placeholderTextColor={theme.colors.dark}
						/>
					</Container>
					<Separator color={theme.colors.dark} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.secondary}
					>
						{status === 'success' ? (
							<>
								<InviteInput
									inviteCode={inviteCode}
									style={{ marginBottom: 15 }}
								/>
								{/* <StyledButton
									backgroundColor={theme.colors.primary}
									onPress={() => {
										navigation.navigate('Group')
									}}
								>
									<StyledText>
										{loading ? (
											<ActivityIndicator
												color={theme.colors.light}
											/>
										) : (
											'Перейти в группу'
										)}
									</StyledText>
								</StyledButton> */}
							</>
						) : (
							<StyledButton
								backgroundColor={theme.colors.primary}
								onPress={() => handleSubmit()}
								disabled={status === 'loading'}
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
										'Создать'
									)}
								</StyledText>
							</StyledButton>
						)}
					</Container>
					{status === 'error' && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center', marginBottom: 15 }}
						>
							Ошибка сервера, повторите попытку позже
						</StyledText>
					)}
				</>
			)}
		</Formik>
	)
}

export default FormCreateGroup
