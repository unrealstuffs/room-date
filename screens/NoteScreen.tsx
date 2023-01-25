import { AntDesign } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { Formik, FormikProps, FormikValues } from 'formik'
import { useEffect, useRef } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'

import Container from '../components/styled/Container.styled'
import { StyledInput } from '../components/styled/Input.styled'
import Separator from '../components/styled/Separator.styled'
import StyledText from '../components/styled/Text.styled'
import { useNotes } from '../hooks/useNotes'
import { useTheme } from '../hooks/useTheme'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RootStackScreenProps } from '../navigation/types'
import showToast from '../utils/showToast'

const NoteSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
	description: Yup.string().required('Описание не указано'),
})

const NoteScreen = ({ navigation }: RootStackScreenProps<'Note'>) => {
	const theme = useTheme()
	const { deleteNote, pinNote, createNote, updateNote } = useNotes()
	const { note } = useTypedSelector(state => state.data)

	const formRef = useRef<FormikProps<FormikValues>>(null)

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit()
		}
	}

	useEffect(() => {
		navigation.setOptions({
			headerStyle: { backgroundColor: theme.colors.background },
			headerShadowVisible: false,
			title: note.title || 'Создать заметку',
			headerRight: () => (
				<>
					{note.id && (
						<>
							<TouchableOpacity
								style={{ marginRight: 20 }}
								onPress={() => {
									deleteNote(note.id!)
									navigation.navigate('Group', {
										screen: 'Notes',
									})
									showToast('Заметка удалена!')
								}}
							>
								<AntDesign
									name='delete'
									size={25}
									color={theme.colors.light}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{ marginRight: 20 }}
								onPress={() => {
									pinNote(note.id, !note.pinned)
									showToast(
										note.pinned
											? 'Заметка откреплена!'
											: 'Заметка закреплена!'
									)
								}}
							>
								<AntDesign
									name='pushpino'
									size={25}
									color={
										note.pinned
											? theme.colors.primary
											: theme.colors.light
									}
								/>
							</TouchableOpacity>
						</>
					)}
					<TouchableOpacity onPress={() => handleSubmit()}>
						<AntDesign
							name='check'
							size={25}
							color={theme.colors.light}
						/>
					</TouchableOpacity>
				</>
			),
		})
	}, [note])

	return (
		<Container backgroundColor={theme.colors.background} fullHeight>
			<ScrollView>
				<Formik
					innerRef={formRef}
					initialValues={{
						title: note.title || '',
						description: note.description || '',
					}}
					enableReinitialize
					validationSchema={NoteSchema}
					onSubmit={values => {
						if (note.id) {
							updateNote({
								id: note.id,
								title: values.title,
								description: values.description,
							})
							showToast('Заметка обновлена!')
						} else {
							createNote({
								title: values.title,
								description: values.description,
							})
							showToast('Заметка создана!')
						}
						navigation.navigate('Group', { screen: 'Notes' })
					}}
				>
					{({
						handleChange,
						handleBlur,
						values,
						errors,
						touched,
					}) => (
						<>
							<StyledInput
								borderColor='transparent'
								multiline
								style={{ fontSize: 18 }}
								color={theme.colors.light}
								placeholder='Название (обязательно)...'
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								value={values.title || ''}
								placeholderTextColor={theme.colors.dark}
							/>
							<Separator color={theme.colors.light} />
							{note.createdAt && (
								<StyledText
									fontSize={12}
									color={theme.colors.dark}
									style={{
										paddingHorizontal: 10,
										paddingTop: 5,
									}}
								>
									{dayjs(note.createdAt).format('DD/MM/YYYY')}
								</StyledText>
							)}
							<StyledInput
								borderColor='transparent'
								multiline
								placeholder='Описание (обязательно)...'
								color={theme.colors.light}
								numberOfLines={4}
								textAlignVertical={'top'}
								onChangeText={handleChange('description')}
								onBlur={handleBlur('description')}
								value={values.description || ''}
								placeholderTextColor={theme.colors.dark}
								style={{ flex: 1 }}
							/>
							{errors.title &&
								touched.title &&
								typeof errors.title === 'string' &&
								showToast(errors.title)}
							{errors.description &&
								touched.description &&
								typeof errors.description === 'string' &&
								showToast(errors.description)}
						</>
					)}
				</Formik>
			</ScrollView>
		</Container>
	)
}

export default NoteScreen
