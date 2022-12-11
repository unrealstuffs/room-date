import { Text } from 'react-native'
import React from 'react'
import Container from '../components/ui/Container'
import HeaderRoom from '../components/parts/HeaderRoom'
import Title from '../components/ui/Title'

const SettingsScreen = () => {
	return (
		<Container>
			<HeaderRoom />
			<Title>Настройки комнаты</Title>
		</Container>
	)
}

export default SettingsScreen
