import { useTheme } from 'styled-components/native'

import Container from '../components/styled/Container.styled'
import SettingsForm from '../components/forms/SettingsForm'
import LayoutGroup from '../layouts/LayoutGroup'

const SettingsScreen = () => {
	const theme = useTheme()

	return (
		<LayoutGroup title='Настройки группы'>
			<Container
				fullHeight={true}
				backgroundColor={theme.colors.background}
			>
				<SettingsForm />
			</Container>
		</LayoutGroup>
	)
}

export default SettingsScreen
