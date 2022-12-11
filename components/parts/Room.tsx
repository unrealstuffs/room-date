import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Themes from '../../constants/Themes'

interface RoomProps {
	id: string
	title: string
	category: string
	members: string[]
	onPress: () => void
}

const Room = ({ id, title, category, members, onPress }: RoomProps) => {
	return (
		<TouchableNativeFeedback onPress={onPress}>
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>Room {title ? title : id}</Text>
					<Text style={styles.info}>
						{members.length} members . {category}
					</Text>
				</View>
				<View>
					<AntDesign
						name='arrowright'
						color={Themes.light.dark}
						size={20}
					/>
				</View>
			</View>
		</TouchableNativeFeedback>
	)
}

export default Room

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
		borderRadius: 8,
		backgroundColor: '#fff',
		elevation: 4,
	},
	title: {
		fontSize: 14,
		fontFamily: 'open-sans-reg',
		marginBottom: 5,
		fontWeight: '700',
		color: Themes.light.secondary,
	},
	info: {
		color: Themes.light.dark,
		fontSize: 12,
	},
})
