import * as React from 'react'
import { Layout, Button, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '../Hooks/AuthContext'
import { Keyboard } from 'react-native'
import * as WebBrowser from 'expo-web-browser';

export const LoginScreen = ({ navigation }) => {
    const [value, setValue] = React.useState('');
    const auth = React.useContext(AuthContext)
    React.useEffect(() => {
        Keyboard.addListener("keyboardDidShow");
        Keyboard.addListener("keyboardDidHide");

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow");
            Keyboard.removeListener("keyboardDidHide");
        };
    }, []);
    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://my.vultr.com/settings/#settingsapi');
      };
    return (
        <SafeAreaView style={{flex:1}}>
            <Layout style={{ flex: 1,  alignItems: 'center', }}>
                <Input
                    value={value}
                    placeholder='API Key'
                    onChangeText={nextValue => setValue(nextValue)}
                />
                <Layout style={{flexDirection: "row",alignItems: "center" , alignSelf: "stretch" , justifyContent: "space-evenly"}}>
                <Button
                    onPress={() => auth.saveApiKey(value)}
                > Sign in</Button>
                 <Button title="Open WebBrowser" onPress={_handlePressButtonAsync}> Get API Key </Button>
                </Layout>

            </Layout>

        </SafeAreaView>

    )
}