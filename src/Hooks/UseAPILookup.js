import * as React from 'react';
import { AuthContext } from './AuthContext'

export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState([])
    const [user, setUser] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const [serverAvailability, setServerAvailability] = React.useState()
    const [serverLocations, setServerLocations] = React.useState()

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

                /*
                let backups = await auth.vultr.backup.list({ SUBID: Number(data[key].SUBID) })
                let backupKeys = Object.keys(backups)
                let backupArr = []
                if (backupKeys.length > 0) {
                    for await (const backup of backupKeys) {
                        backupArr.push(backups[backup])
                    }
                    data[key].backups = BackupArr
                    console.log(data[key].backups)
                } */

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

        const transformLocations = async (locations) => {
            const results = {
                continents: {},
                list: {}
            }
            results.list = locations
            const locationCodes = Object.keys(locations)
            for (const location of locationCodes) {
                const currentLocation = locations[location]
                if (results.continents[currentLocation.continent] == null) {
                    results.continents[currentLocation.continent] = []
                }
                results.continents[currentLocation.continent].push(currentLocation)
            }
            return results
        }

        const transformPlans = async (plans) => {
            const results = { plans: {} }
            const planCode = Object.keys(plans)
            for (const plan of planCode) {
                const currentPlan = plans[plan]
                if (currentPlan.available_locations.length > 0) {
                    if (results.plans[currentPlan.plan_type] == null) {
                        results.plans[currentPlan.plan_type] = []
                    }
                    results.plans[currentPlan.plan_type].push(currentPlan)
                }
            }
            return results
        }

        await auth.vultr.plans.list({ type: "all" })
            .then((data) => { return transformPlans(data) })
            .then(data => {
                setServerAvailability(data)
                return auth.vultr.regions.list()
            })
            .then((data) => { return transformLocations(data) })
            .then(data => setServerLocations(data))
            .catch(err => console.log(err))
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
            await Promise.all(lookupServers(), lookupUser())
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
        lookupServerPlans,
        serverObj,
        user,
        isLoading,
        isRefreshing,
        serverAvailability,
        serverLocations
    };
}