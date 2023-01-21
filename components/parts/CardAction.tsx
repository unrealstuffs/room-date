import { View } from 'react-native'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { StyledAction } from '../styled/NoteCard.styled'
import { AntDesign } from '@expo/vector-icons'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

interface CardActionProps {
	border?: boolean
	pinned: boolean
	iconName: React.ComponentProps<typeof AntDesign>['name']
	pressHandler: () => void
}

const CardAction = ({
	border,
	iconName,
	pressHandler,
	pinned,
}: CardActionProps) => {
	const theme = useTheme()
	return (
		<StyledAction onPress={pressHandler}>
			<View
				style={{
					width: '33%',
					alignItems: 'center',
					paddingVertical: 10,
					borderRightWidth: border ? 1 : 0,
					borderRightColor: theme.colors.dark,
				}}
			>
				<AntDesign
					name={iconName}
					size={20}
					color={
						iconName === 'pushpino' && pinned
							? theme.colors.primary
							: theme.colors.dark
					}
					style={{ textAlign: 'center' }}
				/>
			</View>
		</StyledAction>
	)
}

export default CardAction
