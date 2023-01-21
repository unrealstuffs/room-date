import styled from 'styled-components/native'

interface InputProps {
	borderColor: string
	color?: string
}

export const StyledInputWithIcon = styled.View`
	position: relative;
	flex-direction: row;
	align-items: center;
`

export const StyledInput = styled.TextInput<InputProps>`
	width: 100%;
	border-width: 1px;
	padding: 10px;
	border-radius: 8px;
	border-color: ${props => props.borderColor};
	color: ${props => props.color || '#ececec'};
`
