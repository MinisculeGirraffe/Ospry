import * as React from 'react';
import { AuthContext } from './AuthContext'
export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState([])
    const [user, setUser] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const [serverAvailability, setServerAvailability] = React.useState()

    //Add Bare Metal integration
    const lookupServers = async () => {
        const transformData = async (data) => {
            let arr = []
            let keys = Object.keys(data)
            for (const key of keys) {
                if (data[key].label == "") {
                    data[key].label = data[key].os
                }
                let normalizedBandwidth = data[key].current_bandwidth_gb / data[key].allowed_bandwidth_gb
                data.normalizedBandwidth = Math.min(normalizedBandwidth, 1)
                if (data[key].auto_backups == 'yes') {
                    data[key].auto_backups = true
                } else {
                    data[key].auto_backups = false
                }

                let backups = await auth.vultr.backup.list({ SUBID: Number(data[key].SUBID) })
                let backupKeys = Object.keys(backups)
                let backupArr = []
                if (backupKeys.length > 0) {
                    for await (const backup of backupKeys) {
                        backupArr.push(backups[backup])
                    }
                    data[key].backups = BackupArr
                    console.log(data[key].backups)
                }
                let objectStorage
                arr.push(data[key])
            }
            return arr
        }
        await auth.vultr.server.list()
            .then(data => { return transformData(data) })
            .then((data) => { setServerObj(data) })
            .catch(err => console.log(err))
    }



    const lookupServerPlans = async () => {
        await auth.vultr.plans.list()
            .then(data => {
                let test = Object.keys(data)
                    .reduce((acc, cur) => {
                        let planType = data[cur].plan_type
                        if (acc.plans[planType] == null) {
                            acc.plans[planType] = []
                            acc.plans[planType].push(data[cur])
                        }
                        else {
                            acc.plans[planType].push(data[cur])
                        }
                        return acc
                    }, { plans: {} })
                setServerAvailability(test)
            })
    }

    const lookupUser = async () => {
        await auth.vultr.api.getInfo()
            .then(data => setUser(data))
    }

    const refreshServerList = async () => {
        setIsRefreshing(true)
        lookupServers()
            .then(setIsRefreshing(false))
    }

    const rebootServer = async (serverID) => {
        auth.vultr.server.reboot({ SUBID: parseInt(serverID) })
            .then(lookupServers())

    }

    const startServer = async (serverID) => {
        auth.vultr.server.start({ SUBID: parseInt(serverID) })
            .then(lookupServers())

    }

    const stopServer = async (serverID) => {
        auth.vultr.server.halt({ SUBID: parseInt(serverID) })
            .then(lookupServers())

    }

    const enableBackup = async (serverID) => {
        auth.vultr.server.enableBackup({ SUBID: parseInt(serverID) })
            .then(data => console.log(data))
            .then(lookupServers())
            .catch(err => console.log(err))
    }
    const disableBackup = async (serverID) => {
        auth.vultr.server.disableBackup({ SUBID: parseInt(serverID) })
            .then(lookupServers())
    }

    React.useEffect(() => {
        const fetchInitalData = async () => {
            setIsLoading(true)
            await Promise.all(lookupServers(), lookupUser(), lookupServerPlans())
                .then(setIsLoading(false))
                .catch(err => console.log(err))
        }
        fetchInitalData()
    }, [])
    return {
        lookupServers,
        refreshServerList,
        rebootServer,
        stopServer,
        startServer,
        enableBackup,
        disableBackup,
        serverObj,
        user,
        isLoading,
        isRefreshing,
        serverAvailability
    };
}