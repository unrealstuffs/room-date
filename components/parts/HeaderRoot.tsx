import dayjs from 'dayjs'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import themes from '../../themes'

const HeaderRoot = () => {
	const { user } = useTypedSelector(state => state.user)

	return (
		<Flex flexDirection='column'>
			<StyledText
				fontSize={12}
				color={themes.classic.colors.dark}
				style={{ marginBottom: 5 }}
			>
				{dayjs(new Date()).format('DD MMM YYYY')}
			</StyledText>
			<StyledText
				fontSize={16}
				fontWeight={700}
				color={themes.classic.colors.light}
			>
				Привет, {user?.displayName}
			</StyledText>
		</Flex>
	)
}

export default HeaderRoot
