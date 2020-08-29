import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, TopNavigation, Text, List, Spinner, } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
import ServerItem from '../Components/ServerItem'
import { RefreshControl } from '../Components/RefreshControl'
import { renderRightActions } from '../Components/AddNewServer'
export const HomeScreen = ({ navigation }) => {
    const api = useApiLookup()

    if (api.isLoading == false && api.serverObj !== null) {
        return (
            <Layout style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <Layout style={{ flex: 1, }}>
                        <TopNavigation
                            title={props => <Text {...props}>{api.user.name}</Text>}
                            accessoryRight={renderRightActions}
                        />
                        <Layout style={{ display: 'flex', overflow: 'visible', flexDirection: 'column', flexGrow: '1' }}>
                            <List
                                data={api.serverObj}
                                renderItem={item => <ServerItem server={api.serverObj[item.index]} index={item.index} />}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={api.isRefreshing}
                                        onRefresh={async () => await api.refreshServerList()}
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
