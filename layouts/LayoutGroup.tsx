import { View } from 'react-native'
import React, { ReactNode } from 'react'
import Container from '../components/styled/Container.styled'
import { useTheme } from '../hooks/useTheme'
import HeaderGroup from '../components/parts/HeaderGroup'
import StyledText from '../components/styled/Text.styled'

interface LayoutProps {
	children: ReactNode
	title: string
}

const LayoutGroup = ({ children, title }: LayoutProps) => {
	const theme = useTheme()
	return (
		<>
			<Container backgroundColor={theme.colors.background}>
				<HeaderGroup />
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.light}
				>
					{title}
				</StyledText>
			</Container>
			<View
				style={{
					flex: 1,
					backgroundColor: theme.colors.background,
					height: '100%',
				}}
			>
				{children}
			</View>
		</>
	)
}

export default LayoutGroup
