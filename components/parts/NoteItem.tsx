import { TouchableNativeFeedback, View } from 'react-native'
import dayjs from 'dayjs'

import { StyledCard } from '../styled/NoteCard.styled'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import sliceText from '../../utils/sliceText'
import { Note } from '../../constants/Types'
import { useTheme } from '../../hooks/useTheme'

const NoteItem = ({ note, onPress }: { note: Note; onPress: () => void }) => {
	const theme = useTheme()

	return (
		<StyledCard
			backgroundColor={theme.colors.secondary}
			style={{ elevation: 4 }}
		>
			<TouchableNativeFeedback onPress={onPress}>
				<View
					style={{
						paddingBottom: 10,
						paddingTop: 10,
						paddingLeft: 10,
						paddingRight: 10,
					}}
				>
					{note.title && (
						<StyledText
							fontSize={16}
							fontWeight={700}
							color={theme.colors.light}
							style={{ marginBottom: 10 }}
						>
							{note.title}
						</StyledText>
					)}
					<Flex style={{ marginBottom: 10 }}>
						<StyledText color={theme.colors.light}>
							{sliceText(note.description)}
						</StyledText>
					</Flex>
					<Flex justifyContent='space-between' alignItems='center'>
						<StyledText fontSize={12} color={theme.colors.dark}>
							{dayjs(note.createdAt).format('DD/MM/YYYY')}
						</StyledText>
					</Flex>
				</View>
			</TouchableNativeFeedback>
		</StyledCard>
	)
}

export default NoteItem
