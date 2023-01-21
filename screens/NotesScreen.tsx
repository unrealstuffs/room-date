import { AntDesign } from '@expo/vector-icons'
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
import { useGroup } from '../hooks/useGroup'
import { useTheme } from '../hooks/useTheme'
import LayoutGroup from '../layouts/LayoutGroup'

const NotesScreen = () => {
	const theme = useTheme()
	const { notes, status } = useGroup()
	const { setSheet } = useActions()

	return (
		<>
			<LayoutGroup title='Заметки группы'>
				{status !== 'loading' && status !== 'error' && notes?.length ? (
					<FlatList
						contentContainerStyle={{
							padding: 15,
						}}
						data={notes}
						renderItem={({ item }: { item: Note }) => (
							<NoteItem note={item} />
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
					onPress={() => setSheet('createNote')}
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
