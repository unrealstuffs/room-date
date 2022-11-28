import { StyleSheet, View } from 'react-native'
import { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
	return <View style={styles.container}>{children}</View>
}

export default Container

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flex: 1,
	},
})
