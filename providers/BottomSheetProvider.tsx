import React, {
	useCallback,
	useRef,
	useMemo,
	forwardRef,
	ComponentType,
	useLayoutEffect,
} from 'react'
import {
	View,
	StyleSheet,
	Button,
	Text,
	SafeAreaView,
	Pressable,
} from 'react-native'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
	useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { StyledButton } from '../components/styled/Button.styled'
import StyledText from '../components/styled/Text.styled'

interface IBottomSheet {
	title: string
	name: string
	onPress: () => void
}

export const withModalProvider = (Component: ComponentType) => () =>
	(
		<BottomSheetModalProvider>
			<Component />
		</BottomSheetModalProvider>
	)

const SheetContent = ({
	title,
	onPress,
}: {
	title: string
	onPress: () => void
}) => (
	<View
		style={{
			paddingVertical: 20,
			paddingHorizontal: 30,
			backgroundColor: 'pink',
		}}
	>
		<Text>{title}</Text>
		<Button title='Next' onPress={onPress} />
	</View>
)
const SheetA = forwardRef<BottomSheet, IBottomSheet>(
	(
		{
			title,
			name,
			onPress,
		}: { title: string; name: string; onPress: () => void },
		ref: any
	) => {
		const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
		const {
			animatedHandleHeight,
			animatedSnapPoints,
			animatedContentHeight,
			handleContentLayout,
		} = useBottomSheetDynamicSnapPoints(snapPoints)
		return (
			<BottomSheetModal
				ref={ref}
				key={name}
				name={name}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				handleComponent={null}
				enableDismissOnClose={false}
				enablePanDownToClose={false}
				snapPoints={animatedSnapPoints}
			>
				<BottomSheetView onLayout={handleContentLayout}>
					<SheetContent {...{ title, onPress }} />
				</BottomSheetView>
			</BottomSheetModal>
		)
	}
)

const SheetB = forwardRef<BottomSheet, IBottomSheet>(
	({ title, name, onPress }, ref: any) => {
		const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
		const {
			animatedHandleHeight,
			animatedSnapPoints,
			animatedContentHeight,
			handleContentLayout,
		} = useBottomSheetDynamicSnapPoints(snapPoints)
		return (
			<BottomSheetModal
				ref={ref}
				key={name}
				name={name}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				handleComponent={null}
				enableDismissOnClose={false}
				enablePanDownToClose={false}
				snapPoints={animatedSnapPoints}
			>
				<BottomSheetView onLayout={handleContentLayout}>
					<SheetContent {...{ title, onPress }} />
				</BottomSheetView>
			</BottomSheetModal>
		)
	}
)

const SheetC = forwardRef(
	(
		{
			title,
			name,
			onPress,
		}: { title: string; name: string; onPress: () => void },
		ref: any
	) => {
		const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
		const {
			animatedHandleHeight,
			animatedSnapPoints,
			animatedContentHeight,
			handleContentLayout,
		} = useBottomSheetDynamicSnapPoints(snapPoints)
		return (
			<BottomSheetModal
				ref={ref}
				key={name}
				name={name}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				handleComponent={null}
				enableDismissOnClose={false}
				enablePanDownToClose={false}
				snapPoints={animatedSnapPoints}
			>
				<BottomSheetView onLayout={handleContentLayout}>
					<SheetContent {...{ title, onPress }} />
				</BottomSheetView>
			</BottomSheetModal>
		)
	}
)

const SheetD = forwardRef<BottomSheetModal, IBottomSheet>((props, ref) => {
	const { title, onPress } = props
	const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
	const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout,
	} = useBottomSheetDynamicSnapPoints(snapPoints)
	return (
		<BottomSheetModal
			ref={ref}
			key={props.name}
			name={props.name}
			handleHeight={animatedHandleHeight}
			contentHeight={animatedContentHeight}
			handleComponent={null}
			enableDismissOnClose={false}
			enablePanDownToClose={false}
			snapPoints={animatedSnapPoints}
		>
			<BottomSheetView onLayout={handleContentLayout}>
				<SheetContent {...{ title, onPress }} />
			</BottomSheetView>
		</BottomSheetModal>
	)
})

const Test = () => {
	const sheetARef = useRef<BottomSheetModal>(null)
	const sheetBRef = useRef<BottomSheetModal>(null)
	const sheetCRef = useRef<BottomSheetModal>(null)
	const sheetDRef = useRef<BottomSheetModal>(null)

	useLayoutEffect(() => {
		requestAnimationFrame(() => sheetARef.current?.present())
	}, [])

	const sheetAPress = useCallback(() => {
		// sheetARef.current?.dismiss()
		sheetBRef.current?.present()
	}, [])
	const sheetBPress = useCallback(() => {
		sheetBRef.current?.dismiss()
		sheetCRef.current?.present()
	}, [])
	const sheetCPress = useCallback(() => {
		sheetCRef.current?.dismiss()
		sheetDRef.current?.present()
	}, [])
	const sheetDPress = useCallback(() => {
		sheetDRef.current?.dismiss()
		sheetARef.current?.present()
	}, [])

	return (
		<View style={styles.container}>
			<StyledButton onPress={sheetAPress}>
				<StyledText>Click</StyledText>
			</StyledButton>
			<SheetA
				ref={sheetARef}
				onPress={sheetAPress}
				title='Sheet A'
				name='sheetA'
			/>
			<SheetB
				ref={sheetBRef}
				onPress={sheetBPress}
				title='Sheet B'
				name='sheetB'
			/>
			<SheetC
				ref={sheetCRef}
				onPress={sheetCPress}
				title='Sheet C'
				name='sheetC'
			/>
			<SheetD
				ref={sheetDRef}
				onPress={sheetDPress}
				title='Sheet D'
				name='sheetD'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
	},
	scrollView: {
		flex: 1,
	},
	scrollViewContentContainer: {
		paddingHorizontal: 16,
	},
})

export default withModalProvider(Test)
