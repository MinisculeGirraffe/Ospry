import React, { useEffect, useState } from 'react';
import { Button, Divider, Layout, TopNavigation, Text, List, ListItem, Spinner, Card, Icon, } from '@ui-kitten/components';

export default ServerItem = ({ server }) => {
    const [serverStatus, setSetverStatus] = useState('')
    useEffect(() => {
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