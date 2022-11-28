import { Text, TouchableOpacity } from 'react-native'
import Container from '../components/ui/Container'
import { RootStackScreenProps } from '../types'

const UserScreen = ({ navigation }: RootStackScreenProps<'User'>) => {
	return (
		<Container>
			<TouchableOpacity onPress={() => navigation.replace('Root')}>
				<Text>Go to root screen!</Text>
			</TouchableOpacity>
		</Container>
	)
}

export default UserScreen
