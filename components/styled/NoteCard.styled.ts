import styled from 'styled-components/native'

interface ProgressBarProps {
	backgroundColor: string
}
interface ProgressProps {
	backgroundColor: string
	width: number
}

export const StyledCard = styled.View<{ backgroundColor: string }>`
	margin-bottom: 10px;
	border-radius: 8px;
	background-color: ${props => props.backgroundColor};
`

export const StyledProgressBar = styled.View<ProgressBarProps>`
	width: 100%;
	height: 2px;
	background-color: ${props => props.backgroundColor};
`

export const StyledProgress = styled.View<ProgressProps>`
	position: relative;
	width: ${props => props.width}%;
	height: 2px;
	background-color: ${props => props.backgroundColor};
`

export const StyledCircle = styled.View<{ backgroundColor: string }>`
	position: absolute;
	right: -5px;
	top: -4px;
	width: 10px;
	height: 10px;
	border-radius: 999px;
	background-color: ${props => props.backgroundColor};
`

export const StyledAction = styled.TouchableNativeFeedback``
