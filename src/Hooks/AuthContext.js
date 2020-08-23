import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as VultrNode from '@vultr/vultr-node'
export const AuthContext = React.createContext({});


export const AuthProvider = ({ children }) => {
    const [apiKey, setApiKey] = React.useState();
    const [vultr, SetVultrKey] = React.useState();

    React.useEffect(() => {
        AsyncStorage.getItem('userToken')
            .then((userToken) => {
                if (userToken) {
                    let init = VultrNode.initialize({ apiKey: userToken })
                    console.log("ran")
                    SetVultrKey(init)
                    setApiKey(userToken)
                }
            })
    },[apiKey])

    const saveApiKey = async (userToken) => {
        let test = VultrNode.initialize({ apiKey: userToken })
        test.api.getInfo()
            .then((data) => {
                if (Object.keys(data).length > 0) {
                    AsyncStorage.setItem('userToken', userToken)
                }
            })
            .then(() => {
                setApiKey(userToken);
            })

    }

    const deleteApiKey = () => {
        AsyncStorage.removeItem('userToken')
            .then(() => {
                setApiKey(null);
            })
            .catch(e => console.log(e))
    }
    return (
        <AuthContext.Provider value={{ apiKey: apiKey, saveApiKey: saveApiKey, vultr: vultr, deleteApiKey: deleteApiKey }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;