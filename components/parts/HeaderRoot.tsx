import { useTheme } from 'styled-components/native'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'

const HeaderRoot = () => {
	const theme = useTheme()
	return (
		<Flex flexDirection='column'>
			<StyledText
				fontSize={12}
				color={theme.colors.dark}
				style={{ marginBottom: 5 }}
			>
				24 дек. 2022
			</StyledText>
			<StyledText
				fontSize={16}
				fontWeight={700}
				color={theme.colors.secondary}
			>
				Привет, MicroSanya
			</StyledText>
		</Flex>
	)
}

export default HeaderRoot
