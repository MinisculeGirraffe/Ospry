import * as React from 'react'
import { Layout, Button, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '../Hooks/AuthContext'
import { Keyboard } from 'react-native'

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

    return (
        <SafeAreaView style={{flex:1}}>
            <Layout style={{ flex: 1,  alignItems: 'center' }}>
                <Input
                    value={value}
                    placeholder='Active'
                    onChangeText={nextValue => setValue(nextValue)}
                />
                <Button
                    onPress={() => auth.saveApiKey(value)}
                > Sign in</Button>
            </Layout>

        </SafeAreaView>

    )
}