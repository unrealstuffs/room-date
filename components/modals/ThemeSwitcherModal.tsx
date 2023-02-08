import { Pressable, useWindowDimensions } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import allThemes from '../../themes'
import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { useTheme } from 'styled-components/native'
import { useGroupsActions } from '../../hooks/useGroupsActions'

interface ItemProps {
	backgroundColor: string
	border?: boolean
}

const StyledItem = styled.View<ItemProps>`
	width: 50px;
	height: 50px;
	border-radius: 999px;
	background-color: ${props => props.backgroundColor};
	margin-bottom: 5px;
`

const ThemeSwitcherModal = ({
	modal: { closeModal, params },
}: ModalComponentProp<ModalStackParams, void, 'ThemeSwitcherModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const { updateTheme } = useGroupsActions()

	const handleSwitchTheme = (theme: DefaultTheme) => {
		updateTheme(theme.name)
		closeModal()
	}

	return (
		<StyledModal
			backgroundColor={theme.colors.secondary}
			style={{ width: width * 0.95 }}
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
				style={{ marginBottom: 15 }}
			>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.light}
				>
					Сменить тему
				</StyledText>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
					color={theme.colors.light}
				/>
			</Flex>
			<Flex style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
				{Object.values(allThemes).map(theme => (
					<Pressable
						key={theme.name}
						onPress={() => handleSwitchTheme(theme)}
					>
						<Flex flexDirection='column' alignItems='center'>
							<StyledItem
								backgroundColor={theme.colors.primary}
							/>
							<StyledText
								fontSize={12}
								color={
									theme.name === params?.theme
										? theme.colors.light
										: theme.colors.dark
								}
							>
								{theme.name}
							</StyledText>
						</Flex>
					</Pressable>
				))}
			</Flex>
		</StyledModal>
	)
}

export default ThemeSwitcherModal
