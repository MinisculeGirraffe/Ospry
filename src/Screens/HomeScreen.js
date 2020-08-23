import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, TopNavigation, Text, List, Spinner, } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
import ServerItem from '../Components/ServerItem'
import { RefreshControl } from '../Components/RefreshControl'
import { renderRightActions } from '../Components/AddNewServer'
export const HomeScreen = ({ navigation }) => {
    const [lookupServers, refreshServerList, serverObj, user, isLoading, isRefreshing] = useApiLookup()
    const [serverKeys, setServerKeys] = useState()
    useEffect(() => {
        if (serverObj) {
            setServerKeys(Object.keys(serverObj))
        }

    }, [serverObj])

    if (isLoading == false && serverObj) {
        return (
            <Layout style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <Layout style={{ flex: 1, }}>
                        <TopNavigation
                            title={props => <Text {...props}>{user.name}</Text>}
                            accessoryRight={renderRightActions}
                        />
                        <Layout style={{ display: 'flex', overflow: 'visible', flexDirection: 'column', flexGrow: '1' }}>
                            <List
                                data={serverKeys}
                                renderItem={object => <ServerItem server={serverObj[object.item]} />}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isRefreshing}
                                        onRefresh={async () => await refreshServerList()}
                                    />}

                            />
                        </Layout>
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
