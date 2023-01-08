import { useState } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import firestore from '@react-native-firebase/firestore'

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
import DateConverter from '../../utils/dates'

interface EventProps {
	event: Events
}

const Event = ({ event }: EventProps) => {
	const theme = useTheme()
	const [showFullText, setShowFullText] = useState(false)

	const handleShowFullText = () => {
		setShowFullText(!showFullText)
	}

	const pinEvent = () => {
		firestore()
			.collection('events')
			.doc(event.id)
			.update({ pinned: !event.pinned })
	}

	const deleteEvent = () => {
		firestore().collection('events').doc(event.id).delete()
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
								{new DateConverter(event.date).getDate}
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
								{/* {dayjs(new Date()).format('DD/MM/YYYY')} */}
								{new DateConverter(event.date).getDate}
							</StyledText>
							<StyledText
								fontSize={12}
								color={theme.colors.secondary}
							></StyledText>
						</Flex>
					)}
					{/* {event.type !== 'note' && event.type !== 'date' && (
						<StyledProgressBar
							backgroundColor={theme.colors.dark}
							style={{ marginBottom: 10 }}
						>
							<StyledProgress
								width={new DateConverter(
									event.date
								).getPercentage()}
								backgroundColor={theme.colors.primary}
							>
								<StyledCircle
									backgroundColor={theme.colors.primary}
									style={{ elevation: 2 }}
								/>
							</StyledProgress>
						</StyledProgressBar>
					)} */}
				</View>
			</TouchableNativeFeedback>
			<Flex justifyContent='space-between'>
				<StyledAction
					border={true}
					borderColor={theme.colors.dark}
					onPress={pinEvent}
				>
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
				<StyledAction
					borderColor={theme.colors.dark}
					onPress={deleteEvent}
				>
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
