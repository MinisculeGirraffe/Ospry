import React from 'react'
import { Layout, TopNavigation, TopNavigationAction, Icon, Divider, Text, Select, SelectGroup, SelectItem, DrawerGroup, Drawer, DrawerItem, CheckBox, Input, Button } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView} from 'react-native'
import Collapsible from 'react-native-collapsible';
import useApiLookup from '../Hooks/UseAPILookup'

export const AddServerScreen = ({ navigation }) => {

    const [selectedType, setSelectedType] = React.useState("");
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState("");

    const [availServerPlans, setAvailServerPlans] = React.useState([])
    const [selectedPlan, setSelectedPlan] = React.useState("")
    const [selectedPlanIndex, setSelectedPlanIndex] = React.useState("")

    const [availLocations, setAvailLocations] = React.useState([])
    const [selectedLocation, setSelectedLocation] = React.useState("")
    const [selectedLocationIndex, setSelectedLocationIndex] = React.useState("")

    const [selectedOS, setSelectedOS] = React.useState()
    const [selectedOSIndex, setslectedOSIndex] = React.useState()

    const [hostname, setHostname] = React.useState("")
    const [label, setLabel] = React.useState("")

    const [autoBackups, setAutoBackups] = React.useState(false)
    const [IPv6, setIPv6] = React.useState(true)
    const [privateNetworking, setPrivateNetworking] = React.useState(false)

    const [serverCollapsed, setServerCollapsed] = React.useState(false)
    const [optionsCollapsed, setOptionsCollapsed] = React.useState(true)


    const api = useApiLookup()

    const styles = StyleSheet.create({
        label: {

            paddingBottom: 10,
            paddingTop: 10
        }

    })

    React.useEffect(() => {
        api.lookupServerPlans()
    }, [])

    React.useEffect(() => {
        if (selectedTypeIndex) {
            let typeText = Object.keys(api.serverAvailability.plans)[selectedTypeIndex.row]
            setSelectedType(typeText)
            let plans = api.serverAvailability.plans[typeText]
            if (plans !== availServerPlans) {
                setSelectedPlan("")
                setSelectedLocation("")
            }
            setAvailServerPlans(plans)

        }
    }, [selectedTypeIndex])

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
                if (filteredZone.length > 0) {
                    results[zone] = filteredZone
                }

            }
            return results
        }
        if (selectedPlanIndex && availServerPlans.length > 0) {
            setSelectedPlan(availServerPlans[selectedPlanIndex.row])
            let planLocations = availServerPlans[selectedPlanIndex.row].available_locations
            getAvailPlans(planLocations)
                .then(data => setAvailLocations(data))
        }
    }, [selectedPlanIndex])

    React.useEffect(() => {
        if (selectedLocationIndex) {
            let selectedGroup = Object.keys(availLocations)[selectedLocationIndex.section]
            let locationGroup = availLocations[selectedGroup]
            setSelectedLocation(locationGroup[selectedLocationIndex.row])
        }

    }, [selectedLocationIndex])

    React.useEffect(() => {
        if (selectedOSIndex) {
            let selectedFamily = Object.keys(api.serverOS)[selectedOSIndex.section]
            let osFamily = api.serverOS[selectedFamily]

            setSelectedOS(osFamily[selectedOSIndex.row])
        }
    }, [selectedOSIndex])

    const goBack = () => (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )

    if (api.serverAvailability && api.serverOS && api.serverLocations) {
        return (

            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    accessoryLeft={goBack}
                    title={props => <Text  {...props}>New Server</Text>}
                    alignment="center"
                    subtitle={props => <Text {...props} category={'label'}>{selectedPlan !== "" ? "$" + selectedPlan.price_per_month + " / Month" : ""}</Text>}
                />
                <Divider />
                <ScrollView >
                    
               
                <Layout >
                    <DrawerItem
                        title="Server Info"
                        onPress={() => { setServerCollapsed(!serverCollapsed) }}
                        accessoryLeft={(props) => <Icon {...props} name={'archive-outline'} />}
                        accessoryRight={(props) => <Icon {...props} name={'arrow-down-outline'} />}
                    />
                    <Collapsible
                        collapsed={serverCollapsed}
                    >
                        <Select
                            label={(props) => <Text style={styles.label} category={"s1"} appearance={"hint"} > Server Type</Text>}
                            value={selectedType}
                            placeholder={"Select Type"}
                            selectedIndex={selectedTypeIndex}
                            onSelect={type => setSelectedTypeIndex(type)}
                        >
                            {Object.keys(api.serverAvailability.plans).map(plan => {
                                return (
                                    <SelectItem key={plan} title={plan}></SelectItem>
                                )

                            })}
                        </Select>


                        <Select
                            label={(props) => <Text style={styles.label} category={"s1"} appearance={"hint"} > Server Plan</Text>}
                            value={selectedPlan.name}
                            placeholder={"Select Plan"}
                            selectedIndex={selectedPlanIndex}
                            onSelect={plan => setSelectedPlanIndex(plan)}
                            disabled={availServerPlans.length == 0 ? true : false}
                        >
                            {availServerPlans.map(plan => {
                                return (
                                    <SelectItem key={plan.name} title={plan.name} />
                                )
                            })}
                        </Select>
                        <Select
                            label={(props) => <Text style={styles.label} category={"s1"} appearance={"hint"} > Server Location</Text>}
                            placeholder={"Select Location"}
                            selectedIndex={selectedLocationIndex}
                            onSelect={location => setSelectedLocationIndex(location)}
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
                        <Select
                            label={(props) => <Text style={styles.label} category={"s1"} appearance={"hint"} > Server OS</Text>}
                            value={selectedOS ? selectedOS.name : null}
                            placeholder={"Select OS"}
                            selectedIndex={selectedOSIndex}
                            onSelect={os => setslectedOSIndex(os)}
                        >
                            {Object.keys(api.serverOS).map(osFamily => {
                                return (
                                    <SelectGroup key={osFamily} title={osFamily}>
                                        {api.serverOS[osFamily].map(os => {
                                            return (
                                                <SelectItem key={os.name} title={os.name} />
                                            )

                                        })}
                                    </SelectGroup>
                                )
                            })}
                        </Select>
                    </Collapsible>

                    <DrawerItem
                        title="Server Options"
                        onPress={() => { setOptionsCollapsed(!optionsCollapsed) }}
                        accessoryLeft={(props) => <Icon {...props} name={'book-open-outline'} />}
                        accessoryRight={(props) => <Icon {...props} name={'arrow-down-outline'} />}
                    />
                    <Collapsible
                        collapsed={optionsCollapsed}
                    >
                        <Input
                            label={"Hostname"}
                            value={hostname}
                            onChangeText={nextValue => setHostname(nextValue)}
                        />
                        <Input
                            label={"Label"}
                            value={label}
                            onChangeText={nextValue => setLabel(nextValue)}
                        />
                        <DrawerItem title="IPv6" accessoryRight={() =>
                            <CheckBox
                                checked={IPv6}
                                onChange={(checked) => setIPv6(!IPv6)} />
                        } />

                    </Collapsible>


                </Layout>
                </ScrollView>
            </SafeAreaView >

        )
    } else {
        return (
            <Layout></Layout>
        )
    }

}