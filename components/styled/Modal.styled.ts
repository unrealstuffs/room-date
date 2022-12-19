import styled from 'styled-components/native'

const StyledModal = styled.View<{ backgroundColor: string }>`
	background-color: ${props => props.backgroundColor};
	padding: 10px;
	border-radius: 8px;
`
export default StyledModal
