import styled from 'styled-components/native'

interface SeparatorProps {
	color: string
}

const Separator = styled.View<SeparatorProps>`
	width: 100%;
	height: 1px;
	background-color: ${props => props.color};
`

export default Separator
