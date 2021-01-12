import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Menu, MenuGroup, MenuItem, Text, TopNavigation, CheckBox, TopNavigationAction, Icon } from '@ui-kitten/components'
import useApiLookup from '../../Hooks/UseAPILookup'
import { NavigateBackAction } from '../../Components/NavigateBackAction'

export const SshKeyScreen = ({ navigation }) => {

    const api = useApiLookup()
    const [edit, setEdit] = React.useState(false)


    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={props => <Icon {...props} name='edit-outline' />}
                onPress={() => setEdit(!edit)}
            />
            {edit == true ?
                <TopNavigationAction
                    icon={props => <Icon {...props} name='trash-2-outline' />}
                />
                :
                <TopNavigationAction
                    icon={props => <Icon {...props} name='plus-outline'/>}
                    onPress={() => navigation.navigate('AddSSHKeyScreen')}
                />
            }
        </React.Fragment>
    )


    if (api.sshKeys) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
                <TopNavigation
                    title={props => <Text  {...props}>SSH Keys</Text>}
                    alignment="center"
                    accessoryLeft={props => <NavigateBackAction {...props} />}
                    accessoryRight={renderRightActions}
                />
                <Layout style={{ flex: 1 }}>
                    <Menu>
                        {api.sshKeys.map(sshKey => (
                            <MenuGroup title={sshKey.name} key={sshKey.name}
                                accessoryLeft={edit ? () => <CheckBox /> : null}
                            >
                                <MenuItem title={'Date Added:'} accessoryRight={() => <Text selectable={true} >{sshKey.date_created}</Text>} />
                                <MenuItem accessoryRight={() => <Text selectable={true} >{sshKey.ssh_key}</Text>}
                                />
                            </MenuGroup>
                        )
                        )}
                    </Menu>
                </Layout>

            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
                <Layout style={{ flex: 1 }}>

                </Layout>

            </SafeAreaView>
        )
    }


}