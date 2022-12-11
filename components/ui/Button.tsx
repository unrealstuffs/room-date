import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Themes from '../../constants/Themes'

const Button = ({
	children,
	onPress,
	disabled,
	...props
}: TouchableOpacity['props']) => {
	return (
		<TouchableOpacity
			activeOpacity={0.4}
			onPress={onPress}
			style={[
				styles.button,
				{
					backgroundColor: Themes.light.primary,
					opacity: disabled ? 0.4 : 1,
				},
			]}
			{...props}
		>
			<Text style={styles.textButton}>{children}</Text>
		</TouchableOpacity>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		width: '100%',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	textButton: {
		color: '#fff',
	},
})
