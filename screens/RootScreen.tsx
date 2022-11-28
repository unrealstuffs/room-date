import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Container from '../components/ui/Container'
import { RootStackScreenProps } from '../types'

const RootScreen = ({ navigation }: RootStackScreenProps<'Root'>) => {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], [])

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	return (
		<Container>
			<TouchableOpacity onPress={() => navigation.replace('Login')}>
				<Text>Go to login screen!</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.replace('Room')}>
				<Text>Go to room screen!</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('User')}>
				<Text>Go to user screen!</Text>
			</TouchableOpacity>

			<BottomSheetModalProvider>
				<View>
					<TouchableOpacity onPress={handlePresentModalPress}>
						<Text>Show bottom modal</Text>
					</TouchableOpacity>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={1}
						snapPoints={snapPoints}
					>
						<Container>
							<Text>Shit...</Text>
						</Container>
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</Container>
	)
}

export default RootScreen
