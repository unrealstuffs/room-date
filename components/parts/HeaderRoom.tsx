import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from './Avatar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useModal } from 'react-native-modalfy'

const HeaderRoom = () => {
	const { user } = useTypedSelector(state => state.user)
	const { openModal } = useModal()
	return (
		<View style={styles.members}>
			<View style={styles.member}>
				<Avatar
					size={40}
					uri={user?.photoURL}
					onPress={() => openModal('MemberModal')}
				/>
			</View>
			<View style={styles.member}>
				<Avatar
					size={40}
					uri={user?.photoURL}
					onPress={() => openModal('MemberModal')}
				/>
			</View>
			<View style={styles.member}>
				<Avatar
					size={40}
					uri={user?.photoURL}
					onPress={() => openModal('MemberModal')}
				/>
			</View>
			<View style={styles.member}>
				<Avatar
					size={40}
					uri={user?.photoURL}
					onPress={() => openModal('MemberModal')}
				/>
			</View>
		</View>
	)
}

export default HeaderRoom

const styles = StyleSheet.create({
	members: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	member: {
		marginRight: 10,
	},
})
