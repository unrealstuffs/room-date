import themes from '../themes'
import { useTypedSelector } from './useTypedSelector'

export const useTheme = () => {
	const { group } = useTypedSelector(state => state.data)

	return group?.theme ? themes[group?.theme] : themes.classic
}
