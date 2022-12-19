import styled from 'styled-components/native'

interface TextProps {
	fontWeight?: number
	color?: string
	fontSize?: number
}

const StyledText = styled.Text<TextProps>`
	font-family: 'open-sans-reg';
	font-weight: ${props => props.fontWeight || 400};
	color: ${props => props.color || '#fff'};
	font-size: ${props => props.fontSize || 14}px;
`

export default StyledText
