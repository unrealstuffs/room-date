import React, { useState, useEffect } from 'react'
import {
	View,
	StyleSheet,
	ActivityIndicator,
	DeviceEventEmitter,
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useTheme } from '../hooks/useTheme'
import StyledText from '../components/styled/Text.styled'
import { AntDesign } from '@expo/vector-icons'
import {
	StyledAction,
	StyledActions,
} from '../components/styled/Actions.styled'
import { useNavigation } from '@react-navigation/native'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const ScannerScreen = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null)
	const [scanned, setScanned] = useState(false)
	const theme = useTheme()
	const navigation = useNavigation()
	const { setQRData } = useActions()

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getBarCodeScannerPermissions()
	}, [])

	const handleBarCodeScanned = ({ data }: { data: string }) => {
		setScanned(true)
		setQRData(data)
		navigation.navigate('Root')
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: theme.colors.background,
				position: 'relative',
			}}
		>
			{hasPermission === null && (
				<ActivityIndicator color={theme.colors.primary} size={50} />
			)}
			{hasPermission === false && (
				<StyledText>No access to camera</StyledText>
			)}
			{hasPermission && (
				<>
					<BarCodeScanner
						onBarCodeScanned={
							scanned ? undefined : handleBarCodeScanned
						}
						style={StyleSheet.absoluteFillObject}
					/>
					<View
						style={{
							position: 'absolute',
							top: '5%',
							backgroundColor: theme.colors.secondary,
							padding: 10,
							borderRadius: 8,
						}}
					>
						<StyledText>Отсканируйте QR код приглашения</StyledText>
					</View>
					<StyledActions>
						<StyledAction
							backgroundColor={theme.colors.primary}
							onPress={() => navigation.navigate('Root')}
						>
							<AntDesign
								name='close'
								size={23}
								color={theme.colors.light}
							/>
						</StyledAction>
					</StyledActions>
				</>
			)}
		</View>
	)
}

export default ScannerScreen
