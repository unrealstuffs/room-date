import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import * as Yup from 'yup'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import { generateInviteCode } from '../../utils/generateInviteCode'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

interface FormFields {
	title: string
	category: string
}

const categories = [
	{ id: 1, title: 'Друзья', value: 'friends' },
	{ id: 2, title: 'Пара', value: 'couple' },
]

const CreateRoomSchemaSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
	category: Yup.string().required('Категория не указана'),
})

const FormCreateRoom = () => {
	const theme = useTheme()

	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const [generatedInviteCode, setGeneratedInviteCode] = useState('')
	const [serverError, setServerError] = useState(false)
	const { user } = useTypedSelector(state => state.user)
	const { setCurrentRoom } = useActions()

	const handleCreateRoom = ({ category, title }: FormFields) => {
		const inviteCode = generateInviteCode()
		setLoading(true)
		firestore()
			.collection('rooms')
			.add({
				title,
				category: categories.find(item => item.value === category)
					?.title,
				inviteCode,
				members: [user?.uid],
				events: [],
				theme: 'classic',
			})
			.then(data => {
				setGeneratedInviteCode(inviteCode)
				setLoading(false)
				setIsCreated(true)
				firestore()
					.collection('rooms')
					.doc(data.id)
					.get()
					.then(room => {
						setCurrentRoom({
							...room.data(),
						})
					})
			})
			.catch(() => {
				setServerError(true)
			})
	}

	const handleEnterRoom = () => {
		navigation.navigate('Room')
	}

	return (
		<Formik
			initialValues={{ title: '', category: 'friends' }}
			validationSchema={CreateRoomSchemaSchema}
			onSubmit={values => handleCreateRoom(values)}
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
							Создать комнату
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
							placeholder='Название...'
							style={{ marginBottom: 15 }}
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							value={values.title}
						/>
						<View
							style={{
								borderWidth: 1,
								borderColor: errors.title
									? theme.colors.danger
									: theme.colors.light,
								borderRadius: 8,
							}}
						>
							<Picker
								enabled={true}
								placeholder='Категория...'
								onValueChange={handleChange('category')}
								selectedValue={values.category}
								dropdownIconColor={theme.colors.dark}
								style={{
									marginHorizontal: -5,
								}}
							>
								{categories.map(item => (
									<Picker.Item
										label={item.title}
										value={item.value}
										key={item.id}
										style={{
											fontSize: 14,
											color: theme.colors.secondary,
										}}
									/>
								))}
							</Picker>
						</View>
					</Container>
					<Separator color={theme.colors.light} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={theme.colors.background}
					>
						{isCreated ? (
							<>
								<StyledInputWithIcon
									style={{ marginBottom: 15 }}
								>
									<StyledInput
										borderColor={theme.colors.light}
										value={generatedInviteCode}
									/>
									<AntDesign
										name='copy1'
										size={20}
										color={theme.colors.dark}
										style={{
											position: 'absolute',
											right: 10,
											top: 15,
										}}
									/>
								</StyledInputWithIcon>
								<StyledButton
									backgroundColor={theme.colors.primary}
									onPress={handleEnterRoom}
								>
									<StyledText>
										{loading ? (
											<ActivityIndicator
												color={theme.colors.white}
											/>
										) : (
											'Перейти в комнату'
										)}
									</StyledText>
								</StyledButton>
							</>
						) : (
							<StyledButton
								backgroundColor={theme.colors.primary}
								onPress={() => handleSubmit()}
								disabled={loading}
								style={{ opacity: loading ? 0.6 : 1 }}
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
						)}
					</Container>
					{errors.title && touched.title && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.title}
						</StyledText>
					)}
					{errors.category && touched.category && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.category}
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

export default FormCreateRoom
