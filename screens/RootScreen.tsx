import { Text, TouchableOpacity } from 'react-native'
import Container from '../components/ui/Container'
import { RootStackScreenProps } from '../types'

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	return (
		<Container>
			<TouchableOpacity onPress={() => navigation.replace('Login')}>
				<Text>Go to login screen!</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.replace('Room')}>
				<Text>Go to room screen!</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('User')}>
				<Text>Go to user screen!</Text>
			</TouchableOpacity>
		</Container>
	)
}

export default RootScreen
