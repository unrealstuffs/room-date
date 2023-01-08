import { useTheme } from 'styled-components/native'
import { FlatList } from 'react-native'

import Event from '../components/parts/Event'
import HeaderRoom from '../components/parts/HeaderRoom'
import Centered from '../components/styled/Centered.styled'
import Container from '../components/styled/Container.styled'
import StyledText from '../components/styled/Text.styled'
import { Events } from '../constants/Data'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface RenderItemProps {
	item: Events
}

const FeedScreen = () => {
	const theme = useTheme()
	const { events } = useTypedSelector(state => state.data)

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
					Лента комнаты
				</StyledText>
			</Container>
			{events.length ? (
				<FlatList
					contentContainerStyle={{
						flex: 1,
						padding: 15,
						backgroundColor: theme.colors.background,
					}}
					data={events}
					renderItem={({ item }: RenderItemProps) =>
						item.pinned ? <Event event={item} /> : null
					}
					keyExtractor={event => event.id}
				/>
			) : (
				<Centered>
					<StyledText fontSize={12} color={theme.colors.dark}>
						Закрепленные события появятся здесь...
					</StyledText>
				</Centered>
			)}
		</>
	)
}

export default FeedScreen
