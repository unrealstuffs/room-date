import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import Flex from '../styled/Flex.styled'

const HeaderRoom = () => {
	const { openModal } = useModal()
	const { rooms } = useTypedSelector(state => state.data)

	return (
		<Flex style={{ marginBottom: 20 }}>
			{/* {members.map(member => (
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
			))} */}
		</Flex>
	)
}

export default HeaderRoom
