import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Input, TopNavigation, TopNavigationAction, Icon, Button } from '@ui-kitten/components';
import AuthContext from '../Hooks/AuthContext'

export const SettingsScreen = ({ navigation }) => {
    const auth = React.useContext(AuthContext)
    const [value, setValue] = React.useState('');

    return (
        <Layout style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Input
                        placeholder={auth.apiKey}
                        value={value}
                        onChangeText={nextValue => setValue(nextValue)}
                    />
                    <Button onPress={auth.deleteApiKey}> Delete API Key</Button>
                </Layout>
            </SafeAreaView>
        </Layout>


    );
};