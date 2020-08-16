import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

import { HomeScreen } from '../Screens/HomeScreen';
import { SettingsScreen } from '../Screens/SettingsScreen';
import { LoginScreen } from '../Screens/LoginScreen'
import AuthContext from '../Hooks/AuthContext'
import { SafeAreaView } from 'react-native';

const TabNavigator = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const LoginStackNavigator = createStackNavigator()


const HomeStackScreen = () => {
    return (
        <HomeStackNavigator.Navigator headerMode={"none"}>
            <HomeStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />
        </HomeStackNavigator.Navigator>
    );
}
const SettingsStackScreen = () => {
    return (
        <SettingsStackNavigator.Navigator headerMode={"none"}>
            <SettingsStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </SettingsStackNavigator.Navigator>
    );
}

const LoginStackScreen = () => {
    return (
        <LoginStackNavigator.Navigator>
            <LoginStackNavigator.Screen name='Login' component={LoginScreen} />
        </LoginStackNavigator.Navigator>
    )
}

const BottomTabBar = ({ navigation, state }) => (
    <SafeAreaView>


    <BottomNavigation
        selectedIndex={state.index}
        onSelect= {index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' />
        <BottomNavigationTab title='Settings' />
    </BottomNavigation>
    </SafeAreaView>
)

const BottomTabNavigatior = ({ state }) => {
    return (

        <TabNavigator.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <TabNavigator.Screen name='Home' component={HomeStackScreen} />
            <TabNavigator.Screen name='Settings' component={SettingsStackScreen}/>
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

