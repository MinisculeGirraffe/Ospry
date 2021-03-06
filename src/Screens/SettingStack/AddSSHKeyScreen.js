import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text, TopNavigation, TopNavigationAction, Icon, Input } from '@ui-kitten/components'
import { NavigateBackAction } from '../../Components/NavigateBackAction'
import {useInputState} from '../../Hooks/useInputState'
import UseAPILookup from '../../Hooks/UseAPILookup';


export const AddSSHKeyScreen = ({ navigation }) => {
    const api = UseAPILookup()
    const SSHKeyName = useInputState()
    const SSHKey = useInputState()
    const [allowedSubmit,setAllowedSubmit] = React.useState()
     React.useEffect(() => {
       let falsyLength = [SSHKey.value,SSHKeyName.value].filter(i => i)
       falsyLength.length == 2 ? setAllowedSubmit(true) : setAllowedSubmit(false)
    },[SSHKey.value,SSHKeyName.value])

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                disabled={!allowedSubmit}
                icon={props => <Icon  {...props} name='plus-outline' />}
                onPress={async () => {
                    await api.addSSHKey(SSHKeyName.value,SSHKey.value)
                    navigation.goBack()
                }}
            />
        </React.Fragment>
    )
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    title={props => <Text {...props}>Add SSH Key</Text>}
                    alignment="center"
                    accessoryLeft={props => <NavigateBackAction {...props} />}
                    accessoryRight={renderRightActions}
                />
                <Input
                    placeholder='Key Name'
                    value={SSHKeyName}
                    {...SSHKeyName}
                />

                <Input
                    placeholder='SSH Key'
                    multiline={true}
                    textStyle={{ minHeight: 64 }}
                    value={SSHKey}
                    {...SSHKey}
                />


            </Layout>
        </SafeAreaView>
    )
}