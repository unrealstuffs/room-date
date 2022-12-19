import styled from 'styled-components/native'

interface CenteredProps {
	backgroundColor?: string
}

const Centered = styled.View<CenteredProps>`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.backgroundColor};
`
export default Centered
