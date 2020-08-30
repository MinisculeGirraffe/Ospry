import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, TopNavigation, Text, List, Spinner, Divider, Avatar, TopNavigationAction, Icon } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
import ServerItem from '../Components/ServerItem'
import { RefreshControl } from '../Components/RefreshControl'

export const HomeScreen = ({ navigation }) => {
    const api = useApiLookup()
    const userAvatar = () => {
        return (
            <TopNavigationAction
                icon={(props) => <Icon {...props} name='person' />}
            />
        )
    }

    const addNewServer = () => {
        return (
            <TopNavigationAction
                icon={(props) => <Icon {...props} name='plus-outline' />}
                onPress={() => navigation.navigate('Add')}
            />
        )
    }
    if (api.isLoading == false && api.serverObj !== null) {
        return (
            <Layout style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <Layout style={{ flex: 1, }}>
                        <TopNavigation
                            title={props => <Text {...props}>{api.user.name}</Text>}
                            accessoryLeft={userAvatar}
                            accessoryRight={addNewServer}
                        />
                        <Divider />
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
