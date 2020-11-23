import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Menu, MenuGroup, MenuItem, Text, TopNavigation } from '@ui-kitten/components'
import useApiLookup from '../../Hooks/UseAPILookup'




export const SshKeyScreen = ({ navigation }) => {

    const api = useApiLookup()
    React.useEffect(() => {
        console.log(api.sshKeys)
    }, [])
    if (api.sshKeys) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
                <TopNavigation
                    title={props => <Text  {...props}>SSH Keys</Text>}
                    alignment="center"
                />
                <Layout style={{ flex: 1 }}>
                    <Menu>
                        {api.sshKeys.map(sshKey => (
                            <MenuGroup title={sshKey.name}>
                                <MenuItem title={'Date Added:'} accessoryRight={() => <Text selectable={true} >{sshKey.date_created}</Text>}  />
                                <MenuItem accessoryRight={() => <Text selectable={true} >{sshKey.ssh_key}</Text>} />
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