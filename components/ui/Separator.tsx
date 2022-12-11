import { StyleSheet, View } from 'react-native'
import React from 'react'
import Themes from '../../constants/Themes'

const Separator = () => {
	return (
		<View
			style={[styles.separator, { backgroundColor: Themes.light.light }]}
		></View>
	)
}

export default Separator

const styles = StyleSheet.create({
	separator: {
		width: '100%',
		height: 1,
		marginVertical: 15,
	},
})
