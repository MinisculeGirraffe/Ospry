import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, useTheme, Icon } from '@ui-kitten/components';

import { HomeScreen } from '../Screens/HomeStack/HomeScreen';
import { ServerDetails } from '../Screens/HomeStack/ServerDetails'
import { AddServerScreen } from '../Screens/HomeStack/AddServerScreen'

import { SettingsScreen } from '../Screens/SettingStack/SettingsScreen';
import { SshKeyScreen } from '../Screens/SettingStack/SshKeyScreen'
import { AddSSHKeyScreen } from '../Screens/SettingStack/AddSSHKeyScreen'
import { AccountScreen } from '../Screens/SettingStack/AccountScreen';

import { LoginScreen } from '../Screens/LoginScreen'


import { CardStyleInterpolators } from '@react-navigation/stack';

import AuthContext from '../Hooks/AuthContext'
import { SafeAreaView } from 'react-native';


const TabNavigator = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const LoginStackNavigator = createStackNavigator()

const HomeStackScreen = () => {
    const theme = useTheme()
    return (
        <HomeStackNavigator.Navigator screenOptions={{
            cardStyle: { backgroundColor: theme['background-basic-color-1'] }
        }}
            headerMode={"none"}>
            <HomeStackNavigator.Screen
                name="Servers"
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Details"
                component={ServerDetails}
            />
            <HomeStackNavigator.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    gestureDirection: "vertical",

                }}
                name="Add"
                component={AddServerScreen}
            />
        </HomeStackNavigator.Navigator>
    );
}
const SettingsStackScreen = () => {
    const theme = useTheme()
    return (
        <SettingsStackNavigator.Navigator headerMode={"none"} screenOptions={{
            cardStyle: { backgroundColor: theme['background-basic-color-1'] }
        }}>
            <SettingsStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
            />
            <SettingsStackNavigator.Screen
                name="SshKeys"
                component={SshKeyScreen}
            />
            <SettingsStackNavigator.Screen
                name="AccountSettings"
                component={AccountScreen}
            />
            <SettingsStackNavigator.Screen
                name="AddSSHKeyScreen"
                component={AddSSHKeyScreen}
            />
        </SettingsStackNavigator.Navigator>
    );
}

const LoginStackScreen = () => {
    const theme = useTheme()
    return (
        <LoginStackNavigator.Navigator screenOptions={{
            cardStyle: { backgroundColor: theme['background-basic-color-1'] }
        }}>
            <LoginStackNavigator.Screen name='Login' component={LoginScreen} />
        </LoginStackNavigator.Navigator>
    )
}

const BottomTabBar = ({ navigation, state }) => {
    const theme = useTheme()
    return (
        <SafeAreaView style={{ backgroundColor: theme['background-basic-color-1'] }}>
            <BottomNavigation
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}
            >
                <BottomNavigationTab title='Servers' icon={props => <Icon {...props} name='hard-drive-outline' />} />
                <BottomNavigationTab title='Settings' icon={props => <Icon {...props} name='settings-outline' />} />
            </BottomNavigation>
        </SafeAreaView>
    )

}

const BottomTabNavigatior = ({ state }) => {
    return (
        <TabNavigator.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <TabNavigator.Screen name='Home' component={HomeStackScreen} />
            <TabNavigator.Screen name='Settings' component={SettingsStackScreen} />
        </TabNavigator.Navigator>
    )
}

export const AppNavigator = () => {
    const auth = React.useContext(AuthContext)
    return (
        <NavigationContainer>
            {auth.apiKey == null ? (
                <LoginStackScreen />
            ) : (
                    <BottomTabNavigatior />
                )}
        </NavigationContainer>
    )

}


