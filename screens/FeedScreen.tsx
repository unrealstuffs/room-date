import { FlatList } from 'react-native'

import NoteItem from '../components/parts/NoteItem'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { Note } from '../constants/Types'
import { useTheme } from 'styled-components/native'
import LayoutGroup from '../layouts/LayoutGroup'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RootTabScreenProps } from '../navigation/types'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { useActions } from '../hooks/useActions'

const FeedScreen = ({ navigation }: RootTabScreenProps<'Feed'>) => {
	const theme = useTheme()
	const { setNoteId, setDataNote } = useActions()
	const { notes } = useTypedSelector(state => state.data)

	let pinnedNotes = [] as Note[]

	if (notes.length) {
		pinnedNotes = notes.filter(item => item.pinned)
	}

	useFocusEffect(
		useCallback(() => {
			setNoteId('')
			setDataNote({} as Note)
		}, [])
	)

	return (
		<LayoutGroup title='Лента группы'>
			{pinnedNotes.length ? (
				<FlatList
					contentContainerStyle={{
						padding: 15,
					}}
					data={pinnedNotes}
					renderItem={({ item }: { item: Note }) => (
						<NoteItem
							note={item}
							onPress={() => {
								setNoteId(item.id)
								navigation.navigate('Note')
							}}
						/>
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
