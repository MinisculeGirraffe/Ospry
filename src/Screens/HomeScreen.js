import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, Layout, TopNavigation, Text, List, ListItem } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
export const HomeScreen = ({ navigation }) => {
    const [serverObj, lookupServers, user] = useApiLookup()

    const renderServerList = ({item, index}) => {
        return (
            <ListItem
                title={index}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{user.name}</Text>
                <List
                    data={Object.keys(serverObj)}
                    renderItem={renderServerList}
                />
            </Layout>
        </SafeAreaView>
    )
}