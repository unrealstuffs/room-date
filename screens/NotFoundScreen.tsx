import { StyledButton } from '../components/styled/Button.styled'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { useTheme } from '../hooks/useTheme'
import { RootStackScreenProps } from '../navigation/types'

const NotFoundScreen = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
	const theme = useTheme()

	return (
		<Container fullHeight={true} backgroundColor={theme.colors.background}>
			<Centered>
				<StyledText>Этой группы не существует</StyledText>
				<StyledButton onPress={() => navigation.navigate('Root')}>
					<StyledText>Вернуться на главную</StyledText>
				</StyledButton>
			</Centered>
		</Container>
	)
}

export default NotFoundScreen
