import { Pressable, useWindowDimensions } from 'react-native'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { ModalComponentProp } from 'react-native-modalfy'

import { ModalStackParams } from '../../providers/ModalConfigProvider'
import allThemes from '../../themes'

import Flex from '../styled/Flex.styled'
import StyledText from '../styled/Text.styled'
import StyledModal from '../styled/Modal.styled'
import { useActions } from '../../hooks/useActions'

interface ItemProps {
	backgroundColor: string
	border?: boolean
}

const StyledItem = styled.View<ItemProps>`
	width: 40px;
	height: 40px;
	border-radius: 999px;
	background-color: ${props => props.backgroundColor};
	margin-bottom: 5px;
	border: ${props =>
		props.border ? '1px solid ' + props.theme.colors.light : 'none'};
`

const ThemeSwitcherModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'MemberModal'>) => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const { setTheme } = useActions()

	const handleSwitchTheme = (theme: DefaultTheme) => {
		setTheme(theme)
		closeModal()
	}

	return (
		<StyledModal
			backgroundColor={theme.colors.white}
			style={{ width: width * 0.85 }}
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
				style={{ marginBottom: 15 }}
			>
				<StyledText
					fontSize={16}
					fontWeight={700}
					color={theme.colors.secondary}
				>
					Сменить тему
				</StyledText>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
				/>
			</Flex>
			<Flex style={{ flexWrap: 'wrap' }}>
				{Object.values(allThemes).map(theme => (
					<Pressable
						key={theme.name}
						onPress={() => handleSwitchTheme(theme)}
						style={{ marginRight: 10 }}
					>
						<Flex flexDirection='column' alignItems='center'>
							<StyledItem
								backgroundColor={theme.colors.primary}
								// border={theme.active}
							/>
							<StyledText fontSize={12} color={theme.colors.dark}>
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
