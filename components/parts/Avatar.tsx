import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface AvatarProps {
	onPress?: () => void
	size: number
	uri: string | undefined
}

const Avatar = ({ onPress, size, uri }: AvatarProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
			<Image
				source={{ uri }}
				style={{ width: size, height: size, borderRadius: 999 }}
			/>
		</TouchableOpacity>
	)
}

export default Avatar
