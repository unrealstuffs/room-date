import { Image, TouchableOpacity } from 'react-native'

interface AvatarProps {
	onPress?: () => void
	size: number
	uri: string | undefined
}

const Avatar = ({ onPress, size, uri }: AvatarProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={{ borderRadius: 999, elevation: 4 }}
		>
			{uri && (
				<Image
					source={{ uri }}
					style={{ width: size, height: size, borderRadius: 999 }}
				/>
			)}
		</TouchableOpacity>
	)
}

export default Avatar
