import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../types'
import Container from '../components/ui/Container'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
	return (
		<Container>
			<TouchableOpacity onPress={() => navigation.replace('Root')}>
				<Text>Go to root screen!</Text>
			</TouchableOpacity>
		</Container>
	)
}

export default LoginScreen
