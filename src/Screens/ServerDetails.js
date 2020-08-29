import React, { useEffect, useState } from 'react'
import { Layout, Text, TopNavigation, Spinner } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';
import useApiLookup from '../Hooks/UseAPILookup'

export const ServerDetails = ({ route, navigation }) => {
    const { serverIndex } = route.params
    const api = useApiLookup()

    const rightMenu = () => {
        return (
            
        )
    }

    if (api.serverObj[serverIndex]) {
        return (
            <Layout style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Layout style={{ flex: 1, alignItems: 'center' }}>
                        <TopNavigation
                            title={props => <Text {...props}>{api.serverObj[serverIndex].label}</Text>}
                            renderRight={}
                        />

                        
                    </Layout>
                </SafeAreaView>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <Spinner />
            </Layout>
        )

    }
}