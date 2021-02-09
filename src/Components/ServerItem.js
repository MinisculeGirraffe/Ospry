import React, { useEffect, useState } from 'react';
import { Button, Layout, Text, Card, Icon, } from '@ui-kitten/components';
import { Alert, StyleSheet } from 'react-native';
import useApiLookup from '../Hooks/UseAPILookup'
import { useNavigation } from '@react-navigation/native';
import useAppFunction from "../Hooks/useAppFunction"


export default ServerItem = ({ server, index }) => {
    const [serverStatus, setSetverStatus] = useState('')
    const api = useApiLookup()
    const appFunction = useAppFunction()
    const navigation = useNavigation()
    useEffect(() => {
        if (server.power_status == 'running') {
            setSetverStatus('success')

        } else {
            setSetverStatus('danger')
        }
    }, [server])
    const toggleState = () => {
        if (server.power_status == 'running') {
            Alert.alert(
                "Warning",
                "Are you sure you want to shutdown",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => api.stopServer(server.SUBID) }
                ], {
                cancelable: false
            }
            )
        } else {
            Alert.alert(
                "Warning",
                "Are you sure you want to start",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => api.startServer(server.SUBID) }
                ], {
                cancelable: false
            }
            )
        }
    }

    const nagivateServer = () => {

        navigation.navigate("Details", {
            serverIndex: index
        })


    }

    return (
        <Card status={serverStatus} onPress={() => nagivateServer()}>
            <Layout style={styles.container}>
                <Text category={"h6"}>{server.label}</Text>
                <Button
                    appearance='ghost'
                    accessoryRight={props => <Icon {...props} name='power' />}
                    status={serverStatus}
                    onPress={() => toggleState()}
                />
            </Layout>
            <Layout style={styles.container}>
                <Text category='c1'>{server.region.toUpperCase()} - {server.ram} MB</Text>
                <Text onPress={() => appFunction.openLink('ssh://' + server.main_ip)} status={'info'} category='s1'> {server.main_ip}</Text>
            </Layout>

        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        textAlign: 'center',
        flexGrow: 1,
        justifyContent: "space-between"
    }
})