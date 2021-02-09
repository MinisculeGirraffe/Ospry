import * as React from 'react'
import { Layout, Button, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '../Hooks/AuthContext'
import { Keyboard } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import {useInputState} from '../Hooks/useInputState'

export const LoginScreen = ({ navigation }) => {
    const apiKeyText = useInputState()
    const auth = React.useContext(AuthContext)
    
    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://my.vultr.com/settings/#settingsapi');
      };
    return (
        <SafeAreaView style={{flex:1}}>
            <Layout style={{ flex: 1,  alignItems: 'center', }}>
                <Input
                    value={apiKeyText}
                    placeholder='API Key'
                    {...apiKeyText}
                />
                <Layout style={{flexDirection: "row",alignItems: "center" , alignSelf: "stretch" , justifyContent: "space-evenly"}}>
                <Button
                    onPress={() => auth.saveApiKey(apiKeyText)}
                > Sign in</Button>
                 <Button title="Open WebBrowser" onPress={_handlePressButtonAsync}> Get API Key </Button>
                </Layout>

            </Layout>

        </SafeAreaView>

    )
}