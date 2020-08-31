import React, { useEffect, useState } from 'react'
import { Layout, Text, TopNavigation, TopNavigationAction, Spinner, Divider, OverflowMenu, MenuItem, Icon, DrawerGroup, Drawer, DrawerItem, useTheme, CheckBox } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native'
import useApiLookup from '../Hooks/UseAPILookup'
import * as Progress from 'react-native-progress';

export const ServerDetails = ({ route, navigation }) => {
    const { serverIndex } = route.params
    const api = useApiLookup()

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [autoBackup, SetAutoBackup] = React.useState(false);
    const progressBar = () => {
        const theme = useTheme()
        return (
            <Progress.Bar
                style={{ flex: 1 }}
                borderRadius={2}
                height={15}
                progress={api.serverObj[serverIndex].normalizedBandwidth}
                color={theme['color-primary-default']}
                unfilledColor={theme['color-basic-200']}
            />
        )
    }
    const overFlow = () => {
        return (
            <OverflowMenu
                anchor={rightMenu}
                visible={visible}
                onBackdropPress={() => setVisible(false)}
            >
                <MenuItem title="Stop Server" />
                <MenuItem title="Restart Server" />
                <MenuItem title="Reinstall Server" />
                <MenuItem title="Server Destroy" />
            </OverflowMenu>
        )
    }
    const goBack = () => (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )

    const rightMenu = () => {
        return (
            <TopNavigationAction
                icon={props => <Icon {...props} name="more-vertical-outline" />}
                onPress={() => setVisible(true)}
            />
        )
    }

    const autoBackupToggle = () => {
        if (autoBackup == true) {
            SetAutoBackup(false)
            api.disableBackup(api.serverObj[serverIndex].SUBID)
        } else {
            SetAutoBackup(true)
            api.enableBackup(api.serverObj[serverIndex].SUBID)
        }
    }


    if (api.serverObj[serverIndex]) {

        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    title={props => <Text  {...props}>{api.serverObj[serverIndex].label}</Text>}
                    subtitle={props => <Text {...props}>{api.serverObj[serverIndex].power_status}</Text>}
                    accessoryLeft={goBack}
                    accessoryRight={overFlow}
                    alignment="center"
                />
                <Divider />
                <Layout style={{ flex: 1 }}>
                    <ScrollView>
                        <Drawer>
                            <DrawerGroup title="Overview" accessoryLeft={(props) => <Icon {...props} name='monitor-outline' />}>
                                <DrawerItem title="CPU" accessoryRight={() => <Text>{api.serverObj[serverIndex].vcpu_count}</Text>} />
                                <DrawerItem title="Memory" accessoryRight={() => <Text>{api.serverObj[serverIndex].ram}</Text>} />
                                <DrawerItem title="Storage" accessoryRight={() => <Text>{api.serverObj[serverIndex].disk}</Text>} />
                                <DrawerItem title="OS" accessoryRight={() => <Text>{api.serverObj[serverIndex].os}</Text>} />
                                <DrawerItem title="Location" accessoryRight={() => <Text>{api.serverObj[serverIndex].location}</Text>} />

                            </DrawerGroup>
                            <DrawerGroup title="Network" accessoryLeft={(props) => <Icon {...props} name='globe-outline' />}>
                                <DrawerItem title="Main IPv4" accessoryRight={() => <Text selectable={true} >{api.serverObj[serverIndex].main_ip}</Text>} />
                                <DrawerItem title="Internal IPv4" accessoryRight={() => <Text selectable={true}>{api.serverObj[serverIndex].internal_ip}</Text>} />
                                <DrawerItem title="Gateway IPv4" accessoryRight={() => <Text selectable={true}>{api.serverObj[serverIndex].gateway_v4}</Text>} />
                                <DrawerItem title="Main IPv6" accessoryRight={() => <Text selectable={true}>{api.serverObj[serverIndex].v6_main_ip}</Text>} />
                                <DrawerItem title="Subnet IPv6" accessoryRight={() => <Text selectable={true}>{api.serverObj[serverIndex].v6_network}/{api.serverObj[serverIndex].v6_network_size}</Text>} />
                            </DrawerGroup>
                            <DrawerGroup title="Storage" accessoryLeft={(props) => <Icon {...props} name='hard-drive-outline' />}>
                                <DrawerGroup title="Block Storage">


                                </DrawerGroup>
                                <DrawerGroup title="Object Storage"></DrawerGroup>
                            </DrawerGroup>

                            <DrawerGroup title="Usage" accessoryLeft={(props) => <Icon {...props} name='trending-up-outline' />}>
                                <DrawerItem title="Bandwidth" accessoryRight={() => <Text>{api.serverObj[serverIndex].current_bandwidth_gb} GB</Text>} />
                                <DrawerItem accessoryRight={progressBar} />
                                <DrawerItem title="Charges" accessoryRight={() => <Text>$ {api.serverObj[serverIndex].pending_charges}</Text>} />
                            </DrawerGroup>
                            <DrawerGroup title="Snapshots" accessoryLeft={(props) => <Icon {...props} name='camera-outline' />} >

                            </DrawerGroup>
                            <DrawerGroup title="Backups" accessoryLeft={(props) => <Icon {...props} name='save-outline' />}>
                                <DrawerItem title="Auto Backup" accessoryRight={() => <CheckBox checked={api.serverObj[serverIndex].auto_backups} />} />
                            </DrawerGroup>
                            <DrawerGroup title='Settings' accessoryLeft={(props) => <Icon {...props} name='settings-2-outline' />}>
                            </DrawerGroup>

                        </Drawer>
                    </ScrollView>

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