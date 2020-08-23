import React, { useEffect, useState } from 'react';
import { Button, Layout, Text, Card, Icon, } from '@ui-kitten/components';

export default ServerItem = ({ server }) => {
    const [serverStatus, setSetverStatus] = useState('')
    useEffect(() => {
        console.log("List Item Code Ran")
        if (server.power_status == 'running') {
            setSetverStatus('success')

        } else {
            setSetverStatus('danger')
        }
    }, [server])
    return (

        <Card status={serverStatus}>
            <Layout style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                textAlign: 'center',
                justifyContent: "space-between",
                flexGrow: '1'
            }}>
                <Text category={"h6"}>{server.label ? server.label : server.os}</Text>
                <Button
                    appearance='ghost'
                    accessoryRight={props => <Icon {...props} name='power' />}
                    status={serverStatus}
                />
            </Layout>
            <Layout style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                textAlign: 'center',
                flexGrow: '1',
                justifyContent: "space-between"
            }}>
                <Text category='c1'>{server.location} - {server.ram}</Text>
        <Text category='c1'> {server.main_ip}</Text>
            </Layout>

        </Card>
    )
}