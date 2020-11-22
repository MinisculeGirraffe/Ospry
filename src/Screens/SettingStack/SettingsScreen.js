import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Input, Button, Menu, MenuItem, MenuGroup, TopNavigation, TopNavigationAction,Text,Icon} from '@ui-kitten/components';
import AuthContext from '../../Hooks/AuthContext'
import { StyleSheet } from 'react-native';
import useApiLookup from '../../Hooks/UseAPILookup'
import useMenuState from '../../Hooks/useMenuState'

const goBack = () => (
    <TopNavigationAction
        icon={(props) => <Icon {...props} name='arrow-back-outline' />}
        onPress={() => navigation.goBack()}
    />
)

export const SettingsScreen = ({ navigation }) => {
    const auth = React.useContext(AuthContext)
    const [value, setValue] = React.useState('');
    const api = useApiLookup()
    return (
        <Layout style={{ flex: 1 }} level='1'>
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    title={props => <Text  {...props}>{api.account.name}</Text>}
                    accessoryLeft={goBack}
                    alignment="center"
                />
                <Layout style={styles.container}>
                    <Menu style={styles.menu} >
                        <MenuItem title="Name"></MenuItem>
                        <MenuItem title="SSH Keys"></MenuItem>
                    </Menu>
                </Layout>
            </SafeAreaView>
        </Layout>
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