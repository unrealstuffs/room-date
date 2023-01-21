import { FlatList } from 'react-native'

import NoteItem from '../components/parts/NoteItem'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { useGroup } from '../hooks/useGroup'
import { Note } from '../constants/Types'
import { useTheme } from '../hooks/useTheme'
import LayoutGroup from '../layouts/LayoutGroup'

const FeedScreen = () => {
	const theme = useTheme()
	const { notes, status } = useGroup()

	return (
		<LayoutGroup title='Лента группы'>
			{status !== 'loading' && status !== 'error' && notes?.length ? (
				<FlatList
					contentContainerStyle={{
						padding: 15,
					}}
					data={notes}
					renderItem={({ item }: { item: Note }) =>
						item.pinned ? <NoteItem note={item} /> : null
					}
					keyExtractor={note => note.id}
				/>
			) : (
				<Centered backgroundColor={theme.colors.background}>
					<StyledText fontSize={12} color={theme.colors.dark}>
						Закрепленные заметки появятся здесь...
					</StyledText>
				</Centered>
			)}
		</LayoutGroup>
	)
}

export default FeedScreen
