import * as React from 'react';
import { AuthContext } from './AuthContext'

export default () => {
    const auth = React.useContext(AuthContext)
    const [serverObj, setServerObj] = React.useState([])
    const [user, setUser] = React.useState('')
    const [account, setAccount] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [sshKeys, setSSHKeys] = React.useState();
    const [serverAvailability, setServerAvailability] = React.useState()
    const [serverLocations, setServerLocations] = React.useState()
    const [serverOS, setServerOS] = React.useState()

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

                arr.push(data[key])
            }
            return arr
        }
        await auth.vultr.instances.listInstances()
            .then(data => { return transformData(data.instances) })
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

        const transformOS = async (osList) => {
            const results = {}
            const OSCodes = Object.keys(osList)

            for (const os of OSCodes) {
                const currentOS = osList[os]
                if (currentOS.windows == false &&
                    currentOS.family !== "snapshot" &&
                    currentOS.family !== "iso" &&
                    currentOS.family !== "backup" &&
                    currentOS.family != "application") {
                    if (results[currentOS.family] == null) {
                        results[currentOS.family] = []
                    }
                    results[currentOS.family].push(currentOS)
                }
            }
            return results
        }

        await auth.vultr.plans.listPlans({ type: "all" })
            .then((data) => {
                return transformPlans(data)
            })
            .then(data => {
                setServerAvailability(data)
                return auth.vultr.regions.listRegions()
            })
            .then((data) => {
                return transformLocations(data)
            })
            .then(data => {
                setServerLocations(data)
                return auth.vultr.operatingSystems.listImages()
            })
            .then(data => {
                return transformOS(data)
            })
            .then(data => {
                let sortedData = Object.keys(data).sort().reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
                setServerOS(sortedData)
            })
            .catch(err => console.log(err))
    }


    const lookupUser = async () => {
        await auth.vultr.account.getAccountInfo()
            .then(data => setAccount(data.account))
    }

    const refreshServerList = async () => {
        setIsRefreshing(true)
        lookupServers()
            .then(setIsRefreshing(false))
    }

    const rebootServer = async (instanceID) => {
       await auth.vultr.instances.rebootInstance(instanceID)
            .then(lookupServers())
    }

    const startServer = async (instanceID) => {
       await auth.vultr.instances.startInstance(instanceID)
            .then(lookupServers())
    }

    const stopServer = async (instanceID) => {
        console.log(serverID)
        await auth.vultr.instances.haltInstance(instanceID)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    const createServer = async (obj) => {
        await auth.vultr.server.create()
    }

    const lookupSSHKeys = async () => {
       const keys =  await auth.vultr.sshKeys.listSshKeys()
        setSSHKeys(keys.ssh_keys)
    }
    const addSSHKey = async (name,key) => {
        console.log([name,key])
        const res = await auth.vultr.sshKeys.createSshKey({name: name, ssh_key: key})

        await lookupSSHKeys()

    }

    React.useEffect(() => {
        const fetchInitalData = async () => {
            setIsLoading(true)
            await Promise.all(lookupServers(), lookupUser(), lookupSSHKeys())
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
        lookupServerPlans,
        lookupSSHKeys,
        addSSHKey,
        serverObj,
        account,
        user,
        sshKeys,
        isLoading,
        isRefreshing,
        serverAvailability,
        serverLocations,
        serverOS
    };
}