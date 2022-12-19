import { FlatList } from 'react-native'
import { useTheme } from 'styled-components/native'

import EventsActionsModal from '../components/modals/EventsActionsModal'
import Event from '../components/parts/Event'
import HeaderRoom from '../components/parts/HeaderRoom'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { Events, events } from '../constants/Data'

interface RenderItemProps {
	item: Events
}

const EventsScreen = () => {
	const theme = useTheme()

	const renderItem = ({ item }: RenderItemProps) => <Event event={item} />

	return (
		<>
			<Container
				top={0}
				bottom={0}
				fullHeight={false}
				backgroundColor={theme.colors.background}
			>
				<HeaderRoom />
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.secondary}
				>
					События комнаты
				</StyledText>
			</Container>
			{events.length ? (
				<FlatList
					contentContainerStyle={{
						padding: 15,
						backgroundColor: theme.colors.background,
					}}
					data={events}
					renderItem={renderItem}
					keyExtractor={event => event.id}
				/>
			) : (
				<Centered>
					<StyledText fontSize={12} color={theme.colors.dark}>
						Созданные события появятся здесь...
					</StyledText>
				</Centered>
			)}
			<EventsActionsModal />
		</>
	)
}

export default EventsScreen
