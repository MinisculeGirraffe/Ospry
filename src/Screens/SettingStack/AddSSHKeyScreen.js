import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text, TopNavigation, TopNavigationAction, Icon, Input } from '@ui-kitten/components'
import useApiLookup from '../../Hooks/UseAPILookup'
import { NavigateBackAction } from '../../Components/NavigateBackAction'
import {useInputState} from '../../Hooks/useInputState'

export const AddSSHKeyScreen = ({ navigation }) => {
    const SSHKeyName = useInputState()
    const SSHKey = useInputState()

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={props => <Icon {...props} name='plus-outline' />}
                onPress={() => navigation.navigate('AddSSHKeyScreen')}
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