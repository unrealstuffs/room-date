import styled from 'styled-components/native'

interface ButtonProps {
	backgroundColor?: string
	opacity?: number
}

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
	width: 100%;
	padding: 13px;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	background-color: ${props => props.backgroundColor};
	opacity: 1;
`
