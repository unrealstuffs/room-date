import { StyleSheet, View } from 'react-native'
import { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
	backgroundColor?: string
}

const Container = ({
	children,
	backgroundColor = '#ffffff',
}: ContainerProps) => {
	return (
		<View style={[styles.container, { backgroundColor }]}>{children}</View>
	)
}

export default Container

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		padding: 15,
		flex: 1,
	},
})
