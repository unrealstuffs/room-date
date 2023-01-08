import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'

import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface FormFields {
	title: string
	category: string
	theme: string
}

const categories = [
	{ id: 1, title: 'Друзья', value: 'friends' },
	{ id: 2, title: 'Пара', value: 'couple' },
]

const UpdateRoomSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
})

const Settings = () => {
	const navigation = useNavigation()
	const { openModal } = useModal()
	const theme = useTheme()
	const { currentRoom } = useTypedSelector(state => state.currentRoom)
	const { user } = useTypedSelector(state => state.user)
	const [serverError, setServerError] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleUpdateRoom = ({ category, title, theme }: FormFields) => {
		setLoading(true)
		firestore()
			.collection('rooms')
			.doc(currentRoom.id)
			.update({
				title,
				category: categories.find(item => item.value === category)
					?.title,
				theme,
			})
			.then(() => {
				setLoading(false)
			})
			.catch(() => {
				setServerError(true)
				setTimeout(() => {
					setServerError(false)
				}, 5000)
			})
	}

	const exitRoom = () => {
		if (currentRoom.members.length > 1) {
			firestore()
				.collection('rooms')
				.doc(currentRoom.id)
				.update({
					members: firestore.FieldValue.arrayRemove(user?.uid),
				})
				.then(() => {
					navigation.navigate('Root')
				})
				.catch(() => {
					setServerError(true)
					setTimeout(() => {
						setServerError(false)
					}, 5000)
				})
		} else {
			deleteRoom()
		}
	}

	const deleteRoom = () => {
		firestore()
			.collection('rooms')
			.doc(currentRoom.id)
			.delete()
			.then(() => {
				navigation.navigate('Root')
			})
			.catch(() => {
				setServerError(true)
				setTimeout(() => {
					setServerError(false)
				}, 5000)
			})
	}

	return (
		<Formik
			initialValues={{
				title: currentRoom.title,
				category: currentRoom.category,
				theme: currentRoom.theme,
			}}
			validationSchema={UpdateRoomSchema}
			onSubmit={values => handleUpdateRoom(values)}
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
							errors.title
								? theme.colors.danger
								: theme.colors.light
						}
						placeholder='Название...'
						style={{ marginBottom: 10 }}
						color={theme.colors.secondary}
						onChangeText={handleChange('title')}
						onBlur={handleBlur('title')}
						value={values.title}
					/>
					<View
						style={{
							marginBottom: 10,
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
					<Pressable onPress={() => openModal('ThemeSwitcherModal')}>
						<StyledInputWithIcon>
							<StyledInput
								borderColor={theme.colors.light}
								placeholder='Тема'
								style={{ marginBottom: 10 }}
								color={theme.colors.secondary}
								editable={false}
								onChangeText={handleChange('theme')}
								onBlur={handleBlur('theme')}
								value={values.theme}
							/>

							<View
								style={{
									position: 'absolute',
									right: 10,
									top: 15,
									width: 20,
									height: 20,
									backgroundColor: theme.colors.primary,
									borderRadius: 999,
								}}
							/>
						</StyledInputWithIcon>
					</Pressable>

					<StyledInputWithIcon>
						<StyledInput
							borderColor={theme.colors.light}
							value={currentRoom.inviteCode}
							color={theme.colors.secondary}
							style={{ marginBottom: 30 }}
							editable={false}
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
						style={{ marginBottom: 10, opacity: loading ? 0.6 : 1 }}
						onPress={() => handleSubmit()}
						disabled={loading}
					>
						<StyledText>Сохранить</StyledText>
					</StyledButton>
					<StyledButton
						backgroundColor={theme.colors.secondary}
						style={{ marginBottom: 10, opacity: loading ? 0.6 : 1 }}
						onPress={exitRoom}
					>
						<StyledText>Выйти из комнаты</StyledText>
					</StyledButton>
					<StyledButton
						backgroundColor={theme.colors.danger}
						style={{ marginBottom: 30, opacity: loading ? 0.6 : 1 }}
						onPress={deleteRoom}
					>
						<StyledText>Удалить комнату</StyledText>
					</StyledButton>

					{errors.title && touched.title && (
						<StyledText
							color={theme.colors.danger}
							style={{ textAlign: 'center' }}
						>
							{errors.title}
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

export default Settings
