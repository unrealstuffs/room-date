import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useState } from 'react'
import Separator from '../ui/Separator'
import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet'
import Themes from '../../constants/Themes'
import Button from '../ui/Button'
import { useNavigation } from '@react-navigation/native'

const FormCreateRoom = () => {
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)

	const handleCreateRoom = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setIsCreated(true)
		}, 2000)
	}

	const handleEnterRoom = () => {
		navigation.navigate('Room')
	}

	return (
		<View>
			<View style={styles.padding}>
				<Text style={styles.title}>Создать комнату</Text>
			</View>
			<Separator />
			<View style={styles.padding}>
				<BottomSheetTextInput
					style={[
						styles.input,
						{ borderColor: Themes.light.light, marginBottom: 10 },
					]}
					placeholder='Название...'
				/>
				<BottomSheetTextInput
					style={[styles.input, { borderColor: Themes.light.light }]}
					placeholder='Категория...'
				/>
			</View>
			<Separator />
			<View style={styles.padding}>
				{isCreated ? (
					<>
						<TextInput
							style={[
								styles.input,
								{
									borderColor: Themes.light.light,
									marginBottom: 10,
								},
							]}
							value='#27542286940'
						/>
						<Button onPress={handleEnterRoom}>
							{loading ? (
								<ActivityIndicator color='#fff' />
							) : (
								'Перейти в комнату'
							)}
						</Button>
					</>
				) : (
					<Button onPress={handleCreateRoom} disabled={loading}>
						{loading ? (
							<ActivityIndicator color='#fff' />
						) : (
							'Создать'
						)}
					</Button>
				)}
			</View>
		</View>
	)
}

export default FormCreateRoom

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
