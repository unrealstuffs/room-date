import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Themes from '../../constants/Themes'

const HeaderRoot = () => {
	return (
		<View>
			<Text style={styles.date}>24 дек. 2022</Text>
			<Text style={styles.hello}>Привет, MicroSanya</Text>
		</View>
	)
}

export default HeaderRoot

const styles = StyleSheet.create({
	date: {
		fontSize: 12,
		color: Themes.light.dark,
		marginBottom: 5,
	},
	hello: {
		fontSize: 16,
		fontWeight: '700',
		color: Themes.light.secondary,
	},
})
