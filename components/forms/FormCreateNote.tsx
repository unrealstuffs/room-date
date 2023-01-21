import { useState, useEffect } from 'react'
import { ActivityIndicator, Pressable } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import DateTimePicker from '@react-native-community/datetimepicker'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import dayjs from 'dayjs'
import { useTheme } from '../../hooks/useTheme'
import { useNotes } from '../../hooks/useNotes'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import showToast from '../../utils/showToast'

const CreateNoteSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
	description: Yup.string().required('Описание не указано'),
})

const FormCreateNote = () => {
	const theme = useTheme()
	const [show, setShow] = useState(false)
	const { createNote, status } = useNotes()
	const { dismiss } = useBottomSheetModal()

	useEffect(() => {
		if (status === 'success') {
			dismiss()
			showToast('Заметка создана!')
		}
	}, [status])

	return (
		<Formik
			initialValues={{ title: '', date: null, description: '' }}
			validationSchema={CreateNoteSchema}
			onSubmit={values => createNote(values)}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldValue,
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
							Создать заметку
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
							placeholder='Название (обязательно)...'
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							value={values.title}
							style={{ marginBottom: 15 }}
							placeholderTextColor={theme.colors.dark}
						/>
						<Pressable onPress={() => setShow(true)}>
							<StyledInput
								borderColor={theme.colors.dark}
								placeholder='Дата...'
								style={{ marginBottom: 15 }}
								editable={false}
								placeholderTextColor={theme.colors.dark}
								value={
									values.date
										? dayjs(values.date).format(
												'DD/MM/YYYY'
										  )
										: ''
								}
							/>
							{show && (
								<DateTimePicker
									testID='dateTimePicker'
									value={values.date || new Date()}
									mode='date'
									is24Hour={true}
									onChange={(_, selectedDate) => {
										setShow(false)
										setFieldValue('date', selectedDate)
									}}
								/>
							)}
						</Pressable>
						<StyledInput
							borderColor={
								errors.description && touched.description
									? theme.colors.danger
									: theme.colors.dark
							}
							color={theme.colors.light}
							placeholder='Описание (обязательно)...'
							multiline={true}
							numberOfLines={4}
							textAlignVertical={'top'}
							onChangeText={handleChange('description')}
							onBlur={handleBlur('description')}
							value={values.description}
							placeholderTextColor={theme.colors.dark}
						/>
					</Container>
					<Separator color={theme.colors.dark} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.secondary}
					>
						<StyledButton
							backgroundColor={theme.colors.primary}
							onPress={() => {
								handleSubmit()
							}}
							disabled={status === 'loading'}
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

export default FormCreateNote
