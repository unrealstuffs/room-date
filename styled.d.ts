import 'styled-components/native'

import { Theme } from './themes/types'

declare module 'styled-components/native' {
	export interface DefaultTheme extends Theme {}
}
