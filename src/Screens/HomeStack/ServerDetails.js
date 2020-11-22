import React, { useEffect, useState } from 'react'
import { Layout, Text, TopNavigation, TopNavigationAction, Spinner, Divider, OverflowMenu, MenuItem, Icon, DrawerGroup, Drawer, DrawerItem, useTheme, CheckBox, Button } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet } from 'react-native'
import useApiLookup from '../../Hooks/UseAPILookup'
import * as Progress from 'react-native-progress';
import useAppFunction from "../../Hooks/useAppFunction"

export const ServerDetails = ({ route, navigation }) => {
    const { serverIndex } = route.params
    const api = useApiLookup()
    const appFunction = useAppFunction()
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [autoBackup, SetAutoBackup] = React.useState(false);
    const [currentServer, setCurrentServer] = React.useState()

    React.useEffect((() => {
        setCurrentServer(api.serverObj[serverIndex])
        console.log(currentServer)
    }), [api.serverObj])

    const progressBar = () => {
        const theme = useTheme()
        return (
            <Layout style={{ flex: 1 }}>
                <Layout style={styles.subContainer}>
                    <Text>{currentServer.current_bandwidth_gb} GB</Text>
                    <Text>{currentServer.allowed_bandwidth_gb} GB</Text>

                </Layout>
                <Layout style={styles.subContainer}>
                    <Progress.Bar
                        style={{ flex: 1 }}
                        borderRadius={2}
                        height={15}
                        progress={currentServer.normalizedBandwidth}
                        color={theme['color-primary-default']}
                        unfilledColor={theme['color-basic-200']}
                    />
                </Layout>

            </Layout>

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
            api.disableBackup(currentServer.SUBID)
        } else {
            SetAutoBackup(true)
            api.enableBackup(currentServer.SUBID)
        }
    }


    if (currentServer) {

        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    title={props => <Text  {...props}>{currentServer.label}</Text>}
                    subtitle={props => <Text {...props}>{currentServer.power_status}</Text>}
                    accessoryLeft={goBack}
                    accessoryRight={overFlow}
                    alignment="center"
                />
                <Divider />
                <Layout style={{ flex: 1 }}>
                    <ScrollView>
                        <Drawer>
                            <DrawerGroup title="Overview" accessoryLeft={(props) => <Icon {...props} name='monitor-outline' />}>
                                <DrawerItem title="Label" accessoryRight={() => <Text>{currentServer.label}</Text>} />
                                <DrawerItem title="CPU" accessoryRight={() => <Text>{currentServer.vcpu_count}</Text>} />
                                <DrawerItem title="Memory" accessoryRight={() => <Text>{currentServer.ram}</Text>} />
                                <DrawerItem title="Storage" accessoryRight={() => <Text>{currentServer.disk}</Text>} />
                                <DrawerItem title="OS" accessoryRight={() => <Text>{currentServer.os}</Text>} />
                                <DrawerItem title="Location" accessoryRight={() => <Text>{currentServer.location}</Text>} />
                                <DrawerItem title="Username" accessoryRight={() => <Text>root</Text>} />
                                <DrawerItem title="Password" accessoryRight={() => <Text>{currentServer.default_password}</Text>} />
                                <DrawerItem title="KVM" accessoryRight={() => <Text onPress={() => appFunction.openLink(currentServer.kvm_url)} status={'info'}>link</Text>} />
                                <DrawerItem title="SSH" accessoryRight={() => <Text onPress={() => appFunction.openLink('ssh://' + currentServer.main_ip)} status={'info'}>{currentServer.main_ip}</Text>} />


                            </DrawerGroup>
                            <DrawerGroup title="Network" accessoryLeft={(props) => <Icon {...props} name='globe-outline' />}>
                                <DrawerItem title="Main IPv4" accessoryRight={() => <Text selectable={true} >{currentServer.main_ip}</Text>} />
                                <DrawerItem title="Internal IPv4" accessoryRight={() => <Text selectable={true}>{currentServer.internal_ip}</Text>} />
                                <DrawerItem title="Gateway IPv4" accessoryRight={() => <Text selectable={true}>{currentServer.gateway_v4}</Text>} />
                                <DrawerItem title="Enable IPv6" accessoryRight={() => <CheckBox checked={currentServer.auto_backups} />} />
                                <DrawerItem title="Main IPv6" accessoryRight={() => <Text selectable={true}>{currentServer.v6_main_ip}</Text>} />
                                <DrawerItem title="Subnet IPv6" accessoryRight={() => <Text selectable={true}>{currentServer.v6_network}/{currentServer.v6_network_size}</Text>} />
                            </DrawerGroup>

                            <DrawerGroup title="Usage" accessoryLeft={(props) => <Icon {...props} name='trending-up-outline' />}>
                                <DrawerItem title="Bandwidth:" />
                                <DrawerItem activeOpacity={1.0} accessoryRight={progressBar} />
                                <DrawerItem title="Charges" accessoryRight={() => <Text>$ {currentServer.pending_charges}</Text>} />
                            </DrawerGroup>
                            <DrawerGroup title="Snapshots" accessoryLeft={(props) => <Icon {...props} name='camera-outline' />} >
                                <DrawerItem title="Create Snapshot" accessoryRight={() => <Button>Create</Button>} />
                                <DrawerItem title="Restore Snapshot" accessoryRight={() => <Button>Restore</Button>} />
                            </DrawerGroup>
                            <DrawerGroup title="Backups" accessoryLeft={(props) => <Icon {...props} name='save-outline' />}>
                                <DrawerItem title="Auto Backup" accessoryRight={() => <CheckBox checked={currentServer.auto_backups} />} />
                                <DrawerItem title="Restore Snapshot" accessoryRight={() => <Button>Restore</Button>} />
                                <DrawerItem title="Backup Schedule" accessoryRight={() => <Button>Restore</Button>} />
                            </DrawerGroup>
                            <DrawerGroup title='Settings' accessoryLeft={(props) => <Icon {...props} name='settings-2-outline' />}>
                                <DrawerItem title="OS Change" accessoryRight={() => <CheckBox checked={currentServer.auto_backups} />} />
                                <DrawerItem title="App Change" accessoryRight={() => <CheckBox checked={currentServer.auto_backups} />} />
                                <DrawerItem title="Re-install OS" accessoryRight={() => <Button>Re-install</Button>} />
                                <DrawerItem title="Upgrade Plan" accessoryRight={() => <Button>Re-install</Button>} />
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

const styles = StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: "space-between",
        flexGrow: 1
    },
    menu: {
        flex: 1,
        margin: 8,
    },
});