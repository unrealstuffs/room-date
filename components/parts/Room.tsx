import { TouchableNativeFeedback } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import StyledText from '../styled/Text.styled'
import Flex from '../styled/Flex.styled'
import { Rooms } from '../../constants/Data'

interface RoomProps {
	room: Rooms
	onPress: () => void
}

const StyledCard = styled.View<{ backgroundColor: string }>`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 8px;
	background-color: ${props => props.backgroundColor};
`

const Room = ({ room, onPress }: RoomProps) => {
	const theme = useTheme()

	return (
		<TouchableNativeFeedback onPress={onPress}>
			<StyledCard
				style={{ elevation: 4 }}
				backgroundColor={theme.colors.white}
			>
				<Flex flexDirection='column'>
					<StyledText
						fontSize={14}
						fontWeight={700}
						color={theme.colors.secondary}
						style={{ marginBottom: 5 }}
					>
						Room {room.title ? room.title : room.id}
					</StyledText>
					<StyledText color={theme.colors.dark} fontSize={12}>
						{room.members?.length || 0} участников{' '}
						<AntDesign
							name='doubleright'
							style={{ marginHorizontal: 10 }}
							size={10}
						/>{' '}
						{room.category}{' '}
						<AntDesign
							name='doubleright'
							style={{ marginHorizontal: 10 }}
							size={10}
						/>{' '}
						{room.events?.length || 0} Событий
					</StyledText>
				</Flex>
				<AntDesign
					name='arrowright'
					color={theme.colors.primary}
					size={20}
				/>
			</StyledCard>
		</TouchableNativeFeedback>
	)
}

export default Room
