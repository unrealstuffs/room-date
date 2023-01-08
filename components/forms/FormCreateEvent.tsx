import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import firestore from '@react-native-firebase/firestore'
import DateTimePicker from '@react-native-community/datetimepicker'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import dayjs from 'dayjs'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface FormFields {
	title: string
	date?: Date | null
	description: string
}

const CreateEventSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
	description: Yup.string().required('Описание не указано'),
})

const FormCreateEvent = () => {
	const [loading, setLoading] = useState(false)
	const [serverError, setServerError] = useState(false)
	const theme = useTheme()
	const [show, setShow] = useState(false)
	const { currentRoom } = useTypedSelector(state => state.currentRoom)

	const handleCreateEvent = ({ description, title, date }: FormFields) => {
		const type = () => {
			if (!date) {
				return 'note'
			} else if (date <= new Date()) {
				return 'date'
			} else if (date > new Date()) {
				return 'event'
			}
		}

		setLoading(true)
		firestore()
			.collection('events')
			.add({
				title,
				description,
				date: date || null,
				pinned: false,
				roomId: currentRoom.id,
				type: type(),
			})
			.then(() => {
				setLoading(false)
			})
			.catch(() => {
				setServerError(true)
			})
	}

	return (
		<Formik
			initialValues={{ title: '', date: null, description: '' }}
			validationSchema={CreateEventSchema}
			onSubmit={values => handleCreateEvent(values)}
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
						backgroundColor={theme.colors.background}
					>
						<StyledText
							color={theme.colors.secondary}
							style={{ textAlign: 'center' }}
						>
							Создать событие
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
								errors.title
									? theme.colors.danger
									: theme.colors.light
							}
							color={theme.colors.secondary}
							placeholder='Название...'
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							value={values.title}
							style={{ marginBottom: 15 }}
						/>
						<Pressable onPress={() => setShow(true)}>
							<StyledInput
								borderColor={theme.colors.light}
								placeholder='Дата...'
								style={{ marginBottom: 15 }}
								editable={false}
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
									onChange={(event, selectedDate) => {
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
									: theme.colors.light
							}
							color={theme.colors.secondary}
							placeholder='Описание...'
							multiline={true}
							numberOfLines={4}
							textAlignVertical={'top'}
							onChangeText={handleChange('description')}
							onBlur={handleBlur('description')}
							value={values.description}
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
							onPress={() => handleSubmit()}
							disabled={loading}
						>
							<StyledText>
								{loading ? (
									<ActivityIndicator
										color={theme.colors.white}
									/>
								) : (
									'Создать'
								)}
							</StyledText>
						</StyledButton>
					</Container>
					{errors.title && touched.title && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.title}
						</StyledText>
					)}
					{errors.description && touched.description && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.description}
						</StyledText>
					)}
					{serverError && (
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

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
	},
})

export default FormCreateEvent
