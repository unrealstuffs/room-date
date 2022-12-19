import { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { useTypedSelector } from '../hooks/useTypedSelector'

const ThemeConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { theme } = useTypedSelector(state => state.theme)

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeConfigProvider
