import React from 'react'
import { Layout, TopNavigation, TopNavigationAction, Icon, Divider } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';

export const AddServerScreen = ({ navigation }) => {
    const goBack = () => (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']} >
            <TopNavigation
                accessoryLeft={goBack}
            />
            <Divider/>
            <Layout>



            </Layout>
        </SafeAreaView>

    )
}