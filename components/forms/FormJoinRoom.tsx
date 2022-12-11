import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Separator from '../ui/Separator'
import Button from '../ui/Button'
import Themes from '../../constants/Themes'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

const FormJoinRoom = () => {
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)

	const handleJoinRoom = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			navigation.navigate('Room')
		}, 2000)
	}

	return (
		<View>
			<View style={styles.padding}>
				<Text style={styles.title}>Войти по коду приглашения</Text>
			</View>
			<Separator />
			<View style={styles.padding}>
				<BottomSheetTextInput
					style={[styles.input, { borderColor: Themes.light.light }]}
					placeholder='Код приглашения...'
				/>
			</View>
			<Separator />
			<View style={[styles.padding]}>
				<Button onPress={handleJoinRoom} disabled={loading}>
					{loading ? <ActivityIndicator color='#fff' /> : 'Войти'}
				</Button>
			</View>
		</View>
	)
}

export default FormJoinRoom

const styles = StyleSheet.create({
	padding: {
		paddingHorizontal: 15,
	},
	title: {
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
	},
})
