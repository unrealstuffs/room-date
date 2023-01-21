import { useState } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'

import {
	StyledCard,
	StyledCircle,
	StyledProgress,
	StyledProgressBar,
} from '../styled/NoteCard.styled'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import sliceText from '../../utils/sliceText'
import { Note } from '../../constants/Types'
import { useNotes } from '../../hooks/useNotes'
import { useTheme } from '../../hooks/useTheme'
import { useActions } from '../../hooks/useActions'
import dayjs from 'dayjs'
import CardAction from './CardAction'

const NoteItem = ({ note }: { note: Note }) => {
	const theme = useTheme()
	const [showFullText, setShowFullText] = useState(false)
	const { deleteNote, pinNote } = useNotes()
	const { setSheet, setNote } = useActions()

	const handleShowFullText = () => {
		setShowFullText(!showFullText)
	}

	const getPercentage = (startDate: Date, endDate: Date) => {
		const todayDate = dayjs()

		const daysDifference = dayjs(endDate).diff(startDate, 'minutes')
		const difference = todayDate.diff(startDate, 'minutes')

		const result = (difference / daysDifference) * 100
		return result >= 100 ? 100 : result
	}

	return (
		<StyledCard
			backgroundColor={theme.colors.secondary}
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
							color={theme.colors.light}
						>
							{note.title}
						</StyledText>
					</Flex>
					<Flex style={{ marginBottom: 10 }}>
						<StyledText color={theme.colors.light}>
							{showFullText
								? note.description
								: sliceText(note.description)}
						</StyledText>
					</Flex>
					{note.date && (
						<Flex
							justifyContent='space-between'
							alignItems='center'
							style={{ marginBottom: 15 }}
						>
							{note.date > note.createdAt && (
								<StyledText
									fontSize={12}
									color={theme.colors.light}
								>
									{dayjs(note.createdAt).format('DD/MM/YYYY')}
								</StyledText>
							)}
							<StyledText
								fontSize={12}
								color={theme.colors.light}
							>
								{dayjs(note.date).format('DD/MM/YYYY')}
							</StyledText>
						</Flex>
					)}
					{note.date > note.createdAt && (
						<StyledProgressBar
							backgroundColor={theme.colors.dark}
							style={{ marginBottom: 10 }}
						>
							<StyledProgress
								width={getPercentage(note.createdAt, note.date)}
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
				<CardAction
					border
					pinned={note.pinned}
					iconName='pushpino'
					pressHandler={() => pinNote(note.id, !note.pinned)}
				/>
				<CardAction
					border
					pinned={note.pinned}
					iconName='edit'
					pressHandler={() => {
						setNote({
							...note,
						})
						setSheet('editNote')
					}}
				/>
				<CardAction
					pinned={note.pinned}
					iconName='delete'
					pressHandler={() => deleteNote(note.id)}
				/>
			</Flex>
		</StyledCard>
	)
}

export default NoteItem
