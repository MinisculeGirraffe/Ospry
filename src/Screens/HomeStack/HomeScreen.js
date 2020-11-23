import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, TopNavigation, Text, List, Spinner, Divider, Avatar, TopNavigationAction, Icon } from '@ui-kitten/components';
import useApiLookup from '../../Hooks/UseAPILookup'
import ServerItem from '../../Components/ServerItem'
import { RefreshControl } from '../../Components/RefreshControl'



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
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    title={props => <Text {...props}>{api.account.name}</Text>}
                    accessoryLeft={userAvatar}
                    accessoryRight={addNewServer}
                />
                <Divider />
                <Layout style={{ flex: 1 }}>
                    <List
                        data={api.serverObj}
                        renderItem={item => <ServerItem server={api.serverObj[item.index]} index={item.index} />}
                        contentContainerStyle={{ alignItems: "stretch" }}
                        refreshControl={
                            <RefreshControl
                                refreshing={api.isRefreshing}
                                onRefresh={async () => await api.refreshServerList()}
                            />}
                    />
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
