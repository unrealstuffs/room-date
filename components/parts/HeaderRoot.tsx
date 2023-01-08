import dayjs from 'dayjs'
import { useTheme } from 'styled-components/native'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const HeaderRoot = () => {
	const theme = useTheme()
	const { user } = useTypedSelector(state => state.user)
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
				color={theme.colors.secondary}
			>
				Привет, {user?.displayName}
			</StyledText>
		</Flex>
	)
}

export default HeaderRoot
