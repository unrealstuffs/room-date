import { useTheme } from 'styled-components/native'

import Container from '../components/styled/Container.styled'
import HeaderRoom from '../components/parts/HeaderRoom'
import StyledText from '../components/styled/Text.styled'
import SettingsForm from '../components/forms/SettingsForm'

const SettingsScreen = () => {
	const theme = useTheme()

	return (
		<Container fullHeight={true} backgroundColor={theme.colors.background}>
			<HeaderRoom />
			<StyledText
				fontWeight={700}
				fontSize={16}
				color={theme.colors.secondary}
				style={{ marginBottom: 15 }}
			>
				Настройки комнаты
			</StyledText>
			<SettingsForm />
		</Container>
	)
}

export default SettingsScreen
