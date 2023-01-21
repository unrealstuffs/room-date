import { useModal } from 'react-native-modalfy'
import { View } from 'react-native'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import Flex from '../styled/Flex.styled'
import Avatar from './Avatar'
import { useMembers } from '../../hooks/useMembers'

const HeaderGroup = () => {
	const { openModal } = useModal()
	const { user } = useTypedSelector(state => state.user)
	const { members } = useMembers()

	return (
		<Flex style={{ marginBottom: 20 }}>
			{members.map(member => (
				<View key={member.uid} style={{ marginRight: 10 }}>
					<Avatar
						size={40}
						uri={member?.photoURL}
						onPress={() => {
							openModal('MemberModal', {
								uid: member.uid,
								name: member.displayName,
								photoURL: member.photoURL,
								isCurrentUser: member.uid === user?.uid,
							})
						}}
					/>
				</View>
			))}
		</Flex>
	)
}

export default HeaderGroup
