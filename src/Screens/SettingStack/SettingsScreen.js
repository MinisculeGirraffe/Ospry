import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Input, Button, Menu, MenuItem, MenuGroup, TopNavigation, TopNavigationAction,Text,Icon} from '@ui-kitten/components';
import AuthContext from '../../Hooks/AuthContext'
import { StyleSheet } from 'react-native';
import useApiLookup from '../../Hooks/UseAPILookup'
import useMenuState from '../../Hooks/useMenuState'

export const SettingsScreen = ({ navigation }) => {
    const auth = React.useContext(AuthContext)
    const [value, setValue] = React.useState('');
    const api = useApiLookup()
    return (
            <SafeAreaView style={{ flex: 1 }}edges={['left', 'right', 'top']}>
                <TopNavigation
                    title={props => <Text  {...props}>{api.account.name}</Text>}
                    alignment="center"
                />
                <Layout style={{flex:1}}>
                    <Menu  
                    contentContainerStyle={{  }}
                    >
                        <MenuItem title="Name"></MenuItem>
                        <MenuItem title="SSH Keys"></MenuItem>
                    </Menu>
                </Layout>
            </SafeAreaView>
     
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menu: {
        flex: 1,
        margin: 8,
    },
});