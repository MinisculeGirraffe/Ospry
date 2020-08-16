import * as React from 'react';
import { AuthContext } from './AuthContext'
import { useTheme } from '@react-navigation/native';
export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState()
    const [user, setUser] = React.useState('')
    const lookupServers = () => {
        auth.vultr.server.list()
        .then(data => setServerObj(data))
        .then(console.log(Object.keys(serverObj)))
    }
    const lookupUser = () => {
        auth.vultr.api.getInfo()
        .then(data => setUser(data))
    }
    React.useEffect(() => {
        const fetchInitalData = async() => {
            await lookupUser()
            await lookupServers()
        }
        fetchInitalData()
    },[])

    return [lookupServers,serverObj,user];
}