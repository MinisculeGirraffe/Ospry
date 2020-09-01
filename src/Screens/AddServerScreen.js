import React from 'react'
import { Layout, TopNavigation, TopNavigationAction, Icon, Divider, DrawerGroup, Drawer, DrawerItem, Text, Card, CheckBox } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import useApiLookup from '../Hooks/UseAPILookup'

export const AddServerScreen = ({ navigation }) => {

    const [selectedType, setSelectedType] = React.useState("");
    const [selectedPlan, setSelectedPlan] = React.useState("")
    const api = useApiLookup()
    React.useEffect(() => {
        api.lookupServerPlans()

    }, [])



    const goBack = () => (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )

    const renderServerType = (props) => {
        const selectType = (key) => {
            if (key == selectedType) {
                setSelectedType("")
            } else {
                setSelectedType(key)
            }
        }

        return (
            <Layout {...props} style={{ flex: 1 }} >
                <Layout style={{ flexDirection: "row", alignItems: "center", alignSelf: "stretch", justifyContent: "space-evenly", flex: 1 }}>
                    {Object.keys(api.serverAvailability.plans).map(key => {
                        return (
                            <Card
                                onPress={() => selectType(key)}
                                style={{ alignSelf: "stretch" }}
                                status={selectedType == key ? 'info' : 'basic'}
                            >
                                <Text>{key}</Text>
                            </Card>
                        )
                    })}
                </Layout>

            </Layout>
        )
    }

    const renderPlan = (props) => {
        const selectType = (planID) => {

            if (planID == selectedPlan) {
                setSelectedPlan("")
            } else {
                setSelectedPlan(planID)
            }
        }
        if (selectedType !== "") {
            return (
                <Layout {...props} style={{ flex: 1 }} >
                    <Layout style={{ flexDirection: "column", alignItems: "center", alignSelf: "stretch", overflow: "auto", flex: 0, flexGrow: 1 }}>
                        {api.serverAvailability.plans[selectedType].map(key => {
                            return (
                                <Card
                                    onPress={() => selectType(key.VPSPLANID)}
                                    status={selectedPlan == key.VPSPLANID ? 'info' : 'basic'}>
                                    <Text>{key.name}</Text>
                                </Card>
                            )
                        })}
                    </Layout>
                </Layout>
            )
        }
    }


    const renderLocation = (props) => {
        if (selectedType !== "" && selectedPlan !== "") {
            const obj = api.serverAvailability.plans[selectedType].find(key => key.VPSPLANID = selectedPlan)

            const locations = []
            locations.push(obj.available_locations.map((key) => { api.serverLocations[key] }))

            console.log(obj.available_locations)
        }

        return (
            <Layout />
        )

    }

    if (api.serverAvailability !== undefined) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
                <TopNavigation
                    accessoryLeft={goBack}
                    title={props => <Text  {...props}>New Server</Text>}
                    alignment="center"
                />
                <Divider />
                <Layout>
                    <Drawer appearance='noDivider'>
                        <DrawerItem title="Server Type" />
                        <DrawerItem style={{ flex: 1 }} accessoryLeft={(props) => renderServerType(props)} />

                        {selectedType !== "" ?
                            <DrawerGroup title="Server Size">
                                <DrawerItem style={{ flex: 1, flexGrow: 1 }} accessoryLeft={(props) => renderPlan(props)} />
                            </DrawerGroup>
                            : null}

                        {selectedPlan !== "" ?
                            <DrawerGroup title="Location">
                                <DrawerItem style={{ flex: 1, flexGrow: 1 }} accessoryLeft={(props) => renderLocation(props)} />
                            </DrawerGroup>
                            : null}

                        <DrawerGroup title="OS">

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