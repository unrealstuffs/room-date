import styled from 'styled-components/native'

interface ActionProps {
	backgroundColor: string
}

export const StyledActions = styled.View`
	position: absolute;
	bottom: 15px;
	right: 15px;
`
export const StyledAction = styled.TouchableOpacity<ActionProps>`
	width: 60px;
	height: 60px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.backgroundColor};
	border-radius: 999px;
	margin-top: 15px;
`
