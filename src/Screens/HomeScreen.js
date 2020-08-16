import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, Layout, TopNavigation, Text, List, ListItem, Spinner, Card, Icon, } from '@ui-kitten/components';
import useApiLookup from '../Hooks/UseAPILookup'

export const HomeScreen = ({ navigation }) => {

    const [lookupServers, serverObj, user, isLoading] = useApiLookup()

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

const ServerItem = ({ server }) => {
    const [serverStatus, setSetverStatus] = useState('')
    useEffect(() => {
        if (server.power_status == 'running') {
            setSetverStatus('success')
        } else {
            setSetverStatus('danger')
        }
    }, server)
    return (
        <Card status={serverStatus}>
            <Layout style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                textAlign: 'center',
                justifyContent: "space-between"
            }}>
                <Text category={"label"}>{server.os}</Text>
                <Button
                    appearance='ghost'
                    accessoryRight={props => <Icon {...props} name='power' />}
                    status={serverStatus}
                />
            </Layout>
        </Card>
    )
}