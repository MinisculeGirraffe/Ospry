import React from 'react'
import { Layout, TopNavigation, TopNavigationAction, Icon, Divider, Text, Select, SelectGroup, SelectItem, DrawerGroup, Drawer, DrawerItem } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import useApiLookup from '../Hooks/UseAPILookup'

export const AddServerScreen = ({ navigation }) => {

    const [selectedType, setSelectedType] = React.useState("");
    const [availServerPlans, setAvailServerPlans] = React.useState([])
    const [selectedPlan, setSelectedPlan] = React.useState("")
    const [availLocations, setAvailLocations] = React.useState([])
    const [selectedLocation, setSelectedLocation] = React.useState("")

    const api = useApiLookup()
    React.useEffect(() => {
        api.lookupServerPlans()

    }, [])

    React.useEffect(() => {
        if (selectedType) {
            let typeText = Object.keys(api.serverAvailability.plans)[selectedType.row]
            let plans = api.serverAvailability.plans[typeText]
            if (plans !== availServerPlans) {
                setSelectedPlan("")
                setSelectedLocation("")
            }
            setAvailServerPlans(plans)

        }
    }, [selectedType])

    React.useEffect(() => {
        const getAvailPlans = async (locations) => {
            const zones = Object.keys(api.serverLocations.continents)
            const results = {}
            const availLocationObjs = []
            for (const zone of zones) {
                const filteredZone = []
                for (const location of locations) {
                    let foundLocation = api.serverLocations.continents[zone].find(({ DCID }) => DCID == location)
                    if (foundLocation !== undefined) {
                        filteredZone.push(foundLocation)
                    }
                }
                if(filteredZone.length > 0 ) {
                    results[zone] = filteredZone
                }
               
            }
            return results
        }

        if (availServerPlans.length > 0) {
            let planLocations = availServerPlans[selectedPlan.row].available_locations
            getAvailPlans(planLocations)
                .then(data => setAvailLocations(data))
        }

    }, [selectedPlan])


    const goBack = () => (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )

    if (api.serverAvailability !== undefined) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    accessoryLeft={goBack}
                    title={props => <Text  {...props}>New Server</Text>}
                    alignment="center"
                />
                <Divider />
                <Layout >
                    <Text>Server Type</Text>
                    <Select
                        value={Object.keys(api.serverAvailability.plans)[selectedType.row]}
                        selectedIndex={selectedType}
                        onSelect={type => setSelectedType(type)}
                    >
                        {Object.keys(api.serverAvailability.plans).map(plan => {
                            return (
                                <SelectItem key={plan} title={plan}></SelectItem>
                            )

                        })}
                    </Select>

                    <Text>Server Plan</Text>
                    <Select
                        value={selectedPlan ? availServerPlans[selectedPlan.row].name : ""}
                        selectedIndex={selectedPlan}
                        onSelect={plan => setSelectedPlan(plan)}
                        disabled={availServerPlans.length == 0 ? true : false}
                    >
                        {availServerPlans.map(plan => {
                            return (
                                <SelectItem key={plan.name} title={plan.name} />
                            )
                        })}
                    </Select>
                    <Text>Server Location</Text>
                    <Select
                        selectedIndex={selectedLocation}
                        onSelect={location => setSelectedLocation(location)}
                        disabled={availLocations.length == 0 ? true : false}
                    >
                        {Object.keys(availLocations).map(zone => {
                            return (
                                <SelectGroup key={zone} title={zone} >
                                    {availLocations[zone].map(location => {
                                        return (
                                            <SelectItem key={location.name} title={location.name} />
                                        )
                                    })}
                                </SelectGroup>
                            )

                        })}
                    </Select>
                    <Text>Server OS</Text>
                    <Select>

                    </Select>
                    <Drawer>
                        <DrawerGroup title="Options">
                            <DrawerItem title="Hostname" />
                            <DrawerItem title="Label" />
                            <DrawerItem title={"Auto Backups"} />
                            <DrawerItem title={"IPv6"} />
                            <DrawerItem title={"Private Networking"} />
                        </DrawerGroup>
                    </Drawer>

                </Layout>
            </SafeAreaView>

        )
    } else {
        return (
            <Layout></Layout>
        )
    }

}