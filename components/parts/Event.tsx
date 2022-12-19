import { Pressable, TouchableNativeFeedback, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import {
	StyledAction,
	StyledCard,
	StyledCircle,
	StyledProgress,
	StyledProgressBar,
} from '../styled/EventCard.styled'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { Events } from '../../constants/Data'
import sliceText from '../../utils/sliceText'
import { useMemo, useState } from 'react'

interface EventProps {
	event: Events
}

const Event = ({ event }: EventProps) => {
	const theme = useTheme()
	const [showFullText, setShowFullText] = useState(false)
	const randomNubmer = useMemo(() => Math.floor(Math.random() * 100), [])

	const handleShowFullText = () => {
		setShowFullText(!showFullText)
	}

	return (
		<StyledCard
			backgroundColor={theme.colors.white}
			style={{ elevation: 4 }}
		>
			<TouchableNativeFeedback onPress={handleShowFullText}>
				<View
					style={{
						paddingBottom: 10,
						paddingTop: 10,
						paddingLeft: 10,
						paddingRight: 10,
					}}
				>
					<Flex
						justifyContent='space-between'
						alignItems='center'
						style={{ marginBottom: 10 }}
					>
						<StyledText
							fontSize={16}
							fontWeight={700}
							color={theme.colors.secondary}
						>
							{event.title}
						</StyledText>
					</Flex>
					<Flex style={{ marginBottom: 10 }}>
						<StyledText color={theme.colors.secondary}>
							{showFullText
								? event.description
								: sliceText(event.description)}
						</StyledText>
					</Flex>
					{event.type === 'date' && (
						<Flex
							justifyContent='space-between'
							alignItems='center'
							style={{ marginBottom: 10 }}
						>
							<StyledText
								fontSize={12}
								color={theme.colors.secondary}
							>
								{event.start_date}
							</StyledText>
							<StyledText
								fontSize={12}
								color={theme.colors.secondary}
							>
								{event.end_date}
							</StyledText>
						</Flex>
					)}
					{event.type === 'event' && (
						<Flex
							justifyContent='space-between'
							alignItems='center'
							style={{ marginBottom: 10 }}
						>
							<StyledText
								fontSize={12}
								color={theme.colors.secondary}
							>
								{event.start_date}
							</StyledText>
							<StyledText
								fontSize={12}
								color={theme.colors.secondary}
							>
								{event.end_date}
							</StyledText>
						</Flex>
					)}
					{event.type !== 'note' && (
						<StyledProgressBar
							backgroundColor={theme.colors.dark}
							style={{ marginBottom: 10 }}
						>
							<StyledProgress
								width={randomNubmer}
								backgroundColor={theme.colors.primary}
							>
								<StyledCircle
									backgroundColor={theme.colors.primary}
									style={{ elevation: 2 }}
								/>
							</StyledProgress>
						</StyledProgressBar>
					)}
				</View>
			</TouchableNativeFeedback>
			<Flex justifyContent='space-between'>
				<StyledAction border={true} borderColor={theme.colors.dark}>
					<AntDesign
						name='pushpino'
						size={20}
						color={
							event.pinned
								? theme.colors.primary
								: theme.colors.dark
						}
						style={{ textAlign: 'center' }}
					/>
				</StyledAction>
				<StyledAction border={true} borderColor={theme.colors.dark}>
					<AntDesign
						name='edit'
						size={20}
						color={theme.colors.dark}
						style={{ textAlign: 'center' }}
					/>
				</StyledAction>
				<StyledAction borderColor={theme.colors.dark}>
					<AntDesign
						name='delete'
						size={20}
						color={theme.colors.dark}
						style={{ textAlign: 'center' }}
					/>
				</StyledAction>
			</Flex>
		</StyledCard>
	)
}

export default Event
