import * as React from 'react';
import { AuthContext } from './AuthContext'
export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState([])
    const [user, setUser] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const lookupServers = async () => {
        auth.vultr.server.list()
            .then((data) => {
                let arr = []
                Object.keys(data)
                    .forEach((key) => {
                        if (data[key].label == "") {
                            data[key].label = data[key].os
                        }
                        arr.push(data[key])

                    })
                    setServerObj(arr)

            })

            .catch(err => console.log(err))
    }
    const lookupUser = async () => {
        auth.vultr.api.getInfo()
            .then(data => setUser(data))
    }

    const refreshServerList = async () => {
        setIsRefreshing(true)
        lookupServers()
            .then(setIsRefreshing(false))
    }

    const rebootServer = async (serverID) => {
        let rebootObj = {
            SUBID: Number(serverID)
        }
        console.log(rebootObj)
        auth.vultr.server.halt(rebootObj)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        const fetchInitalData = async () => {
            setIsLoading(true)
            Promise.all(lookupServers(), lookupUser())
                .then(setIsLoading(false))
                .catch(err => console.log(err))

        }
        fetchInitalData()
    }, [])
    return { lookupServers, refreshServerList, rebootServer, serverObj, user, isLoading, isRefreshing };
}