import { TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import StyledText from '../styled/Text.styled'
import Flex from '../styled/Flex.styled'
import { Group } from '../../constants/Types'
import themes from '../../themes'

interface GroupProps {
	group: Group
	loading: boolean
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

const GroupItem = ({ group, loading, onPress }: GroupProps) => {
	return (
		<TouchableNativeFeedback onPress={onPress}>
			<StyledCard
				style={{ elevation: 4 }}
				backgroundColor={themes.classic.colors.secondary}
			>
				<Flex flexDirection='column'>
					<StyledText
						fontSize={14}
						fontWeight={700}
						color={themes.classic.colors.light}
						style={{ marginBottom: 5 }}
					>
						{group.title ? group.title : group.id}
					</StyledText>
					<StyledText
						color={themes.classic.colors.dark}
						fontSize={12}
					>
						{group.members?.length || 0} участников{' '}
					</StyledText>
				</Flex>
				{loading ? (
					<ActivityIndicator
						color={themes[group.theme].colors.light}
					/>
				) : (
					<AntDesign
						name='arrowright'
						color={themes[group.theme].colors.primary}
						size={20}
					/>
				)}
			</StyledCard>
		</TouchableNativeFeedback>
	)
}

export default GroupItem
