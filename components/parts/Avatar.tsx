import { Image, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'styled-components/native'
import StyledText from '../styled/Text.styled'

interface AvatarProps {
	onPress?: () => void
	size: number
	uri: string | undefined
	name: string
}

const Avatar = ({ onPress, size, uri, name }: AvatarProps) => {
	const theme = useTheme()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={{ borderRadius: 999, elevation: 4 }}
		>
			{uri ? (
				<Image
					source={{ uri }}
					style={{ width: size, height: size, borderRadius: 999 }}
				/>
			) : (
				<View
					style={{
						width: size,
						height: size,
						borderRadius: 999,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: theme.colors.primary,
					}}
				>
					<StyledText fontSize={size * 0.4}>
						{name[0].toUpperCase()}
					</StyledText>
				</View>
			)}
		</TouchableOpacity>
	)
}

export default Avatar
