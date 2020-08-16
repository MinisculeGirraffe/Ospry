import * as React from 'react';
import { AuthContext } from './AuthContext'
import { useTheme } from '@react-navigation/native';
export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState({})
    const [user, setUser] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const lookupServers = async () => {
        auth.vultr.server.list()
        .then(data =>  { return setServerObj(data)})
        .catch(err => console.log(err))
    }
    const lookupUser = async () => {
        auth.vultr.api.getInfo()
        .then(data => setUser(data))
    }
    React.useEffect(() => {
        const fetchInitalData = async() => {
            setIsLoading(true)
            Promise.all(lookupServers(),lookupUser())
            .then(setIsLoading(false))
        }
        fetchInitalData()
    },[])
    
    return [lookupServers,serverObj,user,isLoading];
}