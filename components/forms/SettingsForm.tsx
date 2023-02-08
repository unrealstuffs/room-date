import * as Yup from 'yup'
import { Formik } from 'formik'

import { StyledInput } from '../styled/Input.styled'
import { StyledButton } from '../styled/Button.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTheme } from 'styled-components/native'
import InviteInput from '../parts/InviteInput'
import { useGroupsActions } from '../../hooks/useGroupsActions'
import ThemeInput from '../parts/ThemeInput'

const UpdateGroupSchema = Yup.object().shape({
	title: Yup.string().required('Название не указано'),
})

const Settings = () => {
	const theme = useTheme()
	const { user } = useTypedSelector(state => state.user)
	const { group } = useTypedSelector(state => state.data)
	const { exitGroup, updateGroup, deleteGroup, status } = useGroupsActions()

	const handleExitGroup = () => {
		if (group.members.length > 1) {
			exitGroup(user.uid)
		} else {
			deleteGroup()
		}
	}

	return (
		<Formik
			initialValues={{
				title: group.title,
			}}
			enableReinitialize
			validationSchema={UpdateGroupSchema}
			onSubmit={values => {
				updateGroup(values)
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
					<StyledInput
						borderColor={
							errors.title && touched.title
								? theme.colors.danger
								: theme.colors.dark
						}
						placeholder='Название...'
						style={{ marginBottom: 10 }}
						color={theme.colors.light}
						onChangeText={handleChange('title')}
						onBlur={handleBlur('title')}
						value={values.title}
						placeholderTextColor={theme.colors.dark}
					/>

					<ThemeInput themeName={group.theme} />

					<InviteInput
						inviteCode={group.inviteCode}
						style={{ marginBottom: 30 }}
					/>

					<StyledButton
						backgroundColor={theme.colors.primary}
						style={{
							marginBottom: 10,
							opacity: status === 'loading' ? 0.6 : 1,
						}}
						onPress={() => handleSubmit()}
						disabled={status === 'loading'}
					>
						<StyledText>Сохранить</StyledText>
					</StyledButton>
					<StyledButton
						backgroundColor={theme.colors.dark}
						style={{
							marginBottom: 10,
							opacity: status === 'loading' ? 0.6 : 1,
						}}
						onPress={() => handleExitGroup()}
						disabled={status === 'loading'}
					>
						<StyledText>Выйти из группы</StyledText>
					</StyledButton>
					<StyledButton
						backgroundColor={theme.colors.danger}
						style={{
							marginBottom: 30,
							opacity: status === 'loading' ? 0.6 : 1,
						}}
						onPress={() => deleteGroup()}
						disabled={status === 'loading'}
					>
						<StyledText>Удалить группу</StyledText>
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

export default Settings
