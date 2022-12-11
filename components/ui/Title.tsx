import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Themes from '../../constants/Themes'

interface TitleProps {
	children: string
}

const Title = ({ children }: TitleProps) => {
	return (
		<Text style={[styles.title, { color: Themes.light.secondary }]}>
			{children}
		</Text>
	)
}

export default Title

const styles = StyleSheet.create({
	title: {
		fontWeight: '700',
		fontFamily: 'open-sans-bd',
		marginBottom: 15,
	},
})
