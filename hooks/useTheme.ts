import themes from '../themes'
import { useGroup } from './useGroup'
import { useTypedSelector } from './useTypedSelector'

export const useTheme = () => {
	const { group } = useGroup()
	const { groupId } = useTypedSelector(state => state.group)

	return group?.theme && groupId ? themes[group?.theme] : themes.classic
}
