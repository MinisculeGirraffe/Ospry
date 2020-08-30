import React, { useEffect, useState } from 'react'
import { Layout, Text, TopNavigation, TopNavigationAction, Spinner, Divider, OverflowMenu, MenuItem, Button, Icon } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import useApiLookup from '../Hooks/UseAPILookup'


export const ServerDetails = ({ route, navigation }) => {
    const { serverIndex } = route.params
    const api = useApiLookup()

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);


    const overFlow = () => {
        return (
            <OverflowMenu
                anchor={rightMenu}
                visible={visible}
                onBackdropPress={() => setVisible(false)}
            >
                <MenuItem title="Stop Server" />
                <MenuItem title="Restart Server" />
                <MenuItem title="Reinstall Server" />
                <MenuItem title="Server Destroy" />
            </OverflowMenu>
        )
    }

    const rightMenu = () => {
        return (
            <TopNavigationAction
                icon={props => <Icon {...props} name="more-vertical-outline" />}
                onPress={() => setVisible(true)}
            />
        )
    }

    if (api.serverObj[serverIndex]) {
        return (
            <Layout style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Layout style={{ flex: 1, alignItems: 'center' }}>
                        <TopNavigation
                            title={props => <Text {...props}>{api.serverObj[serverIndex].label}</Text>}
                            accessoryRight={overFlow}
                        />

                        <Divider />
                        <Text>{api.serverObj[serverIndex].os}</Text>

                    </Layout>
                </SafeAreaView>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <Spinner />
            </Layout>
        )

    }
}