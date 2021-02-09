import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Menu, MenuGroup, MenuItem, Text, CheckBox, TopNavigationAction, Icon, TopNavigation } from '@ui-kitten/components'
import useApiLookup from '../../Hooks/UseAPILookup'
import { NavigateBackAction } from '../../Components/NavigateBackAction'
import { useMenuState } from '../../Hooks/useMenuState';
import { useCheckboxState } from '../../Hooks/useCheckBoxState'


export const SshKeyScreen = ({ navigation }) => {
    const [boxState, setBoxState] = React.useState({})
    const api = useApiLookup()
    const [edit, setEdit] = React.useState(false)

    React.useEffect(() => {
        if (api.sshKeys) {
            console.log(api.sshKeys)
            let stateObj = {}
            api.sshKeys.map(key => stateObj[key.id] = false)
            setBoxState(stateObj)
        }

    }, [api.sshKeys])
    const RightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={props => <Icon {...props} name='edit-outline' />}
                onPress={() => setEdit(!edit)}
            />
            {edit == true ?
                <TopNavigationAction
                    icon={props => <Icon {...props} name='trash-2-outline' />}
                    onPress={() => {

                    }}
                />
                :
                <TopNavigationAction
                    icon={props => <Icon {...props} name='plus-outline' />}
                    onPress={() => navigation.navigate('AddSSHKeyScreen')}
                />
            }
        </React.Fragment>
    )

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
            <TopNavigation
                title={props => <Text {...props}>SSH Keys</Text>}
                alignment="center"
                accessoryLeft={props => <NavigateBackAction {...props} />}
                accessoryRight={props => <RightActions {...props} />}
            />
            {api.sshKeys ?
                <Layout style={{ flex: 1 }}>
                    <Menu>
                        {api.sshKeys.map(sshKey => (
                            <MenuGroup title={sshKey.name} key={sshKey.name}
                                accessoryLeft={edit ?
                                    () => {
                                        return (
                                            <CheckBox
                                                checked={boxState[sshKey.id]}
                                                onChange={state => {
                                                    setBoxState(prev => ({...prev,[sshKey.id]: state}))
                                                }}
                                            />
                                        )
                                    }
                                    : null}
                            >
                                <MenuItem
                                    title={'Date Added:'}
                                    accessoryRight={() => <Text selectable={true} >
                                        {new Intl.DateTimeFormat('en').format(new Date(sshKey.date_created))}
                                    </Text>}
                                />
                                <MenuItem
                                    accessoryRight={() => <Text selectable={true} >{sshKey.ssh_key}</Text>}
                                />
                            </MenuGroup>
                        )
                        )}
                    </Menu>
                </Layout>
                : null}
        </SafeAreaView>
    )
}