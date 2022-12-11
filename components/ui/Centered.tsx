import { StyleSheet, View } from 'react-native'
import { ReactNode } from 'react'

interface CenteredProps {
	children: ReactNode
}

const Centered = ({ children }: CenteredProps) => {
	return <View style={styles.centered}>{children}</View>
}

export default Centered

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
