import { Text } from 'react-native'
import HeaderRoom from '../components/parts/HeaderRoom'
import Centered from '../components/ui/Centered'
import Container from '../components/ui/Container'
import Title from '../components/ui/Title'
import Themes from '../constants/Themes'

const FeedScreen = () => {
	return (
		<Container>
			<HeaderRoom />
			<Title>Лента комнаты</Title>
			<Centered>
				<Text style={{ fontSize: 12, color: Themes.light.dark }}>
					Закрепленные события появятся здесь...
				</Text>
			</Centered>
		</Container>
	)
}

export default FeedScreen
