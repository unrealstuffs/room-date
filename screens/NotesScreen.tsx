import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList } from 'react-native'

import NoteItem from '../components/parts/NoteItem'
import {
	StyledAction,
	StyledActions,
} from '../components/styled/Actions.styled'
import Centered from '../components/styled/Centered.styled'
import StyledText from '../components/styled/Text.styled'
import { Note } from '../constants/Types'
import { useActions } from '../hooks/useActions'
import { useTheme } from '../hooks/useTheme'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LayoutGroup from '../layouts/LayoutGroup'
import { RootTabScreenProps } from '../navigation/types'

const NotesScreen = ({ navigation }: RootTabScreenProps<'Notes'>) => {
	const theme = useTheme()
	const { notes } = useTypedSelector(state => state.data)
	const { setNoteId, setDataNote } = useActions()

	useFocusEffect(
		useCallback(() => {
			setNoteId('')
			setDataNote({} as Note)
		}, [])
	)

	return (
		<>
			<LayoutGroup title='Заметки группы'>
				{notes?.length ? (
					<FlatList
						contentContainerStyle={{
							padding: 15,
						}}
						data={notes}
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
							Созданные заметки появятся здесь...
						</StyledText>
					</Centered>
				)}
			</LayoutGroup>
			<StyledActions>
				<StyledAction
					backgroundColor={theme.colors.primary}
					onPress={() => navigation.navigate('Note')}
				>
					<AntDesign
						name='plus'
						size={23}
						color={theme.colors.light}
					/>
				</StyledAction>
			</StyledActions>
		</>
	)
}

export default NotesScreen
