import styled from 'styled-components/native'

interface ContainerProps {
	backgroundColor: string
	left?: number
	right?: number
	top?: number
	bottom?: number
	fullHeight?: boolean
}

const Container = styled.View<ContainerProps>`
	position: relative;
	flex: ${props => (!props.fullHeight ? 'none' : 1)};
	background-color: ${props => props.backgroundColor};
	padding-left: ${props => props.left || 15}px;
	padding-right: ${props => props.right || 15}px;
	padding-top: ${props => props.top || 15}px;
	padding-bottom: ${props => props.bottom || 15}px;
`

export default Container
