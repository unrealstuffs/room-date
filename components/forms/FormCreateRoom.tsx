import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledInput, StyledInputWithIcon } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import Container from '../styled/Container.styled'
import { generateInviteCode } from '../../utils/generateInviteCode'

interface FormFields {
	title: string
	category: string
}

const FormCreateRoom = () => {
	const theme = useTheme()

	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const [generatedInviteCode, setGeneratedInviteCode] = useState('')
	const [createdRoomId, setCreatedRoomId] = useState('')

	const handleCreateRoom = ({ category, title }: FormFields) => {
		const inviteCode = generateInviteCode()
		setLoading(true)
		firestore()
			.collection('rooms')
			.add({
				title,
				category,
				inviteCode,
				members: [],
				events: [],
				theme: 'classic',
			})
			.then(data => {
				setGeneratedInviteCode(inviteCode)
				setCreatedRoomId(data.id)
				setLoading(false)
				setIsCreated(true)
			})
	}

	const handleEnterRoom = () => {
		navigation.navigate('Room')
	}

	return (
		<Formik
			initialValues={{ title: '', category: '' }}
			onSubmit={values => handleCreateRoom(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values }) => (
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
							borderColor={theme.colors.light}
							placeholder='Название...'
							style={{ marginBottom: 15 }}
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							value={values.title}
						/>
						<StyledInput
							borderColor={theme.colors.light}
							placeholder='Категория...'
							onChangeText={handleChange('category')}
							onBlur={handleBlur('category')}
							value={values.category}
						/>
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
				</>
			)}
		</Formik>
	)
}

export default FormCreateRoom
