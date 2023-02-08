import dayjs from 'dayjs'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTheme } from 'styled-components/native'

const HeaderRoot = () => {
	const { user } = useTypedSelector(state => state.user)
	const theme = useTheme()

	return (
		<Flex flexDirection='column'>
			<StyledText
				fontSize={12}
				color={theme.colors.dark}
				style={{ marginBottom: 5 }}
			>
				{dayjs(new Date()).format('DD MMM YYYY')}
			</StyledText>
			<StyledText
				fontSize={16}
				fontWeight={700}
				color={theme.colors.light}
			>
				Привет, {user?.displayName}
			</StyledText>
		</Flex>
	)
}

export default HeaderRoot
