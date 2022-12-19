import styled from 'styled-components/native'

interface FlexProps {
	flexDirection?: string
	justifyContent?: string
	alignItems?: string
}

const Flex = styled.View<FlexProps>`
	flex-direction: ${props => props.flexDirection || 'row'};
	justify-content: ${props => props.justifyContent || 'flex-start'};
	align-items: ${props => props.alignItems || 'flex-start'};
`

export default Flex
