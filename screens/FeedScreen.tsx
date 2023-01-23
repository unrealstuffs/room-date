import { FlatList } from 'react-native'

import NoteItem from '../components/parts/NoteItem'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { Note } from '../constants/Types'
import { useTheme } from '../hooks/useTheme'
import LayoutGroup from '../layouts/LayoutGroup'
import { useTypedSelector } from '../hooks/useTypedSelector'

const FeedScreen = () => {
	const theme = useTheme()
	const { notes } = useTypedSelector(state => state.data)

	let pinnedNotes = [] as Note[]

	if (notes.length) {
		pinnedNotes = notes.filter(item => item.pinned)
	}

	return (
		<LayoutGroup title='Лента группы'>
			{pinnedNotes.length ? (
				<FlatList
					contentContainerStyle={{
						padding: 15,
					}}
					data={pinnedNotes}
					renderItem={({ item }: { item: Note }) => (
						<NoteItem note={item} />
					)}
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
