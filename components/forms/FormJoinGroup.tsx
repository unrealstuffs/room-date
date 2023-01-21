import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	TouchableOpacity,
	DeviceEventEmitter,
} from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'

import Separator from '../styled/Separator.styled'
import StyledText from '../styled/Text.styled'
import { StyledButton } from '../styled/Button.styled'
import { StyledInput } from '../styled/Input.styled'
import Container from '../styled/Container.styled'
import { useGroupsActions } from '../../hooks/useGroupsActions'
import themes from '../../themes'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import Flex from '../styled/Flex.styled'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../../navigation/types'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const JoinGroupSchema = Yup.object().shape({
	code: Yup.string().required('Код не указан'),
})

const FormJoinGroup = () => {
	const { joinGroup, status } = useGroupsActions()
	const { dismiss } = useBottomSheetModal()
	const navigation = useNavigation()
	const { qrData } = useTypedSelector(state => state.qr)

	useEffect(() => {
		status === 'success' && dismiss()
	}, [status])

	return (
		<Formik
			initialValues={{ code: qrData }}
			enableReinitialize
			validationSchema={JoinGroupSchema}
			onSubmit={values => {
				joinGroup(values.code)
			}}
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
						backgroundColor={themes.classic.colors.secondary}
					>
						<StyledText
							color={themes.classic.colors.light}
							style={{ textAlign: 'center' }}
						>
							Войти по коду приглашения
						</StyledText>
					</Container>
					<Separator color={themes.classic.colors.dark} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={themes.classic.colors.secondary}
					>
						<Flex
							alignItems='center'
							justifyContent='space-between'
							style={{ width: '100%', flex: 1 }}
						>
							<StyledInput
								borderColor={
									errors.code && touched.code
										? themes.classic.colors.danger
										: themes.classic.colors.dark
								}
								placeholder='Код приглашения...'
								onChangeText={handleChange('code')}
								onBlur={handleBlur('code')}
								value={values.code}
								placeholderTextColor={
									themes.classic.colors.dark
								}
								style={{ flexBasis: '87%' }}
							/>
							<TouchableOpacity
								onPress={() => {
									dismiss()
									navigation.navigate('Scanner')
								}}
							>
								<AntDesign
									name='qrcode'
									size={30}
									color={themes.classic.colors.light}
								/>
							</TouchableOpacity>
						</Flex>
					</Container>
					<Separator color={themes.classic.colors.dark} />
					<Container
						top={0}
						bottom={0}
						backgroundColor={themes.classic.colors.secondary}
					>
						<StyledButton
							backgroundColor={themes.classic.colors.primary}
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
										color={themes.classic.colors.light}
									/>
								) : (
									'Войти'
								)}
							</StyledText>
						</StyledButton>
					</Container>
					{status === 'error' && (
						<StyledText
							color={themes.classic.colors.danger}
							style={{ textAlign: 'center', marginBottom: 15 }}
						>
							Такой группы не существует
						</StyledText>
					)}
				</>
			)}
		</Formik>
	)
}

export default FormJoinGroup
