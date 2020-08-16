import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, TopNavigation, Text, List, Spinner, } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
import ServerItem from '../Components/ServerItem'
import { RefreshControl } from '../Components/RefreshControl'

export const HomeScreen = ({ navigation }) => {
    const [lookupServers, refreshServerList, serverObj, user, isLoading, isRefreshing] = useApiLookup()
    if (isLoading == false) {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <Layout style={{ flex: 1, }}>
                    <TopNavigation
                        title={props => <Text {...props}>{user.name}</Text>}
                    />
                    <Layout style={{ display: 'flex', overflow: 'visible', flexDirection: 'column', flexGrow: 1 }}>
                        <List
                            data={Object.keys(serverObj)}
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
        )
    } else {
        return (
            <Layout>
                <Spinner />
            </Layout>
        )

    }
}
