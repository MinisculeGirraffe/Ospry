import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, Layout, TopNavigation, Text, List, ListItem, Spinner, Card } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'
export const HomeScreen = ({ navigation }) => {
    const [lookupServers, serverObj, user, isLoading] = useApiLookup()

    const renderServerHeader = (props, item) => {
        return (
            <Layout {...props}>
                <Text category={"label"}>{serverObj[item].os}</Text>
            </Layout>
        )

    }
    const renderServerList = ({ item, index }) => {
        return (
            <Card header={props => renderServerHeader(props, item)}>

                <Text> {serverObj[item].location}</Text>
            </Card>
        )
    }
    if (isLoading == false) {
        return (
            <SafeAreaView style={{ flex: 1, }}>

                <Layout style={{ flex: 1, }}>
                    <Text>{user.name}</Text>
                    <Layout style={{}}>
                        <List
                            data={Object.keys(serverObj)}
                            renderItem={renderServerList}
                            ItemSeparatorComponent={Divider}

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