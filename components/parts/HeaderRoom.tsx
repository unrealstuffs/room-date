import { View } from 'react-native'
import { useModal } from 'react-native-modalfy'

import Avatar from './Avatar'

import Flex from '../styled/Flex.styled'
import { members } from '../../constants/Data'

const HeaderRoom = () => {
	const { openModal } = useModal()
	return (
		<Flex style={{ marginBottom: 20 }}>
			{members.map(member => (
				<View key={member.id} style={{ marginRight: 10 }}>
					<Avatar
						size={40}
						uri={member?.photoURL}
						onPress={() =>
							openModal('MemberModal', {
								name: member.name,
								photoURL: member.photoURL,
							})
						}
					/>
				</View>
			))}
		</Flex>
	)
}

export default HeaderRoom
