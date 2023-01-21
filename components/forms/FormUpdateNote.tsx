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
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import showToast from '../../utils/showToast'

const UpdateNoteSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
	description: Yup.string().required('Описание не указано'),
})

const FormUpdateNote = () => {
	const theme = useTheme()
	const [show, setShow] = useState(false)
	const { updateNote, status } = useNotes()
	const { note } = useTypedSelector(state => state.note)

	const { dismiss } = useBottomSheetModal()

	useEffect(() => {
		if (status === 'success') {
			dismiss()
			showToast('Заметка обновлена!')
		}
	}, [status])

	return (
		<Formik
			initialValues={{
				title: note.title,
				date: note.date || null,
				description: note.description,
			}}
			validationSchema={UpdateNoteSchema}
			onSubmit={values =>
				updateNote(
					note.id,
					values.title,
					values.date,
					values.description
				)
			}
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
							Обновить заметку
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
								errors.title
									? theme.colors.danger
									: theme.colors.dark
							}
							color={theme.colors.light}
							placeholder='Название...'
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
								errors.title
									? theme.colors.danger
									: theme.colors.dark
							}
							color={theme.colors.light}
							placeholder='Описание...'
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
									'Обновить'
								)}
							</StyledText>
						</StyledButton>
					</Container>
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

export default FormUpdateNote
